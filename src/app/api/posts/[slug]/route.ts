import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

// GET SINGLE POST
interface IParams {
    slug: string
}
export const GET = async (req: NextRequest, { params }: { params: IParams }) => {

    const slug = params.slug;

    try {
        const post = await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
            include: { user: true }
        })

        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: IParams }) => {

    const session = await getAuthSession();
    const { slug } = params;

    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: { user: true }
        })

        const isPostCreater = post?.userEmail === session?.user?.email

        if (!session?.user?.email || !isPostCreater) {
            return new NextResponse(JSON.stringify({ message: 'Not Authenticated' }), { status: 401 });
        }

        await prisma.post.delete({
            where: { slug }
        });

        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
    }
}