"use client";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { signInWithProvider } from "@/app/actions/auth-actions";

interface SigninCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SigninCard({ setState }: SigninCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleProviderSignin = async (value: "github" | "google") => {
    await signInWithProvider(value);
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col items-center gap-y-2.5">
          <Button
            disabled={false}
            onClick={() => {
              handleProviderSignin("google");
            }}
            variant={"outline"}
            size={"lg"}
            className="w-full relative">
            <FcGoogle className="absolute size-5 top-3 left-2.5" />
            Continue with google
          </Button>
          <Button
            disabled={false}
            onClick={() => handleProviderSignin("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative">
            <FaGithub className="absolute size-5 top-3 left-2.5" />
            Continue with github
          </Button>
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span
              className="text-sky-700 hover:underline cursor-pointer"
              onClick={() => setState("signUp")}>
              Sign up
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
