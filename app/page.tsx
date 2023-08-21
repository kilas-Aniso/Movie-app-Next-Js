'use client';
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_IMAGE_BASE_URL } from "./config";
import { getMovies } from "./utilities/utils";
import { it } from "node:test";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  genre_id: number[];
  overview: string;
}

type MovieData = {
  results: Movie[];
};

export default function Home() {
  const [movies, setMovies] = useState<MovieData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
        console.log({ movies: moviesData });
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    })();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-5 gap-4 bg-white">
        {movies &&
          movies.results.map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <div>
                <img
                  src={`${NEXT_PUBLIC_IMAGE_BASE_URL}${item.poster_path}`}
                  alt={item.title}
                />
                <div>
                  <p>{item.overview}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
