"use client";
import { PrismaClient, WatchList } from "@prisma/client";
import React, { useRef } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardComponent from "@/components/CardComponent";
import Autoplay from "embla-carousel-autoplay";
import { Separator } from "./ui/separator";
import { Car, Forward } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import Link from "next/link";
import Recommendations from "./Recommendations";
const DisplayList = ({ list }: { list: WatchList[] }) => {
  return (
    <div className="p-20">
      <Recommendations/>
      {list?.map((item: WatchList) => (
        <>
          <div key={item.id} className="flex flex-col justify-between p-2">
            <div className="flex justify-between w-full pb-1">
              <p className="">{item.name}</p>
             <Link href={`/watchlist/${item.id}`}> <Button variant="outline" size="sm" className=" text-xs border-none">
                More
              </Button>
              </Link>
            </div>

            <Separator className="bg-primary/10 mb-2" />
            {item.movies.length ? (
              <Carousel className="w-full items-center"
              opts={{
                align: "start",
                loop: true,
              }}
               >
                <CarouselContent className=" items-center ">
                  {item?.movies?.map((movie: any, index: number) => (
                    <CarouselItem key={index} className="lg:basis-1/4">
                      <CardComponent movie={movie} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-primary" />
                <CarouselNext className="text-primary" />
              </Carousel>
            ) : (
              <div>No movies in this list</div>
            )}
            <div className="flex space-x-2"></div>
          </div>
        </>
      ))}
    </div>
  );
};

export default DisplayList;
