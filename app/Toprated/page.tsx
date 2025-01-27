/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { getTopRated } from "../utilities/utils";
import { NEXT_PUBLIC_IMAGE_BASE_URL } from "../config";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function TopRatedList() {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const topRatedData = await getTopRated();
        setTopRatedMovies(topRatedData.results);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl text-center font-semibold mb-4 text-white">
        Top Rated
      </h2>
      <div className="grid grid-cols-5 gap-4">
        {topRatedMovies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.title}>
            <div key={movie.id}>
              <img
                src={`${NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
