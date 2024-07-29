import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

// GET SINGLE POST
interface IParams {
    slug: string
}
export const GET = async (req: NextRequest, { params }: { params: IParams }) => {

    const slug = params.slug;

    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: { user: true }
        })

        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
    }
}