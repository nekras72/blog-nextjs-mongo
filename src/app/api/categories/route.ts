import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {

        const categories = await prisma.category.findMany();
        return new NextResponse(JSON.stringify(categories), { status: 200 });

    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
    }
}
// CREATE NEW CATEGORY
export const POST = async (req: NextRequest) => {
    const session = await getAuthSession();
    if (!session?.user?.email) {
        return new NextResponse(JSON.stringify({ message: 'Not Authenticated' }), { status: 401 });
    }
    try {
        const body = await req.json();
        const cat = await prisma.category.create({
            data: { ...body }
        })
        return new NextResponse(JSON.stringify(cat), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
    }
};