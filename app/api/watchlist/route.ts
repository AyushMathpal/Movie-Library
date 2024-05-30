import { prisma } from "@/prisma/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const user = await currentUser();
  const { name,privacy } = body;
  console.log(user,name);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }
  if (!name) {
    return NextResponse.json({ message: "Name is required", status: 400 });
  }
  try {
    const watchlist = await prisma.watchList.create({
      data: {
        name,
        userId: user.id,
        status: privacy,
      },
    });
    return NextResponse.json(watchlist);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
