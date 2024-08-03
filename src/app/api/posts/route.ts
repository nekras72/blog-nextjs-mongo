import { POSTS_PER_PAGE } from "@/constants";
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url)

    const page = searchParams.get('page');
    const cat = searchParams.get('cat');

    const popular = searchParams.get('popular');
    const popularValue = popular ? JSON.parse(popular) : false;

    const editorPick = searchParams.get('editorPick');
    const editorPickValue = editorPick ? JSON.parse(editorPick) : false;

    const featured = searchParams.get('featured');
    const featuredValue = featured ? JSON.parse(featured) : false;

    const switchKey = popularValue ? 'popular' : editorPickValue ? 'editorPick' : featuredValue ? 'featured' : '';

    const pageNumber = page !== null ? parseInt(page) : 1;

    try {
        switch (switchKey) {
            case 'popular':
                const popularPosts = await prisma.post.findMany({
                    take: 4,
                    orderBy: {
                        views: 'desc',
                    },
                    include: {
                        cat: true,
                        user: true
                    }
                });
                return new NextResponse(JSON.stringify({ popularPosts }), { status: 200 });
            case 'editorPick':
                const editorPickPosts = await prisma.post.findMany({
                    where: {
                        editorPick: true
                    },
                    take: 4,
                    orderBy: {
                        views: 'desc',
                    },
                    include: {
                        cat: true,
                        user: true
                    }
                });
                return new NextResponse(JSON.stringify({ editorPickPosts }), { status: 200 });
            case 'featured':
                const featuredPosts = await prisma.post.findMany({
                    where: {
                        featured: true
                    },
                    orderBy: {
                        views: 'desc',
                    },
                    include: {
                        cat: true,
                        user: true
                    }
                });
                return new NextResponse(JSON.stringify({ featuredPosts }), { status: 200 });
            default:
                const query = {
                    take: POSTS_PER_PAGE,
                    skip: POSTS_PER_PAGE * (pageNumber - 1),
                    where: {
                        ...(cat && { catSlug: cat })
                    }
                }
                const [posts, count] = await prisma.$transaction([
                    prisma.post.findMany(query),
                    prisma.post.count({ where: query.where })
                ]);
                return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
        }
        // if (popularValue) {
        //     const popularPosts = await prisma.post.findMany({
        //         take: 4,
        //         orderBy: {
        //             views: 'desc',
        //         },
        //         include: {
        //             user: true
        //         }
        //     });
        //     return new NextResponse(JSON.stringify({ popularPosts }), { status: 200 });
        // } else if (editorPickValue) {
        //     const editorPickPosts = await prisma.post.findMany({
        //         where: {
        //             editorPick: true
        //         },
        //         take: 4,
        //         orderBy: {
        //             views: 'desc',
        //         },
        //         include: {
        //             user: true
        //         }
        //     });
        //     return new NextResponse(JSON.stringify({ editorPickPosts }), { status: 200 });
        // } else {
        //     const [posts, count] = await prisma.$transaction([
        //         prisma.post.findMany(query),
        //         prisma.post.count({ where: query.where })
        //     ]);
        //     return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
        // }

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