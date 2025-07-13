import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { ArrowLeft, Save, SaveIcon, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import type { User } from "@/types/user";
import InputTag from "@/components/utils/FormElements/InputTag";
import Checkbox from "@/components/utils/FormElements/Checkbox";
import { FileUploader } from "@/components/animal/file-uploader";
import Toggle from "@/components/utils/FormElements/Toggle";
import { formatCnic } from "@/Helper/Utility";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import useHelper from "@/Helper/helper";
import { OPTION } from "@/types/utils";
import Dropdown from "@/components/utils/FormElements/Dropdown";
import { zoos } from "@/data/users";
import ButtonComp from "@/components/utils/Button";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  mode?: string;
  id?: string;
}

interface UserProps extends User {
  cnic: string;
}

type UserObject = {
  UserId: number;
  RoleId: number;
  UserEmail: string;
  UserName: string;
  UserPhone: string;
  UserPassword: string;
  IsActive: boolean;
  UserCnic: string;
  ImagePath: string;
  Specialization?: string;
  LicenseNumber?: string;
  AssignedZoo?: number;
};

const UserCreate = ({ mode = "create", id = "0" }: Props) => {
  const router = useRouter();
  const helper = useHelper();
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [isCruding, setIsCruding] = useState<boolean>(false);
  const toast = useToast();
  const [obj, setObj] = useState<UserObject>({
    UserId: 0,
    UserEmail: "",
    UserName: "",
    UserPhone: "",
    UserPassword: "",
    IsActive: true,
    UserCnic: "",
    ImagePath: "",
    RoleId: 0,
    Specialization: "",
    LicenseNumber: "",
    AssignedZoo: 0,
  });
  const [zooList, setZooList] = useState<OPTION[]>(
    zoos.map((z: any) => {
      return { label: z.label, value: z.value };
    })
  );
  const [roles, setRoles] = useState<OPTION[]>([]);
  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String("User"), "-")} ${
      id != "0" ? `for ${obj.UserName}` : ""
    }`;
  }

  function handleChange(name: string, value: string | number | boolean) {
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImgFile(selectedFile);
    }
  };

  useEffect(() => {
    // Fetch roles from the server
    helper.xhr
      .Get("/Roles/GetAllRoles")
      .then((response) => {
        const roleOptions = response.roles.map((role: any) => ({
          label: role.RoleName,
          value: role.RoleId,
        }));
        setRoles(roleOptions);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  useEffect(() => {
    if (id && id !== "0") {
      // Fetch user data by ID
      helper.xhr
        .Get(
          "/Users/GetUserById",
          helper.GetURLParamString({ userId: Number(id) }).toString()
        )
        .then((response) => {
          const user = response.user;
          setObj({
            ...response.user,
            ImagePath:
              `https://localhost:44383/user/${response.user.UserId}${response.user.Extension}` ||
              "",
            UserPassword: "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  function UpdateFile(id: number, file: File) {
    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("file.file", file);
  }

  function HandleSubmit() {
    setIsCruding(true);
    const data = {
      UserId: obj.UserId,
      UserEmail: obj.UserEmail,
      UserName: obj.UserName,
      UserPhone: obj.UserPhone,
      IsActive: obj.IsActive,
      UserCnic: obj.UserCnic,
      RoleId: obj.RoleId,
    };
    helper.xhr
      .Post(
        `/Users/${mode === "create" ? "CreateUser" : "UpdateUser"}`,
        helper.ConvertToFormData({
          obj: data,
          ZooId: obj.AssignedZoo === 0 ? null : obj.AssignedZoo,
          image: imgFile,
        })
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsCruding(false);
        toast.toast({
          title: "Operation Successful",
          description: `User ${
            mode === "create" ? "Created" : "Updated"
          } Successfully`,
        });
        router.back();
      });
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <Subheading text={GetHeading()} />
          </div>
        </div>
      </div>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="mb-5 space-y-2 w-[80%] md:w-[20%] mx-auto">
              {imgFile != null || obj?.ImagePath != "" ? (
                <div className="relative aspect-square rounded-md border border-main-gray/30 overflow-hidden">
                  <Image
                    src={
                      obj?.ImagePath && obj?.ImagePath != ""
                        ? // ? helper.GetDocument(obj.ImagePath)
                          obj.ImagePath
                        : imgFile
                        ? URL.createObjectURL(imgFile)
                        : "/placeholder.svg"
                    }
                    alt="Profile image"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {imgFile != null && (
                    <Button
                      variant="default"
                      size="icon"
                      className="absolute top-1 left-1 h-6 w-6 rounded-full"
                      onClick={() => {
                        UpdateFile(Number(obj.UserId), imgFile);
                      }}
                    >
                      <SaveIcon className="h-3 w-3" />
                      <span className="sr-only">Update image</span>
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={() => {
                      setObj({ ...obj, ImagePath: "" });
                      setImgFile(null);
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              ) : (
                <>
                  <input
                    id="profileImg-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("profileImg-upload")?.click();
                    }}
                    className="flex w-full flex-col items-center justify-center aspect-square rounded-md border border-dashed border-main-gray/50 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-main-gray mb-1" />
                    <span className="text-xs text-main-gray">Add Image</span>
                  </button>
                </>
              )}
              <Label className="text-center block w-full">Profile Image</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3 items-center">
              <InputTag
                name="UserName"
                value={obj.UserName}
                setter={handleChange}
                label="User Name"
                placeHolder="User Name"
              />
              <InputTag
                name="UserCnic"
                value={obj.UserCnic}
                setter={(n, v) => {
                  handleChange(n, formatCnic(v));
                }}
                placeHolder="xxxxx-xxxxxxx-x"
                label="Cnic"
              />
              <InputTag
                name="UserEmail"
                value={obj.UserEmail}
                setter={handleChange}
                label="Email"
                placeHolder="example@org.com"
              />
              <InputTag
                name="UserPhone"
                value={obj.UserPhone}
                setter={handleChange}
                label="Contact"
                placeHolder="03xx-xxxxxxx"
              />
              <Dropdown
                name="RoleId"
                options={roles}
                activeId={obj.RoleId}
                handleDropdownChange={handleChange}
                label="Role"
              />
              {[2, 3].includes(obj.RoleId) && (
                <Dropdown
                  name="AssignedZoo"
                  options={zooList}
                  activeId={obj.AssignedZoo || 0}
                  handleDropdownChange={handleChange}
                  label="Assigned Zoo"
                />
              )}
              {obj.RoleId == 3 && (
                <InputTag
                  name="Specialization"
                  value={obj.Specialization}
                  setter={handleChange}
                  label="Specialization"
                  placeHolder="Large Animal Vet"
                />
              )}
              {obj.RoleId == 3 && (
                <InputTag
                  name="LicenseNumber"
                  value={obj.LicenseNumber}
                  setter={handleChange}
                  label="LicenseNumber"
                  placeHolder="VET-2024-001"
                />
              )}
              <div className="flex h-full items-end">
                <Toggle
                  name="IsActive"
                  value={obj.IsActive}
                  setter={handleChange}
                  label="Is Active"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end">
            <div className="w-full md:w-fit flex space-x-2">
              <ButtonComp
                text={"Cancel"}
                type={"white"}
                clickEvent={() => router.back()}
                beforeIcon={<X className="h-4 w-4" />}
              />
              <ButtonComp
                text={mode == "edit" ? "Save" : "Create"}
                clickEvent={HandleSubmit}
                beforeIcon={<Save className="h-4 w-4" />}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserCreate;
