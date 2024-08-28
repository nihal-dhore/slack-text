"use server";
import { signIn, signOut } from "@/auth";


export async function signInWithProvider(provider: "github" | "google") {
  return await signIn(provider, {
    redirectTo: "/",
    redirect: true
  });
}
export async function signOutAction() {
  return await signOut({
    redirect: true,
    redirectTo: "/auth"
  });
}