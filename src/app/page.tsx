"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import InputTag from "@/components/utils/FormElements/InputTag";
import PasswordInputTag from "@/components/utils/FormElements/PasswordInputTag";
import ButtonComp from "@/components/utils/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(
    process.env.NODE_ENV == "development" ? "admin@zoosystem.com" : ""
  );
  const [password, setPassword] = useState(
    process.env.NODE_ENV == "development" ? "password" : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication delay
    setTimeout(() => {
      // Simple validation
      if (email === "admin@zoosystem.com" && password === "password") {
        router.push("/home");
      } else {
        setError("Invalid email or password.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col loginBg">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative flex-1 h-full grid grid-cols-1 md:grid-cols-[65%_35%]">
        <div className="flex flex-col justify-center text-white p-5 space-y-4">
          <h1 className="font-semibold tracking-tighter text-7xl leading-[80px] font-faustina">
            Punjab Wildlife & <br /> Parks
          </h1>
          <div className="border-b border-double border-b-white w-[30%]"></div>
          <p className="w-full md:w-3/4 text-sm font-syne">
            The Parks and Wildlife Department of Punjab oversees three premier
            zoological facilities in the province: Lahore Zoo, Lahore Safari
            Park, and Bahawalpur Zoo. Each offers unique wildlife experiences
            that attract both domestic and international visitors.
          </p>
        </div>
        <div className="font-tajawal flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-white/90 via-white to-white/10 backdrop-blur-md shadow-[inset_1px_1px_4px_rgba(255,255,255,0.1),_4px_4px_12px_rgba(0,0,0,0.2)] rounded-lg m-3 space-y-9">
          <div className="flex gap-2">
            <Image src={"/PWL_logo.png"} height={100} width={100} alt="logo" />
          </div>
          <div className="mt-5 w-full">
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-600 flex items-center gap-2">
                  <InfoIcon className="h-3 w-3" />
                  <span> {error}</span>
                </div>
              )}
              <InputTag
                name=""
                value={email}
                setter={(n, v) => {
                  setEmail(v);
                }}
                label="Email Address"
                placeHolder="youremail@domain.com"
              />
              <PasswordInputTag
                name=""
                value={password}
                type="password"
                setter={(n, v) => {
                  setPassword(v);
                }}
                label="Password"
                placeHolder="********"
              />
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                type="submit"
                className="w-full text-xs font-faustina bg-[#422402] hover:bg-[#422402]/80 disabled:bg-[#422402]/60"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </div>
        </div>
      </div>
    </div>
  );
}
