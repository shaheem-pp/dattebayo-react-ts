import React from "react";

interface CharacterCardProps {
    character: any;
    onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({character, onClick}) => {
    return (
        <div className="col">
            <div
                className="card h-100"
                onClick={onClick}
                style={{cursor: "pointer"}}
                role="button"
            >
                <div className="card-image position-relative overflow-hidden" style={{paddingTop: "100%"}}>
                    <img
                        src={character.images?.[0] || "https://placehold.co/400x600?text=No+Image"}
                        alt={character.name}
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/400x600?text=Image+Error";
                        }}
                    />
                    <div className="badge-overlay position-absolute top-0 end-0 m-2">
                        <span className="badge bg-danger">{character.personalDetails.clan}</span>
                    </div>
                </div>
                <div className="card-body text-center">
                    <h5 className="card-title text-nowrap m-0 p-0 fw-bold">{character.name}</h5>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;