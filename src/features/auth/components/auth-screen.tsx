"use client";

import { useState } from "react";
import { SignInFlow } from "@/features/auth/types";
import SigninCard from "@/features/auth/components/sign-in-card";
import SignupCard from "@/features/auth/components/sign-up-card";
import { signOutAction } from "@/app/actions/auth-actions";

export default function AuthScreen() {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SigninCard setState={setState} />
        ) : (
          <SignupCard setState={setState} />
        )}
        <button onClick={async () => await signOutAction()}>SignOut</button>
      </div>
    </div>
  );
}
