import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
const CardComponent = ({ movie }: { movie: any }) => {
  return (
    <>
    <Link href={`/content/${movie.imdbID}`}>
      <Card className=" w-fit max-h-xs bg-transparent border-0">
        <CardContent className="p-0 w-60">
          <img className=" h-96 w-full rounded-md" src={movie.Poster} alt="" />
          <div className="max-h-auto ">
            <h3 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              {movie.Title}
            </h3>
            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <h5 className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                {movie.Runtime} | {movie.Genre}
              </h5>
              
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
    </>
  );
};

export default CardComponent;
