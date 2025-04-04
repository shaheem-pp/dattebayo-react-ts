import React from "react";
import CharacterCard from "./CharacterCard";

interface CharacterGridProps {
    data: any;
    onCardClick: (character: any) => void;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ data, onCardClick }) => (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {data.characters.map((character: any) => (
            <CharacterCard
                key={character.id}
                character={character}
                onClick={() => onCardClick(character)}
            />
        ))}
    </div>
);

export default CharacterGrid;