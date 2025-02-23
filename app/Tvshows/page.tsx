/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { getTvshows } from "../utilities/utils";
import { NEXT_PUBLIC_IMAGE_BASE_URL } from "../config";
import Link from "next/link";

interface TvShow {
  id: number;
  name: string;
  poster_path: string;
}

export default function TvShowsList() {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const tvShowsData = await getTvshows();
        setTvShows(tvShowsData.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchTvShows();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl text-center font-semibold mb-4 text-white">
        TV Shows
      </h2>
      <div className="grid grid-cols-5 gap-4">
        {tvShows.map((show) => (
          <Link href={`/tvshow/${show.id}`} key={show.id}>
            <div>
              <img
                src={`${NEXT_PUBLIC_IMAGE_BASE_URL}${show.poster_path}`}
                alt={show.name}
                className="w-full h-auto"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
