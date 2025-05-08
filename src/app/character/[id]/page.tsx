'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Character {
  name: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  homeworldName?: string;
  films: string[];
}

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true);
        // Fetch character data
        const characterResponse = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!characterResponse.ok) {
          throw new Error('Failed to fetch character data');
        }
        const characterData = await characterResponse.json();
        
        // Fetch homeworld data
        const homeworldResponse = await fetch(characterData.homeworld);
        if (!homeworldResponse.ok) {
          throw new Error('Failed to fetch homeworld data');
        }
        const homeworldData = await homeworldResponse.json();
        
        setCharacter({
          ...characterData,
          homeworldName: homeworldData.name
        });
      } catch (err) {
        setError('Failed to load character data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading character data...</p>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">{error || 'Character not found'}</p>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  // Get first letter of character name for display
  const firstLetter = character.name.charAt(0);
  
  // Get film numbers the character appears in
  const filmNumbers = character.films.map(filmUrl => {
    const match = filmUrl.match(/\/(\d+)\/$/);
    return match ? match[1] : '';
  }).join(', ');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-4">
        <Link href="/" className="text-blue-500 hover:underline mb-6 block">
          &larr; Back to characters
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-300 rounded-lg overflow-hidden">
          {/* Left column with character name */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">Star Wars Universe.</h1>
            </div>
            
            <div className="my-8">
              <h2 className="text-7xl md:text-8xl font-bold">{character.name}</h2>
            </div>
            
            <div>
              <p className="text-lg">Film {filmNumbers}</p>
            </div>
          </div>
          
          {/* Right column with character details */}
          <div className="p-8 bg-yellow-300 flex flex-col justify-center space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <p className="font-bold">Birth year</p>
              <p>{character.birth_year}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="font-bold">Gender</p>
              <p>{character.gender}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="font-bold">Hair</p>
              <p>{character.hair_color}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="font-bold">Eyes</p>
              <p>{character.eye_color}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="font-bold">Mass</p>
              <p>{character.mass}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="font-bold">Skin</p>
              <p>{character.skin_color}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="font-bold">Home planet</p>
              <p>{character.homeworldName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}