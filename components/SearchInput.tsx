"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import qs from "query-string";
import { useDebouce } from "@/hooks/useDebounce";
import { Command, CommandInput, CommandItem, CommandList } from "./ui/command";
import axios from "axios";
import { Separator } from "./ui/separator";
import Image from "next/image";
const SearchInput = () => {
  const router = useRouter();
  const seachParams = useSearchParams();
  const movieId = seachParams.get("movieId");
  const name = seachParams.get("name");
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const debouncedValue = useDebouce<string>(value, 500);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?s=${debouncedValue}&apikey=5a91e79`
        );
        if (response.data.Response === "False") {
          setResults([]);
          return;
        }
        setResults(response.data?.Search);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    };

    if (debouncedValue) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [debouncedValue]);
  useEffect(() => {
    const query = {
      name: debouncedValue,
      movieId: movieId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router, movieId]);

  return (
    <div className="relative w-full">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="pl-10"
        onChange={onChange}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 200);
        }}
      />
      {isFocused && results.length > 0 && (
        <div className="absolute w-full max-h-72 overflow-y-auto shadow-md z-10 p-2 rounded-b-lg mt-1 bg-secondary">
        {results.map((result: any, index: number) => (<>
          <div key={index} onClick={() =>router.push(`/content/${result.imdbID}`) } className="flex items-center p-2 cursor-pointer hover:bg-primary/10">
            <Image src={result.Poster} alt={result.Title} className="w-12 h-15 mr-2 object-cover" />
            <div>
              <div className="font-bold">{result.Title}</div>
              <div>{result.Type} | {result.Year}</div>
            </div>
          </div>
          <Separator className="bg-primary/10 " />
          </>
        ))}
      </div>
      )}
    </div>
  );
};

export default SearchInput;
