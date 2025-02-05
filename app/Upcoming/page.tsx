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
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const upcomingData = await getUpcoming();
        setUpcomingMovies(upcomingData.results || []); // Ensure we have an array
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  // Limit initial movies to the first 2 rows (assuming 5 movies per row)
  const visibleMovies = showAll ? upcomingMovies : upcomingMovies.slice(0, 10);

  return (
    <div className="p-4">
      <h2 className="text-3xl text-center font-semibold mb-4 text-white">
        Upcoming Movies
      </h2>
      
      {/* Movies Grid */}
      <div className="grid grid-cols-5 gap-4">
        {visibleMovies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div>
              <img
                src={`${NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Show "See More" only if there are more than 10 movies */}
      {!showAll && upcomingMovies.length > 10 && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-600 transition duration-300"
            onClick={() => setShowAll(true)}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}
