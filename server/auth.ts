import { authOptions } from '@/pages/api/auth/next-auth';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

// Get the authenticated session on the server-side
export const getServerAuthSession = async (ctx: {
    req: GetServerSidePropsContext['req'];
    res: GetServerSidePropsContext['res'];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};