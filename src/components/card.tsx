import Link from 'next/link';

export type Character = {
    uid: string;
    name: string;
    url: string;
}

type CardProps = {
    character?: Character;
    letter?: string;
    name?: string;
    id?: string;
    highlight?: boolean;
};

export default function Card({ character, letter, name, id, highlight = false }: CardProps) {
    // If character object is provided, use its properties
    const displayName = character ? character.name : name || '';
    // Get the first letter of the name for the big letter display
    const displayLetter = letter || (displayName.charAt(0).toUpperCase());
    // Get the ID for linking
    const linkId = id || (character?.uid || '');
    
    const cardContent = (
        <div className={`card flex flex-col items-center justify-center p-6 aspect-square ${highlight ? 'bg-[#ffcd38]' : 'bg-[#fffcdf]'}`}>
            <h2 className="text-8xl font-bold">{displayLetter}</h2>
            <p className="text-sm text-center mt-2">{displayName}</p>
        </div>
    );

    // If we have an ID, wrap the card in a Link
    if (linkId) {
        return (
            <Link href={`/character/${linkId}`}>
                {cardContent}
            </Link>
        );
    }

    // Otherwise, just return the card
    return cardContent;
}