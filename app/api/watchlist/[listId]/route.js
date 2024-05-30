import { prisma } from "@/prisma/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { watch } from "fs";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { movie, add } = body;
    console.log(movie, add, typeof add);
    if (!params.listId) {
      return new NextResponse("List not found", { status: 400 });
    }

    // if (!user || !user.id) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    if (!movie) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    let watchlist = await prisma.watchList.findUnique({
      where: {
        id: params.listId,
      },
    });
    if (!watchlist) {
      return new NextResponse("Watchlist not found", { status: 404 });
    }
    if (add) {
      if (watchlist.movies.find((m) => m?.imdbID == movie?.imdbID))
        return new NextResponse("Movie already in watchlist", { status: 400 });
      watchlist.movies.push(movie);
    } else {
      watchlist.movies = watchlist.movies.filter(
        (m) => m.imdbID != movie.imdbID
      );
    }
    const updatedList = await prisma.watchList.update({
      where: {
        id: params.listId,
      },
      data: {
        movies: watchlist.movies,
      },
    });

    return NextResponse.json(updatedList, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
