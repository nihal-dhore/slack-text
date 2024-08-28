import NextAuth, { Session } from "next-auth";
import prisma from "@/lib/prisma";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { JWT } from "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Github,
    Google
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 2592000
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email as string;
        token.id = account.access_token;
      }
      return token;
    },
    async session({ session, token }: {
      session: Session,
      token: JWT;
    }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email
          }
        });

        if (user) {
          session.user.id = user.id;
        }
      } catch (error) {
        console.log(error);

      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google" || account?.provider === "github") {

          const user = await prisma.user.findUnique({
            where: {
              email: profile?.email!
            }
          });

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                email: profile?.email!,
              }
            });
          }
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
});