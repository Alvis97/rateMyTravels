
import { User } from "@prisma/client";
import { useSession } from 'next-auth/react';
import { createContext } from 'react';

export const UserContext = createContext<User | undefined>(undefined);

export function useCurrentUser() {
    const { data: session } = useSession();
    return session?.user;
}