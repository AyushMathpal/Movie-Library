"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "lucide-react";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";
import { WatchList } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

import CreateList from "./CreateList";
const CreateWatchlist = ({
  list,
  movie,
}: {
  list: WatchList[];
  movie: any;
}) => {
  const router = useRouter();
  const [addToList, setAddToList] = useState(false);

  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    list.forEach((watchlist) => {
      watchlist.movies.find((m: any) => m.imdbID === movie.imdbID) &&
        setChecked([...checked, watchlist.id]);
    });
    // console.log(list, movie);
  }, [list]);
  const handleAddToList = async (id: string) => {
    setAddToList(true);
    const add = !checked.includes(id);
    console.log(add);
    try {
      await axios
        .patch(`/api/watchlist/${id}`, { add, movie })
        .then((response) => {
          // console.log(response);
          router.refresh();
        });
      setAddToList(false);
      add ? alert("Added to Watchlist") : alert("Removed from Watchlist");
    } catch (error: any) {
      setAddToList(false);
      setChecked([]);
      router.refresh();
      alert(error.response.data || "Something went wrong");
    }
  };
  return (
    <div>
      <div className="mt-8">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="wishlist" size="lg">
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Add to Watchlist
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="flex flex-col gap-4 h-full
text-primary bg-secondary"
          >
            <h4 className="font-medium leading-none">Add to WatchList</h4>
            <p className="text-sm text-muted-foreground">
              Choose the list you want to add to
            </p>
            <div className="ml-2">
              {list.map((list) => (
                <div key={list.id} className="flex items-center gap-2">
                  <Checkbox
                    disabled={addToList}
                    checked={checked.includes(list.id)}
                    onCheckedChange={() => {
                      if (checked.includes(list.id)) {
                        setChecked(checked.filter((id) => id !== list.id));
                      } else {
                        setChecked([...checked, list.id]);
                      }
                      handleAddToList(list.id);
                    }}
                  />
                  {list.name}
                </div>
              ))}
            </div>

            <CreateList />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CreateWatchlist;
