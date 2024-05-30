import React, { useRef } from "react";
import { Separator } from "./ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import {recommendations} from '@/lib/omdb'
import Autoplay from "embla-carousel-autoplay"
import CardComponent from "./CardComponent";
const Recommendations = () => {
    const plugin =useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
      )
  return (

    <div className="">
      <div className="flex flex-col justify-between p-2">
        <div className="flex justify-between w-full pb-1">
          <p className="">Recommendations</p>
        </div>
        <Separator className="bg-primary/10 mb-2" />
        {recommendations.length ? (
          <Carousel className="w-full items-center"
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          >
            <CarouselContent className=" items-center ">
              {recommendations.map((movie: any, index: number) => (
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
    </div>
  );
};

export default Recommendations;
