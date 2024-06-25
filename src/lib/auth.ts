import {
  DefaultSession,
  NextAuthOptions,
  User,
  getServerSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { LoginResponse } from "./zod/login";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const userAuthResponse = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        if (!userAuthResponse.ok) return null;

        const userAuthData: LoginResponse = await userAuthResponse.json();

        if (!userAuthData.user || userAuthData.isError) return null;

        return {
          id: userAuthData.user.id,
          name: userAuthData.user.name,
          email: userAuthData.user.email,
          image: userAuthData.user.image,
        } as User;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, session, trigger }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      // console.log("jwt:", token, account);
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.sub = account?.userId;
      }

      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log("session:", session, token, user);
      session.user.id = token.sub;
      return session;
    },
  },
  events: {
    signIn: async ({ user, account }) => {
      // console.log("signIn:", user, account);
    },
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthOptions;

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, nextAuthOptions);
}
