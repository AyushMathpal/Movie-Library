"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PlayIcon,
  CameraIcon,
  StarIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  Plus,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateWatchlist from "./addToList";
import { WatchList } from "@prisma/client";
const MovieDetails = ({id,list}:{
    id:string,
    list:WatchList[]
}) => {
    const router = useRouter();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=5a91e79`
        );
        setMovie(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);
  
  return (
    <>
    {movie && (
        <div className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
                <div className="flex items-center mb-4">
                  <StarIcon className="w-6 h-6 text-yellow-400 mr-2" />
                  <span>IMDb: {movie.imdbRating}</span>
                </div>
                <p className="text-lg mb-4">{movie.Plot}</p>
                <div className="mb-4">
                  <span className="font-bold">Director: </span>
                  <span>{movie.Director}</span>
                </div>
                <div className="mb-4">
                  <span className="font-bold">Writer: </span>
                  <span>{movie.Writer}</span>
                </div>
                <div className="mb-4">
                  <span className="font-bold">Stars: </span>
                  <span>{movie.Actors}</span>
                </div>
                <div className="flex items-center mb-4">
                  <CameraIcon className="w-6 h-6 mr-2" />
                  <span>{movie.Genre}</span>
                </div>

               <CreateWatchlist list={list} movie={movie}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieDetails