import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession, Session } from 'next-auth';
import { Session } from 'inspector';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? ''
        })
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hours
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
};

interface ISession {
    userEmail: string
}

export const getAuthSession = (): Promise<Session | null> => getServerSession(authOptions)