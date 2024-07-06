import NextAuth, { NextAuthOptions, RequestInternal, Session, User } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db';
import { compare } from "bcryptjs";
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    pages: { signIn: '/login' },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    type: 'email',
                },
                password: {
                    type: 'password',
                },
            },
            authorize: (credentials, req) => authentication(credentials, req)
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: token.sub },
                    select: {
                        id: true,
                        firstName: true,
                        email: true,
                        Image: true,
                    },
                });

                return {
                    ...session,
                    user: {
                        ...session.user,
                        ...user,
                    },
                };
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                return session;
            }
        },
    },
    events: {
        async signIn({ user }: { user: User }) {
            const workspaceCount = await prisma.visitedCountry.count({
                where: { userId: user.id },
            });

            if (!user.image) {
                const avatarImage = `https://ui-avatars.com/api/?name=${user?.name}&background=random&rounded=true`;

                try {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { Image: avatarImage },
                    });
                    console.log(`Updated user's image to default.`);
                } catch (error) {
                    console.error('Failed to update user image:', error);
                }
            }
        },
    },
};

async function authentication(credentials: Record<'email' | 'password', string> | undefined, req: Pick<RequestInternal, 'query' | 'body' | 'headers' | 'method'> | undefined){
    if (!credentials) {
        throw new Error('Missing credentials');
    }

    if (!credentials.email) {
        throw new Error('"email" is required in credentials');
    }

    if (!credentials.password) {
        throw new Error('"password" is required in credentials');
    }

    const userInDb = await prisma.user.findFirst({
        where: { email: credentials.email },
        select: {
            id: true,
            firstName: true,
            email: true,
            password: true,
            Image: true,
        },
    });

    if (!userInDb || !userInDb.password) {
        return null;
    }

    const isValid = await compare(credentials.password, userInDb.password);

    if (!isValid) {
        return null;
    }

    return {
        id: userInDb.id,
        name: userInDb.firstName,
        email: userInDb.email,
        image: userInDb.Image,
    };
}


export default NextAuth(authOptions);


