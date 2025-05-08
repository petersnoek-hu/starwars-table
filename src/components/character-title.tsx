import React from 'react';

interface CharacterTitleProps {
  name: string;
}

export default function CharacterTitle({ name }: CharacterTitleProps) {
  return (
    <div className="my-8">
      <h2 className="text-7xl md:text-8xl font-bold">{name}</h2>
    </div>
  );
}