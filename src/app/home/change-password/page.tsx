"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonComp from "@/components/utils/Button";
import InputTag from "@/components/utils/FormElements/InputTag";
import { Info } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [validationCriteria, setValidationCriteria] = useState({
    hasLowerCase: true,
    hasUpperCase: true,
    hasDigit: true,
    hasSymbol: true,
    hasMinimumLength: true,
  });
  const HandleSubmit = () => {
    setError(""); // Clear previous error
    if (oldPassword == "") {
      setError("Please provide current password.");
      return;
    }
    if (newPassword == "") {
      setError("Please provide new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password mismatch.");
      return;
    }

    if (validate()) {
      // Proceed with password change
      console.log("Password change logic here");
    }
  };

  const validate = () => {
    const criteria = {
      hasLowerCase: /[a-z]/.test(newPassword),
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasDigit: /\d/.test(newPassword),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      hasMinimumLength: newPassword.length >= 8,
    };

    setValidationCriteria(criteria);

    const allPassed = Object.values(criteria).every(Boolean);
    if (!allPassed) {
      setError("Password does not meet the required criteria.");
    }

    return allPassed;
  };

  return (
    <>
      <Card className="px-6">
        <CardHeader className="pb-2 border-b px-0">Change Password</CardHeader>
        <CardContent className="px-0 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InputTag
              value={oldPassword}
              setter={(n, v) => {
                setOldPassword(v);
              }}
              name=""
              label="Current Password"
            />
            <InputTag
              value={newPassword}
              setter={(n, v) => {
                setNewPassword(v);
              }}
              name=""
              label="New Password"
            />
            <InputTag
              value={confirmPassword}
              setter={(n, v) => {
                setConfirmPassword(v);
              }}
              name=""
              label="Confirm Password"
            />
          </div>
          {!Object.values(validationCriteria).every(Boolean) && (
            <ul className="text-xs text-red-600 mt-6 space-y-1 ml-1 italic">
              {!validationCriteria.hasLowerCase && (
                <li>
                  • Must include a <u>lowercase</u> letter
                </li>
              )}
              {!validationCriteria.hasUpperCase && (
                <li>
                  • Must include an <u>uppercase</u> letter
                </li>
              )}
              {!validationCriteria.hasDigit && (
                <li>
                  • Must include a <u>number</u>
                </li>
              )}
              {!validationCriteria.hasSymbol && (
                <li>
                  • Must include a <u>special character</u>
                </li>
              )}
              {!validationCriteria.hasMinimumLength && (
                <li>
                  • Must be at least <u>8 characters</u>
                </li>
              )}
            </ul>
          )}
        </CardContent>
        <CardFooter className="px-0 flex-col">
          <div className="w-full flex justify-end">
            <div className="w-full md:w-1/5">
              <ButtonComp text="Confirm" clickEvent={HandleSubmit} />
            </div>
          </div>
          {error != "" && (
            <div className="text-red-600 text-xs flex mt-2 items-center w-full justify-end">
              <Info size={14} className="mr-2" />
              <p>{error}</p>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default Page;
