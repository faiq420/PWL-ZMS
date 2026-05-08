"use client";
import { useToast } from "@/components/ui/use-toast";
import useHelper from "@/Helper/helper";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Paragraph from "@/components/utils/Headings/Paragraph";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Save,
  X,
  Users,
  Shield,
  Globe,
  Navigation,
} from "lucide-react";
import Subheading from "@/components/utils/Headings/Subheading";
import { OPTION } from "@/types/utils";
import InputTag from "@/components/utils/FormElements/InputTag";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import TextArea from "@/components/utils/FormElements/TextArea";
import ButtonComp from "@/components/utils/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

type TargetMode = "role" | "specific" | "all";

type ScreenKey =
  | "none"
  | "animal-screen"
  | "event-screens"
  // | "zoo-screen"
  | "things-to-do-screen"
  // | "inspection-history-screen"
  // | "inspection-form-screen"
  // | "map-screen"
  // | "notification-screen"
  // | "search-screen"
  // | "all-animals-screen"
  // | "emergency-contact-screen";

// Defines what params each screen needs and what data must be fetched
type ScreenConfig = {
  label: string;
  requiresZoo: boolean;
  requiresAnimal: boolean;
  requiresEvent: boolean;
  requiresRoleId: boolean; // pull roleId from obj.RoleId automatically
  includeAnimalName: boolean; // InspectionFormScreen needs animalName
  paramsPreview: string; // shown as helper text in the form
};

const SCREEN_CONFIG: Record<ScreenKey, ScreenConfig> = {
  none: {
    label: "None — just open the app",
    requiresZoo: false,
    requiresAnimal: false,
    requiresEvent: false,
    requiresRoleId: false,
    includeAnimalName: false,
    paramsPreview: "No navigation params needed",
  },
  "animal-screen": {
    label: "Animal Detail",
    requiresZoo: true,
    requiresAnimal: true,
    requiresEvent: false,
    requiresRoleId: true,
    includeAnimalName: false,
    paramsPreview: "{ animalId, zooId, roleId }",
  },
  "event-screens": {
    label: "Event Detail",
    requiresZoo: false,
    requiresAnimal: false,
    requiresEvent: true,
    requiresRoleId: false,
    includeAnimalName: false,
    paramsPreview: "{ EventId }",
  },
  // "zoo-screen": {
  //   label: "Zoo Screen",
  //   requiresZoo: true,
  //   requiresAnimal: false,
  //   requiresEvent: false,
  //   requiresRoleId: false,
  //   includeAnimalName: false,
  //   paramsPreview: "{ zooId }",
  // },
  "things-to-do-screen": {
    label: "Things To Do",
    requiresZoo: true,
    requiresAnimal: false,
    requiresEvent: false,
    requiresRoleId: false,
    includeAnimalName: false,
    paramsPreview: "{ zooId }",
  },
  // "inspection-history-screen": {
  //   label: "Inspection History",
  //   requiresZoo: true,
  //   requiresAnimal: true,
  //   requiresEvent: false,
  //   requiresRoleId: false,
  //   includeAnimalName: false,
  //   paramsPreview: "{ animalId }",
  // },
  // "inspection-form-screen": {
  //   label: "Inspection Form",
  //   requiresZoo: true,
  //   requiresAnimal: true,
  //   requiresEvent: false,
  //   requiresRoleId: false,
  //   includeAnimalName: true,
  //   paramsPreview: "{ animalId, animalName, zooId }",
  // },
  // "map-screen": {
  //   label: "Map",
  //   requiresZoo: false,
  //   requiresAnimal: false,
  //   requiresEvent: false,
  //   requiresRoleId: false,
  //   includeAnimalName: false,
  //   paramsPreview: "No params needed",
  // },
  // "notification-screen": {
  //   label: "Notifications",
  //   requiresZoo: false,
  //   requiresAnimal: false,
  //   requiresEvent: false,
  //   requiresRoleId: false,
  //   includeAnimalName: false,
  //   paramsPreview: "No params needed",
  // },
  // "search-screen": {
  //   label: "Search",
  //   requiresZoo: false,
  //   requiresAnimal: false,
  //   requiresEvent: false,
  //   requiresRoleId: false,
  //   includeAnimalName: false,
  //   paramsPreview: "No params needed",
  // },
  // "all-animals-screen": {
  //   label: "All Animals",
  //   requiresZoo: true,
  //   requiresAnimal: false,
  //   requiresEvent: false,
  //   requiresRoleId: true,
  //   includeAnimalName: false,
  //   paramsPreview: "No params needed",
  // },
  // "emergency-contact-screen": {
  //   label: "Emergency Contact",
  //   requiresZoo: false,
  //   requiresAnimal: false,
  //   requiresEvent: false,
  //   requiresRoleId: false,
  //   includeAnimalName: false,
  //   paramsPreview: "No params needed",
  // },
};

const SCREEN_OPTIONS: OPTION[] = Object.entries(SCREEN_CONFIG).map(
  ([key, cfg]) => ({ value: key, label: cfg.label }),
);

type Notification = {
  Id: number;
  Title: string;
  RoleId: number | null;
  UserIds: number[];
  ChannelId: number;
  TypeId: number;
  Body: string;
  // Navigation
  Screen: ScreenKey;
  EntityParams: string; // JSON string sent in FCM data.entityParams
};

type User = { UserId: number; UserName: string };
type Animal = { AnimalId: number; AnimalName: string };
type Event = { EventId: number; EventTitle: string };

// ─── Component ────────────────────────────────────────────────────────────────

const NotificationManagementPage = () => {
  const { toast } = useToast();
  const helper = useHelper();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === "new";
  const isView = !isNew && !isNaN(Number(slug));

  const [isCruding, setIsCruding] = useState(false);
  const [targetMode, setTargetMode] = useState<TargetMode>("role");

  // Dropdowns
  const [roles, setRoles] = useState<OPTION[]>([]);
  const [zoos, setZoos] = useState<OPTION[]>([]);
  const [channels, setChannels] = useState<OPTION[]>([]);
  const [types, setTypes] = useState<OPTION[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // Navigation entity selection state
  const [navZooId, setNavZooId] = useState<number>(0);
  const [navAnimalId, setNavAnimalId] = useState<number>(0);
  const [navAnimalName, setNavAnimalName] = useState<string>("");
  const [navEventId, setNavEventId] = useState<number>(0);

  // Specific user targeting state
  const [selectedZoo, setSelectedZoo] = useState<number>(0);
  const [userSearch, setUserSearch] = useState("");

  const [obj, setObj] = useState<Notification>({
    Id: 0,
    Title: "",
    RoleId: null,
    UserIds: [],
    ChannelId: 0,
    TypeId: 0,
    Body: "",
    Screen: "none",
    EntityParams: "",
  });

  // ─── Guards ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (slug && slug !== "new" && isNaN(Number(slug))) {
      router.push("/home/notification-management");
    }
  }, [slug]);

  // ─── Derived ──────────────────────────────────────────────────────────────────
  const screenCfg = SCREEN_CONFIG[obj.Screen];

  // Build entityParams JSON whenever navigation selections change
  useEffect(() => {
    if (obj.Screen === "none") {
      setObj((p) => ({ ...p, EntityParams: "" }));
      return;
    }

    const cfg = SCREEN_CONFIG[obj.Screen];
    const built: Record<string, any> = {};

    if (cfg.requiresAnimal && navAnimalId) built.animalId = navAnimalId;
    if (cfg.includeAnimalName && navAnimalName)
      built.animalName = navAnimalName;
    if (cfg.requiresZoo && navZooId) built.zooId = navZooId;
    if (cfg.requiresEvent && navEventId) built.EventId = navEventId;
    if (cfg.requiresRoleId && obj.RoleId) built.roleId = obj.RoleId;

    // For screens with no required params, pass screen key only
    setObj((p) => ({
      ...p,
      EntityParams: Object.keys(built).length ? JSON.stringify(built) : "",
    }));
  }, [
    obj.Screen,
    navZooId,
    navAnimalId,
    navAnimalName,
    navEventId,
    obj.RoleId,
  ]);

  // ─── Data Fetching ────────────────────────────────────────────────────────────
  function GetAllRoles() {
    helper.xhr
      .Get("/Roles/GetAllRoles")
      .then((res) =>
        setRoles(
          res.roles.map((r: any) => ({ label: r.RoleName, value: r.RoleId })),
        ),
      )
      .catch(console.error);
  }

  function GetZooList() {
    helper.xhr
      .Get("/List/GetZooList")
      .then((res) =>
        setZoos(
          res.map((z: any) => ({ value: Number(z.ZooId), label: z.ZooTitle })),
        ),
      )
      .catch(console.error);
  }

  function GetChannels() {
    helper.xhr
      .Get("/List/GetNotificationChannels")
      .then((res) =>
        setChannels(
          res.channels.map((c: any) => ({ label: c.ChannelName, value: c.Id })),
        ),
      )
      .catch(console.error);
  }

  function GetTypes() {
    helper.xhr
      .Get("/List/GetNotificationTypes")
      .then((res) =>
        setTypes(res.types.map((t: any) => ({ label: t.Label, value: t.Id }))),
      )
      .catch(console.error);
  }

  function GetUsersByRole(roleId?: number, zooId?: number) {
    helper.xhr
      .Get(
        "/List/GetUsersByRoleAndZoo",
        helper.GetURLParamString({ roleId, zooId }).toString(),
      )
      .then((res) =>
        setUsers(res.users.filter((u: User) => !!u.UserName) ?? []),
      )
      .catch(console.error);
  }

  function GetAnimalsByZoo(zooId: number) {
    console.log("Fetching animals for zooId:", zooId);
    if (!zooId) return;
    helper.xhr
      .Get(
        "/List/GetAnimalsByZooId",
        helper.GetURLParamString({ zooId }).toString(),
      )
      .then((res) => setAnimals(res ?? []))
      .catch(console.error);
  }

  function GetEvents() {
    console.log("Fetching events for event screen");
    helper.xhr
      .Get("/Event/GetEventList")
      .then((res) => {
        {
          console.log(res);
          setEvents(
            res.events.filter((event: any) => event.IsOccasional) ?? [],
          );
        }
      })
      .catch(console.error);
  }

  useEffect(() => {
    GetAllRoles();
    GetZooList();
    GetChannels();
    GetTypes();
  }, []);

  // Fetch users when targeting specific users
  useEffect(() => {
    if (targetMode === "specific" && obj.RoleId) {
      GetUsersByRole(obj.RoleId ?? undefined, selectedZoo ?? 0);
    }
  }, [targetMode, obj.RoleId, selectedZoo]);

  // Fetch animals when zoo is selected for navigation
  useEffect(() => {
    console.log("Zoo selected for navigation:", navZooId);
    if (screenCfg.requiresAnimal && navZooId) {
      setNavAnimalId(0);
      setNavAnimalName("");
      GetAnimalsByZoo(navZooId);
    }
  }, [navZooId, obj.Screen]);

  // Fetch events when event screen is selected
  useEffect(() => {
    if (screenCfg.requiresEvent) GetEvents();
  }, [obj.Screen]);

  // Load view data
  useEffect(() => {
    if (isView) {
      helper.xhr
        .Get(
          "/Notifications/GetNotificationById",
          helper.GetURLParamString({ notificationId: Number(slug) }).toString(),
        )
        .then((res) => {
          const n = res.notification;
          setObj({
            Id: n.Id,
            Title: n.Title,
            RoleId: n.RoleId ?? null,
            UserIds: [],
            ChannelId: n.ChannelId,
            TypeId: n.TypeId,
            Body: n.Body,
            Screen: n.Screen ?? "none",
            EntityParams: n.EntityParams ?? "",
          });
        });
    }
  }, [slug]);

  // ─── Handlers ─────────────────────────────────────────────────────────────────
  function handleChange(n: string, v: string | boolean | number) {
    setObj((prev) => ({ ...prev, [n]: v }));
  }

  function handleScreenChange(_: string, v: string | boolean | number) {
    // Reset all nav selections when screen changes
    setNavZooId(0);
    setNavAnimalId(0);
    setNavAnimalName("");
    setNavEventId(0);
    setObj((prev) => ({ ...prev, Screen: v as ScreenKey, EntityParams: "" }));
  }

  function handleTargetMode(mode: TargetMode) {
    setTargetMode(mode);
    setObj((prev) => ({ ...prev, RoleId: null, UserIds: [] }));
    setUserSearch("");
  }

  function handleAnimalSelect(_: string, animalId: number | string) {
    const id = Number(animalId);
    const animal = animals.find((a) => a.AnimalId === id);
    setNavAnimalId(id);
    setNavAnimalName(animal?.AnimalName ?? "");
  }

  function toggleUser(userId: number) {
    setObj((prev) => ({
      ...prev,
      UserIds: prev.UserIds.includes(userId)
        ? prev.UserIds.filter((id) => id !== userId)
        : [...prev.UserIds, userId],
    }));
  }

  function removeUser(userId: number) {
    setObj((prev) => ({
      ...prev,
      UserIds: prev.UserIds.filter((id) => id !== userId),
    }));
  }

  const filteredUsers = useMemo(() => {
    if (!userSearch.trim()) return users;
    return users.filter((u) =>
      u.UserName?.toLowerCase().includes(userSearch.toLowerCase()),
    );
  }, [users, userSearch]);

  // ─── Validation ───────────────────────────────────────────────────────────────
  const verify = (): boolean => {
    const fail = (msg: string) => {
      toast({ title: "Validation Error", description: msg });
      return false;
    };
    if (!obj.Title.trim()) return fail("Title is required");
    if (!obj.Body.trim()) return fail("Description is required");
    if (!obj.ChannelId) return fail("Notification channel is required");
    if (!obj.TypeId) return fail("Notification type is required");
    if (targetMode === "role" && !obj.RoleId)
      return fail("Please select a role");
    if (targetMode === "specific" && obj.UserIds.length === 0)
      return fail("Please select at least one user");
    // Navigation param validation
    if (screenCfg.requiresZoo && !navZooId)
      return fail("Please select a zoo for the navigation target");
    if (screenCfg.requiresAnimal && !navAnimalId)
      return fail("Please select an animal for the navigation target");
    if (screenCfg.requiresEvent && !navEventId)
      return fail("Please select an event for the navigation target");
    return true;
  };

  // ─── Submit ───────────────────────────────────────────────────────────────────
  const HandleSubmit = () => {
    if (!verify()) return;
    setIsCruding(true);

    const payload = {
      Title: obj.Title,
      Body: obj.Body,
      ChannelId: obj.ChannelId,
      TypeId: obj.TypeId,
      RoleId: targetMode === "role" ? obj.RoleId : null,
      UserIds: targetMode === "specific" ? obj.UserIds : [],
      Screen: obj.Screen !== "none" ? obj.Screen : null,
      EntityParams: obj.EntityParams || null,
    };

    helper.xhr
      .Post(
        `/Notifications/${isNew ? "SendNotification" : "UpdateNotification"}`,
        helper.ConvertToFormDataV2(payload),
      )
      .then((res) => {
        if (res.statusCode === 200) {
          toast({ title: res.message, variant: "success" });
          // setTimeout(() => router.back(), 3000);
        }
      })
      .catch((err) => toast({ title: err.message, variant: "danger" }))
      .finally(() => setIsCruding(false));
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  function GetHeading() {
    return `${isNew ? "Create" : "View"} Notification${!isNew && obj.Title ? ` — ${obj.Title}` : ""}`;
  }

  const targetModes: {
    mode: TargetMode;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      mode: "role",
      label: "By Role",
      description: "Send to all users of a role",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      mode: "specific",
      label: "Specific Users",
      description: "Select individual users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      mode: "all",
      label: "All Users",
      description: "Broadcast to everyone",
      icon: <Globe className="h-4 w-4" />,
    },
  ];

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Subheading text={GetHeading()} />
      </div>

      <Card>
        <CardHeader />
        <CardContent className="space-y-8">
          {/* ── Section 1: Details ─────────────────────────────────────────── */}
          <div className="space-y-3">
            <Paragraph text="Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <InputTag
                value={obj.Title}
                name="Title"
                setter={handleChange}
                label="Title"
                disabled={!isNew}
              />
              <Dropdown
                activeId={obj.ChannelId}
                name="ChannelId"
                options={channels}
                handleDropdownChange={handleChange}
                label="Notification Channel"
                isDisabled={!isNew}
              />
              <Dropdown
                activeId={obj.TypeId}
                name="TypeId"
                options={types}
                handleDropdownChange={handleChange}
                label="Notification Type"
                isDisabled={!isNew}
              />
              <div className="col-span-1 md:col-span-2">
                <TextArea
                  value={obj.Body}
                  name="Body"
                  setter={handleChange}
                  label="Description"
                  placeHolder="Write description here..."
                  disabled={!isNew}
                />
              </div>
            </div>
          </div>

          {/* ── Section 2: Navigation ──────────────────────────────────────── */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Paragraph text="On Tap Navigation" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <div>
                <Dropdown
                  activeId={obj.Screen}
                  name="Screen"
                  options={SCREEN_OPTIONS}
                  handleDropdownChange={handleScreenChange}
                  label="Navigate To Screen"
                  isDisabled={!isNew}
                />
                {obj.Screen !== "none" && (
                  <p className="mt-1 text-xs text-muted-foreground font-mono">
                    params: {screenCfg.paramsPreview}
                  </p>
                )}
              </div>

              {/* Zoo selector (navigation) */}
              {isNew && screenCfg.requiresZoo && (
                <Dropdown
                  activeId={navZooId}
                  name="navZooId"
                  options={[{ label: "Select Zoo...", value: 0 }, ...zoos]}
                  handleDropdownChange={(_, v) => setNavZooId(Number(v))}
                  label="Zoo"
                />
              )}

              {/* Animal selector — appears after zoo is selected */}
              {isNew && screenCfg.requiresAnimal && (
                <Dropdown
                  activeId={navAnimalId}
                  name="navAnimalId"
                  options={[
                    {
                      label: navZooId
                        ? "Select Animal..."
                        : "Select a zoo first",
                      value: 0,
                    },
                    ...animals.map((a) => ({
                      label: a.AnimalName,
                      value: a.AnimalId,
                    })),
                  ]}
                  handleDropdownChange={handleAnimalSelect}
                  label="Animal"
                  isDisabled={!navZooId}
                />
              )}

              {/* Event selector */}
              {isNew && screenCfg.requiresEvent && (
                <Dropdown
                  activeId={navEventId}
                  name="navEventId"
                  options={[
                    { label: "Select Event...", value: 0 },
                    ...events.map((e) => ({
                      label: e.EventTitle,
                      value: e.EventId,
                    })),
                  ]}
                  handleDropdownChange={(_, v) => setNavEventId(Number(v))}
                  label="Event"
                />
              )}
            </div>

            {/* Live params preview */}
            {isNew && obj.Screen !== "none" && obj.EntityParams && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-muted/40 border border-border">
                <Navigation className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    Params that will be sent
                  </p>
                  <code className="text-xs font-mono text-foreground break-all">
                    {obj.EntityParams}
                  </code>
                </div>
              </div>
            )}

            {/* View mode: show stored params */}
            {isView && obj.EntityParams && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-muted/40 border border-border">
                <Navigation className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">
                    Navigation Params
                  </p>
                  <code className="text-xs font-mono text-foreground break-all">
                    {obj.EntityParams}
                  </code>
                </div>
              </div>
            )}
          </div>

          {/* ── Section 3: Target Audience (create only) ────────────────────── */}
          {isNew && (
            <div className="space-y-4">
              <Paragraph text="Target Audience" />

              {/* Mode cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {targetModes.map(({ mode, label, description, icon }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleTargetMode(mode)}
                    className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-all font-poppins
                      ${
                        targetMode === mode
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/40 hover:bg-muted/40"
                      }`}
                  >
                    <div
                      className={`mt-0.5 ${targetMode === mode ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Role mode */}
              {targetMode === "role" && (
                <div className="max-w-xs">
                  <Dropdown
                    activeId={obj.RoleId ?? 0}
                    name="RoleId"
                    options={roles}
                    handleDropdownChange={handleChange}
                    label="Select Role"
                  />
                </div>
              )}

              {/* Specific users mode */}
              {targetMode === "specific" && (
                <div className="space-y-3">
                  <div className="flex items-end gap-3 flex-wrap">
                    <div className="w-48">
                      <Dropdown
                        activeId={obj.RoleId ?? 0}
                        name="RoleId"
                        options={[{ label: "All Roles", value: 0 }, ...roles]}
                        handleDropdownChange={(n, v) => {
                          handleChange(n, v);
                          setObj((p) => ({ ...p, UserIds: [] }));
                        }}
                        label="Filter by Role"
                      />
                    </div>
                    <div className="w-48">
                      <Dropdown
                        activeId={selectedZoo}
                        name="ZooId"
                        clearable
                        options={[{ label: "All Zoos", value: 0 }, ...zoos]}
                        handleDropdownChange={(_, v) =>
                          setSelectedZoo(Number(v) ?? 0)
                        }
                        label="Filter by Zoo"
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-xs font-medium text-muted-foreground block mb-1">
                        Search Users
                      </label>
                      <input
                        type="text"
                        placeholder="Search by name..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  {/* Selected chips */}
                  {obj.UserIds.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {obj.UserIds.map((id) => {
                        const user = users.find((u) => u.UserId === id);
                        return (
                          <span
                            key={id}
                            className="font-poppins inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20"
                          >
                            {user?.UserName ?? `User #${id}`}
                            <button
                              type="button"
                              onClick={() => removeUser(id)}
                              className="hover:text-destructive transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* User list */}
                  <div className="border border-border rounded-lg overflow-hidden max-h-60 overflow-y-auto font-poppins">
                    {filteredUsers.length === 0 ? (
                      <div className="px-4 py-6 text-sm text-center text-muted-foreground">
                        No users found
                      </div>
                    ) : (
                      filteredUsers.map((user) => {
                        const selected = obj.UserIds.includes(user.UserId);
                        return (
                          <button
                            key={user.UserId}
                            type="button"
                            onClick={() => toggleUser(user.UserId)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-xs border-b border-border last:border-0 transition-colors text-left
                                ${selected ? "bg-primary/5 text-primary" : "hover:bg-muted/50"}`}
                          >
                            <span>{user.UserName}</span>
                            {selected && (
                              <span className="text-xs font-medium text-primary">
                                ✓ Selected
                              </span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {obj.UserIds.length} user
                    {obj.UserIds.length !== 1 ? "s" : ""} selected
                  </p>
                </div>
              )}

              {/* All users note */}
              {targetMode === "all" && (
                <div className="flex items-center gap-2 p-3 rounded-md border border-primary/40 bg-muted/40 text-sm">
                  <Globe className="h-4 w-4 shrink-0" />
                  This notification will be sent to all active users across
                  every role.
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end gap-2">
            <ButtonComp
              text="Cancel"
              type="white"
              clickEvent={() => router.back()}
              beforeIcon={<X className="h-4 w-4" />}
            />
            {isNew && (
              <ButtonComp
                isCruding={isCruding}
                text="Send Notification"
                clickEvent={HandleSubmit}
                beforeIcon={<Save className="h-4 w-4" />}
              />
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationManagementPage;
