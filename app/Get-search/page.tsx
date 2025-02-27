/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSearchResults } from "../utilities/utils";
import { NEXT_PUBLIC_IMAGE_BASE_URL } from "../config";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return; // Don't fetch if query is empty

      try {
        const searchData = await getSearchResults(searchQuery);
        setSearchResults(searchData.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="p-4">
      <h2 className="text-3xl text-center font-semibold mb-4 text-white">
      </h2>
      <div className="grid grid-cols-5 gap-4">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div>
                <img
                  src={`${NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-white">No results found.</p>
        )}
      </div>
    </div>
  );
}
