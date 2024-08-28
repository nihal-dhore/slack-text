"use client";
import { Button } from "@/components/ui/button";
import { signInWithProvider, signOutAction } from "./actions/auth-actions";

export default function Home() {
  const handleProviderSignin = async (value: "github" | "google") => {
    await signInWithProvider(value);
  };
  return (
    <div className="flex h-full justify-end p-5">
      <Button
        onClick={async() => {
          await signOutAction();
        }}>
        Signout
      </Button>
    </div>
  );
}
