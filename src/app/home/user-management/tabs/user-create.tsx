import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import type { User } from "@/types/user";
import InputTag from "@/components/utils/FormElements/InputTag";
import Checkbox from "@/components/utils/FormElements/Checkbox";
import { FileUploader } from "@/components/animal/file-uploader";
import Toggle from "@/components/utils/FormElements/Toggle";
import { formatCnic } from "@/Helper/Utility";

interface Props {
  mode?: string;
  id?: string;
}

interface UserProps extends User {
  cnic: string;
}

const UserCreate = ({ mode = "create", id = "0" }: Props) => {
  const router = useRouter();

  const [user, setUser] = useState<UserProps>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "admin",
    status: "active",
    createdAt: "",
    cnic: "",
    phone: "",
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
                setter={(n, v) => {handleChange(n, formatCnic(v));}}
                label="Cnic"
              />
              <InputTag
                name="phone"
                value={user.phone}
                setter={handleChange}
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
            <FileUploader
              onUpload={() => console.log("Good")}
              accept="image/*"
              multiple={true}
              label="Upload User Image"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCreate;
