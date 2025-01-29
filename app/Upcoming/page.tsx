/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { getUpcoming } from "../utilities/utils";
import { NEXT_PUBLIC_IMAGE_BASE_URL } from "../config";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function UpcomingList() {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const upcomingData = await getUpcoming();
        setUpcomingMovies(upcomingData.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl text-center font-semibold mb-4 text-white">
        Upcoming Movies
      </h2>
      <div className="grid grid-cols-5 gap-4">
        {upcomingMovies.map((movie) => (
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
