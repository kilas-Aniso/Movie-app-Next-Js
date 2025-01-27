

'use client';

import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import GenreList from "./Get-genres/page";
import MovieCarousel from "./Slider/page";
import TopRatedList from "./Toprated/page";



export default function Home() {


  return (
    <main className="bg-gray-900">
      <Navbar/>
      <MovieCarousel/>
      <TopRatedList/>

      <GenreList/>
      <Footer/>

    </main>
  );
}

