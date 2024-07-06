/* eslint-disable */
import { Prisma, PrismaClient } from '@prisma/client';
import {
    type MutationOptions,
    useHooksContext,
} from '@zenstackhq/swr/runtime';
import metadata from './__model_meta';
import * as request from '@zenstackhq/swr/runtime';

const prisma = new PrismaClient();

/** @deprecated Use mutation hooks (useCreateXXX, useUpdateXXX, etc.) instead. */
export function useMutateUser() {
    const { endpoint, fetch } = useHooksContext();
    const invalidate = request.useInvalidation('User', metadata);

    /** @deprecated Use `useCreateUser` hook instead. */
    async function createUser<T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>) {
        return await request.mutationRequest<Prisma.UserGetPayload<Prisma.UserCreateArgs> | undefined, true>(
            'POST',
            `${endpoint}/user/create`,
            args,
            invalidate,
            fetch,
            true,
        );
    }

    /** @deprecated Use `useUpdateUser` hook instead. */
    async function updateUser<T extends Prisma.UserUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>) {
        return await request.mutationRequest<Prisma.UserGetPayload<Prisma.UserUpdateArgs> | undefined, true>(
            'PUT',
            `${endpoint}/user/update`,
            args,
            invalidate,
            fetch,
            true,
        );
    }

    /** @deprecated Use `useDeleteUser` hook instead. */
    async function deleteUser<T extends Prisma.UserDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>) {
        return await request.mutationRequest<Prisma.UserGetPayload<Prisma.UserDeleteArgs> | undefined, true>(
            'DELETE',
            `${endpoint}/user/delete`,
            args,
            invalidate,
            fetch,
            true,
        );
    }

    return { createUser, updateUser, deleteUser };
}

export function useCreateUser(
    options?: MutationOptions<Prisma.UserGetPayload<Prisma.UserCreateArgs> | undefined, unknown, Prisma.UserCreateArgs>,
) {
    const mutation = request.useModelMutation('User', 'POST', 'create', metadata, options, true);
    return {
        ...mutation,
        trigger: <T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.UserGetPayload<T> | undefined>;
        },
    };
}

export function useUpdateUser(
    options?: MutationOptions<Prisma.UserGetPayload<Prisma.UserUpdateArgs> | undefined, unknown, Prisma.UserUpdateArgs>,
) {
    const mutation = request.useModelMutation('User', 'PUT', 'update', metadata, options, true);
    return {
        ...mutation,
        trigger: <T extends Prisma.UserUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>) => {
            return mutation.trigger(args, options as any) as Promise<Prisma.UserGetPayload<T> | undefined>;
        },
    };
}

