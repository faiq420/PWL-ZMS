import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { ArrowLeft, Save, SaveIcon, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import type { User } from "@/types/user";
import InputTag from "@/components/utils/FormElements/InputTag";
import Checkbox from "@/components/utils/FormElements/Checkbox";
import { FileUploader } from "@/components/animal/file-uploader";
import Toggle from "@/components/utils/FormElements/Toggle";
import { formatCnic, formatPhoneNumber } from "@/Helper/Utility";
import useHelper from "@/Helper/helper";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ButtonComp from "@/components/utils/Button";

interface Props {
  mode?: string;
  id?: string;
}

interface UserProps extends User {
  cnic: string;
  ProfileImagePath: string;
}

const UserCreate = ({ mode = "create", id = "0" }: Props) => {
  const helper = useHelper();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>();
  const [user, setUser] = useState<UserProps>({
    Id: 0,
    email: "",
    firstName: "",
    lastName: "",
    role: "admin",
    status: "active",
    createdAt: "",
    cnic: "",
    phone: "",
    ProfileImagePath: "",
  });

  const capitalize = (value: string, space = " ") => {
    const words = String(value).split(space);
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  function GetHeading() {
    return `${capitalize(mode)} - ${capitalize(String("User"), "-")} ${
      id != "0" ? `for ${user.firstName} ${user.lastName}` : ""
    }`;
  }

  function handleChange(name: string, value: string) {
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  function UpdateFile(id: number, file: File) {
    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("file.file", file);
  }

  function HandleSubmit() {
    helper.xhr.Post(
      '/Users/CreateUser',
      helper.ConvertToFormData({
        obj: {
          
        }
      })
    )
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-around">
            <Subheading text={GetHeading()} />
          </div>
        </div>
        
      </div>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-3 items-center">
              <InputTag
                name="firstName"
                value={user.firstName}
                setter={handleChange}
                label="First Name"
              />
              <InputTag
                name="lastName"
                value={user.lastName}
                setter={handleChange}
                label="Last Name"
              />
              <InputTag
                name="email"
                value={user.email}
                setter={handleChange}
                label="Email"
              />
              <InputTag
                name="cnic"
                value={user.cnic}
                setter={(n, v) => {
                  handleChange(n, formatCnic(v));
                }}
                label="Cnic"
              />
              <InputTag
                name="phone"
                value={user.phone}
                setter={(n, v) => handleChange(n, formatPhoneNumber(v))}
                label="Contact"
              />
              <div className="flex h-full items-end">
                <Toggle
                  name="status"
                  value={user.status}
                  setter={handleChange}
                  label="Is Active"
                />
              </div>
            </div>
            <div className="md:-mt-2 space-y-2 w-full md:w-1/3">
              <Label>User Image</Label>
              {imageFile != null || user?.ProfileImagePath != "" ? (
                <div className="relative aspect-video rounded-md border border-main-gray/30 overflow-hidden w-full">
                  <Image
                    src={
                      user?.ProfileImagePath && user?.ProfileImagePath != ""
                        ? helper.GetDocument(user.ProfileImagePath)
                        : imageFile
                        ? URL.createObjectURL(imageFile)
                        : "/placeholder.svg"
                    }
                    alt="Category image"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {imageFile != null && user.Id != 0 && (
                    <Button
                      variant="default"
                      size="icon"
                      className="absolute top-1 left-1 h-6 w-6 rounded-full"
                      onClick={() => {
                        UpdateFile(user.Id, imageFile);
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
                      setUser({ ...user, ProfileImagePath: "" });
                      setImageFile(null);
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              ) : (
                <>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("file-upload")?.click();
                    }}
                    className="flex w-full flex-col items-center justify-center aspect-video rounded-md border border-dashed border-main-gray/50 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-main-gray mb-1" />
                    <span className="text-xs text-main-gray">Add Image</span>
                  </button>
                </>
              )}
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
