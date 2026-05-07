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
import { ArrowLeft, Save, X, Users, Shield, Globe } from "lucide-react";
import Subheading from "@/components/utils/Headings/Subheading";
import { OPTION } from "@/types/utils";
import InputTag from "@/components/utils/FormElements/InputTag";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import TextArea from "@/components/utils/FormElements/TextArea";
import ButtonComp from "@/components/utils/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

type TargetMode = "role" | "specific" | "all";

type Notification = {
  Id: number;
  Title: string;
  RoleId: number | null;
  UserIds: number[];
  ChannelId: number;
  TypeId: number;
  DataPayload: string | null;
  Body: string;
};

type User = {
  UserId: number;
  UserName: string;
};

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
  const [roles, setRoles] = useState<OPTION[]>([]);
  const [channels, setChannels] = useState<OPTION[]>([]);
  const [types, setTypes] = useState<OPTION[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [obj, setObj] = useState<Notification>({
    Id: 0,
    Title: "",
    RoleId: null,
    UserIds: [],
    ChannelId: 0,
    TypeId: 0,
    Body: "",
    DataPayload: null,
  });

  // ─── Guards ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (slug && slug !== "new" && isNaN(Number(slug))) {
      router.push("/home/notification-management");
    }
  }, [slug]);

  // ─── Data Fetching ───────────────────────────────────────────────────────────

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

  function GetChannels() {
    helper.xhr
      .Get("/Notifications/GetChannels")
      .then((res) =>
        setChannels(
          res.channels.map((c: any) => ({ label: c.ChannelName, value: c.Id })),
        ),
      )
      .catch(console.error);
  }

  function GetTypes() {
    helper.xhr
      .Get("/Notifications/GetTypes")
      .then((res) =>
        setTypes(res.types.map((t: any) => ({ label: t.Label, value: t.Id }))),
      )
      .catch(console.error);
  }

  function GetUsersByRole(roleId?: number) {
    helper.xhr
      .Get(
        `/List/GetUsersByRole`,
        helper.GetURLParamString({ roleId }).toString(),
      )
      .then((res) => {
        console.log(res.users);
        setUsers(res.users.filter((u: User) => !!u.UserName) ?? []);
      })
      .catch(console.error);
  }

  useEffect(() => {
    GetAllRoles();
    GetChannels();
    GetTypes();
  }, []);

  // Fetch users when target mode is specific
  useEffect(() => {
    if (targetMode === "specific" && obj.RoleId != 0) {
      GetUsersByRole(obj.RoleId ?? undefined);
    }
  }, [targetMode, obj.RoleId]);

  // Load existing notification for view
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
            DataPayload: n.DataPayload,
          });
        });
    }
  }, [slug]);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  function handleChange(n: string, v: string | boolean | number) {
    setObj((prev) => ({ ...prev, [n]: v }));
  }

  function handleTargetMode(mode: TargetMode) {
    setTargetMode(mode);
    // Reset targeting fields when mode changes
    setObj((prev) => ({ ...prev, RoleId: null, UserIds: [] }));
    setUserSearch("");
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
    if (!userSearch || userSearch.trim() === "") return users;

    const query = userSearch.toLowerCase();
    console.log("Filtering users with query:", users, query);
    return users.filter(
      (u) => u.UserName !== null && u.UserName.toLowerCase().includes(query),
    );
  }, [users, userSearch]);

  // ─── Validation ──────────────────────────────────────────────────────────────

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
    return true;
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────

  const HandleSubmit = () => {
    if (!verify()) return;

    setIsCruding(true);

    const payload = {
      Title: obj.Title,
      Body: obj.Body,
      ChannelId: obj.ChannelId,
      TypeId: obj.TypeId,
      DataPayload: obj.DataPayload,
      // Targeting — only send what's relevant to the mode
      RoleId: targetMode === "role" ? obj.RoleId : null,
      UserIds: targetMode === "specific" ? obj.UserIds : [],
    };

    helper.xhr
      .Post(
        `/Notifications/${isNew ? "SendNotification" : "UpdateNotification"}`,
        helper.ConvertToFormDataV2(payload),
      )
      .then((res) => {
        if (res.statusCode === 200) {
          toast({ title: res.message, variant: "success" });
          setTimeout(() => router.back(), 2000);
        }
      })
      .catch((err) => {
        toast({ title: err.message, variant: "danger" });
      })
      .finally(() => setIsCruding(false));
  };

  // ─── Heading ──────────────────────────────────────────────────────────────────

  function GetHeading() {
    const action = isNew ? "Create" : "View";
    const suffix = !isNew && obj.Title ? ` — ${obj.Title}` : "";
    return `${action} Notification${suffix}`;
  }

  // ─── Target Mode Options ──────────────────────────────────────────────────────

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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Subheading text={GetHeading()} />
        </div>
      </div>

      <Card>
        <CardHeader />
        <CardContent className="space-y-8">
          {/* ── Section 1: Details ── */}
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
              <div className="col-span-1 md:col-span-2">
                <TextArea
                  value={obj.DataPayload ?? ""}
                  name="DataPayload"
                  setter={handleChange}
                  label="Data Payload (optional)"
                  placeHolder='{"key": "value","key2": "value2"}'
                  disabled={!isNew}
                />
              </div>
            </div>
          </div>

          {/* ── Section 2: Targeting (only on create) ── */}
          {isNew && (
            <div className="space-y-4">
              <Paragraph text="Target Audience" />

              {/* Mode selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {targetModes.map(({ mode, label, description, icon }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleTargetMode(mode)}
                    className={`
                      flex items-start gap-3 p-4 rounded-lg border text-left transition-all font-poppins
                      ${
                        targetMode === mode
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/40 hover:bg-muted/40"
                      }
                    `}
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

              {/* Role dropdown */}
              {targetMode === "role" && (
                <div className="max-w-xs">
                  <Dropdown
                    activeId={obj.RoleId ?? 0}
                    name="RoleId"
                    options={roles}
                    handleDropdownChange={handleChange}
                    label="Select Role"
                    isDisabled={false}
                  />
                </div>
              )}

              {/* Specific user selector */}
              {targetMode === "specific" && (
                <div className="space-y-3">
                  {/* Optional role filter */}
                  <div className="flex items-center gap-3">
                    <div className="w-56">
                      <Dropdown
                        activeId={obj.RoleId ?? 0}
                        name="RoleId"
                        options={[{ label: "All Roles", value: 0 }, ...roles]}
                        handleDropdownChange={(n, v) => {
                          handleChange(n, v);
                          setObj((prev) => ({ ...prev, UserIds: [] }));
                        }}
                        label="Filter by Role"
                        isDisabled={false}
                      />
                    </div>
                    <div className="flex-1 mt-5">
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  {/* Selected users chips */}
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
                            className={`
                              w-full flex items-center justify-between px-4 py-2.5 text-xs
                              border-b border-border last:border-0 transition-colors text-left
                              ${
                                selected
                                  ? "bg-primary/5 text-primary"
                                  : "hover:bg-muted/50"
                              }
                            `}
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

              {/* All users confirmation note */}
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
