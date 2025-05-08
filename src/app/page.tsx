"use client";
import Card from "@/components/card";
import { useApiCharacter } from "@/hooks/useApiCharacter";
import { useState } from "react";

export default function Home() {
  const { character, isLoading, isError } = useApiCharacter();
  const [filterFilm, setFilterFilm] = useState("xx");
  const [filterPlanet, setFilterPlanet] = useState("xx");
  const [filterSpecies, setFilterSpecies] = useState("xx");
  const [sortOrder, setSortOrder] = useState("Name");

  return (
    <div className="flex flex-col p-8 pb-20 gap-8 sm:p-20">
      <h1 className="font-bold text-6xl sm:text-8xl">
        Star Wars<br />Universe.
      </h1>
      
      <div className="my-4">
        <p className="mb-4">What are you looking for?</p>
        
        <div className="flex flex-wrap items-center gap-6">
          <div className="filter-group">
            <label className="mr-2">Film</label>
            <button className="px-2">{filterFilm}</button>
          </div>
          
          <div className="filter-group">
            <label className="mr-2">Planet</label>
            <button className="px-2">{filterPlanet}</button>
          </div>
          
          <div className="filter-group">
            <label className="mr-2">Species</label>
            <button className="px-2">{filterSpecies}</button>
          </div>
          
          <div className="filter-group ml-auto">
            <label className="mr-2">Sort</label>
            <button className="px-2">{sortOrder}</button>
          </div>
        </div>
      </div>

      <main className="mt-4">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong...</p>}
        {character && (
          <div className="grid grid-cols-3 gap-2">
            {/* First row */}
            <Card 
              letter="L" 
              name="Luke Skywalker" 
              id="1"
            />
            <Card 
              letter="C" 
              name="C3-PO" 
              id="2"
            />
            <Card 
              letter="R" 
              name="R2-D2" 
              id="3"
            />
            
            {/* Second row */}
            <Card 
              letter="D" 
              name="Darth Vader" 
              id="4"
            />
            <Card 
              letter="L" 
              name="Leia Organa" 
              id="5"
            />
            <Card 
              letter="O" 
              name="Owen Lars" 
              id="6"
            />
            
            {/* Third row */}
            <Card 
              letter="B" 
              name="Beru Whitesun Lars" 
              id="7"
            />
            <Card 
              letter="R" 
              name="R5-D4" 
              id="8"
            />
            <Card 
              letter="B" 
              name="Biggs Darklighter" 
              id="9"
            />
          </div>
        )}
      </main>
    </div>
  );
}
