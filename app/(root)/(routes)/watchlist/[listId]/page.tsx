import React, { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { prisma } from "@/prisma/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardComponent from "@/components/CardComponent";
import Share from "./component/Share";
const WatchListPage = async ({
  params,
}: {
  params: {
    listId: string;
  };
}) => {
  const list = await prisma.watchList.findUnique({
    where: {
      id: params.listId,
    },
  });
  const user = await currentUser();
  if (list?.status === "private" && list?.userId !== user?.id) {
    return <div className="p-20 text-2xl">Private List</div>;
  }
  

  return (
    <div className="p-20">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">{list?.name}</h1>
        <Share/>
      </div>
      <Separator className="bg-primary/10 mb-10" />
      {list?.movies.length ? (
        <div className="grid grid-cols-4 gap-y-10">
          {list?.movies?.map((movie: any, index: number) => (
            <CardComponent movie={movie} />
          ))}
        </div>
      ) : (
        <div>No movies in this list</div>
      )}
    </div>
  );
};

export default WatchListPage;
