import React from "react";
import {Modal} from "react-bootstrap";

interface CharacterModalProps {
    character: any;
    onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({character, onClose}) => {
    const {
        name,
        images,
        personalDetails,
        rank,
        natureType,
        debut,
        voiceActors,
        team,
    } = character;

    return (
        <Modal show={true} onHide={onClose} centered size="lg">
            <Modal.Header closeButton className="">
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img
                            src={images?.[0] || "https://placehold.co/400x600?text=No+Image"}
                            alt={name}
                            className="img-fluid rounded"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/400x600?text=Image+Error";
                            }}
                        />
                    </div>
                    <div className="col-md-8">
                        <ul className="list-group list-group-flush">
                            {personalDetails?.clan && (
                                <li className="list-group-item">
                                    <strong>Clan:</strong> {personalDetails.clan}
                                </li>
                            )}
                            {rank && (
                                <li className="list-group-item">
                                    <strong>Rank:</strong>{" "}
                                    {typeof rank === "object" ? (
                                        <>
                                            {rank.ninjaRank ? `Ninja Rank: ${rank.ninjaRank}` : ""}
                                            {rank.academyGradYear && <>, Grad Year: {rank.academyGradYear}</>}
                                        </>
                                    ) : (
                                        rank
                                    )}
                                </li>
                            )}
                            {natureType && (
                                <li className="list-group-item">
                                    <strong>Nature Type:</strong>{" "}
                                    {Array.isArray(natureType) ? natureType.join(", ") : natureType}
                                </li>
                            )}
                            {debut && (
                                <li className="list-group-item">
                                    <strong>Debut:</strong>{" "}
                                    {typeof debut === "object"
                                        ? Object.entries(debut)
                                            .map(([key, value]) => `${key}: ${value}`)
                                            .join(", ")
                                        : debut}
                                </li>
                            )}
                            {voiceActors && (
                                <li className="list-group-item">
                                    <strong>Voice Actors:</strong>{" "}
                                    {typeof voiceActors === "object"
                                        ? Object.entries(voiceActors)
                                            .map(([lang, actor]) => `${lang}: ${actor}`)
                                            .join(", ")
                                        : voiceActors}
                                </li>
                            )}
                            {team && (
                                <li className="list-group-item">
                                    <strong>Team:</strong> {team}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CharacterModal;