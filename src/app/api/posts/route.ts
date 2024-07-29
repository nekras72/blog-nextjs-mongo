import { POSTS_PER_PAGE } from "@/constants";
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url)

    const page = searchParams.get('page');
    const cat = searchParams.get('cat');
    const pageNumber = page !== null ? parseInt(page) : 1;

    const query = {
        take: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * (pageNumber - 1),
        where: {
            ...(cat && { catSlug: cat })
        }
    }

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where: query.where })
        ]);
        return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
    }
}

// CREATE A POST

export const POST = async (req: NextRequest) => {

    const session = await getAuthSession();
    if (!session?.user?.email) {
        return new NextResponse(JSON.stringify({ message: 'Not Authenticated' }), { status: 401 });
    }

    try {
        const body = await req.json();
        const post = await prisma.post.create({
            data: { ...body, userEmail: session.user.email }
        })
        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        console.log({ err });
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
    }
};