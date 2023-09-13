

'use client';

import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import GenreList from "./Get-genres/page";
import { Carousel } from "./Slider/page";


export default function Home() {


  return (
    <main>
      <Navbar/>
      <Carousel/>

      <GenreList/>
      <Footer/>

    </main>
  );
}

