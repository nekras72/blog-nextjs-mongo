import { ADMIN_ROLE } from "@/constants";
import { UpdateCat } from "@/types";
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    const session = await getAuthSession();
    if (!session?.user?.email) {
        return new NextResponse(JSON.stringify({ message: 'Not Authenticated' }), { status: 401 });
    }
    try {
        const { email } = session.user;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (user?.role !== ADMIN_ROLE) {
            return new NextResponse(JSON.stringify({ message: 'Not Authenticated, reason: role' }), { status: 403 });
        }
        const manage = { accessGranted: true };
        return new NextResponse(JSON.stringify({ manage }), { status: 200 });

    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong while getting user!' }), { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    const session = await getAuthSession();
    if (!session?.user?.email) {
        return new NextResponse(JSON.stringify({ message: 'Not Authenticated' }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const updateParam = searchParams.get('updateParam');
    const body = await req.json();

    switch (updateParam) {
        case 'category':
            const data: UpdateCat = {};
            if (body?.title) data.title = body.title;
            if (body?.slug) data.slug = body.slug;
            if (body?.img) data.img = body.img;
            if (body?.color) data.color = body.color;

            if (body?.slug || body?.oldSlug) {
                try {
                    const cat = await prisma.category.findUnique({
                        where: { slug: body?.oldSlug ?? body?.slug }
                    });
                    if (!cat) {
                        return new NextResponse(JSON.stringify({ message: 'No such category!' }), { status: 500 });
                    }
                    await prisma.category.update({
                        where: {
                            slug: cat.slug
                        },
                        data: { ...data }

                    });
                    return new NextResponse(JSON.stringify(cat), { status: 200 });
                } catch (err) {
                    console.log(err);
                    return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
                }
            } return new NextResponse(JSON.stringify({ message: 'Provide category slug' }), { status: 500 });
            break;

        default:
            break;
    }

}

export const DELETE = async (req: NextRequest) => {
    const session = await getAuthSession();
    if (!session?.user?.email) {
        return new NextResponse(JSON.stringify({ message: 'Not Authenticated' }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const deleteCatSlug = searchParams.get('deleteCatSlug');

    if (deleteCatSlug) {
        try {
            const cat = await prisma.category.findUnique({
                where: { slug: deleteCatSlug }
            });
            if (!cat) {
                return new NextResponse(JSON.stringify({ message: 'No such category!' }), { status: 500 });
            }
            await prisma.category.delete({
                where: {
                    slug: cat.slug
                }
            });
            return new NextResponse(JSON.stringify(cat), { status: 200 });
        } catch (err) {
            console.log(err);
            return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
        }
    } return new NextResponse(JSON.stringify({ message: 'Provide category slug' }), { status: 500 });
}