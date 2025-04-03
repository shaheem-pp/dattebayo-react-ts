// import characterImage from "../../public/Characters.png";
import axios from "axios";
import {useEffect, useState} from "react";

interface Character {
    id: number;
    name: string;
    images?: string[];
    debut: {
        manga?: string;
        anime?: string;
    };
    family: {
        father?: string;
        mother?: string;
    };
    jutsu: string[];
    natureType: string[];
    personalDetails?: {
        birthdate?: string;
        gender?: string;
        titles?: string[];
        clan?: string;
        status?: string;
    };
    voiceActors?: {
        japanese?: string[];
        english?: string[];
    };
}

interface CharacterApiResponse {
    characters: Character[];
    pageNumber: number;
    pageSize: number;
    total: number;
}

function Characters() {
    const [data, setData] = useState<CharacterApiResponse | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const handleCardClick = (character: Character) => {
        setSelectedCharacter(character);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };
    useEffect(() => {
        setLoading(true);
        axios.get(`https://dattebayo-api.onrender.com/characters?page=${page}&limit=10`)
            .then(response => {
                setData({
                    pageNumber: response.data.currentPage,
                    characters: response.data.characters.map((char: any) => ({
                        id: char.id,
                        name: char.name,
                        images: char.images || [],
                        debut: {
                            manga: char.debut?.manga || "N/A",
                            anime: char.debut?.anime || "N/A"
                        },
                        family: {
                            father: char.family?.father || "N/A",
                            mother: char.family?.mother || "N/A"
                        },
                        jutsu: char.jutsu || [],
                        natureType: char.natureType || [],
                        personalDetails: {
                            birthdate: char.personal?.birthdate || "N/A",
                            gender: char.personal?.sex || "N/A",
                            titles: char.personal?.titles || [],
                            clan: char.personal?.clan || "Unknown Clan",
                            status: char.personal?.status || "N/A"
                        },
                        voiceActors: {
                            japanese: char.voiceActors?.japanese || [],
                            english: char.voiceActors?.english || []
                        }
                    })),
                    pageSize: response.data.pageSize,
                    total: response.data.total
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching characters:", error);
                setLoading(false);
            });
    }, [page]);

    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <>
            <div className="min-vh-100">
                <div className="container py-5">
                    <h1
                        className="text-center mb-5 display-1"
                        style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            fontFamily: '"Knewave", sans-serif', // Apply the imported font here
                            color: '#FFAC33'
                        }}
                    >
                        NARUTO CHARACTERS
                    </h1>

                    {/* Character Grid */}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {data?.characters.map((character) => (
                            <div className="col" key={character.id}>
                                <div
                                    className="card"
                                    onClick={() => handleCardClick(character)}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div
                                        className="card-image position-relative overflow-hidden"
                                        style={{paddingTop: '100%'}}>
                                        <img
                                            src={character.images?.[0] || 'https://placehold.co/400x600?text=No+Image'}
                                            alt={character.name}
                                            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                                            loading="lazy"
                                        />
                                        <div className="badge-overlay position-absolute top-0 end-0 m-2">
                                        <span className="badge bg-danger">
                                            {character.personalDetails?.clan || 'Unknown Clan'}
                                        </span>
                                        </div>
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title text-nowrap m-0 p-0 fw-bold">{character.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="container mt-5">
                        <nav aria-label="Character navigation">
                            <ul className="pagination justify-content-center">
                                {/* Previous Button */}
                                <li className={`page-item ${page === 1 && 'disabled'}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(p => p - 1)}
                                    >
                                        <i className="bi bi-chevron-left"></i>Previous
                                    </button>
                                </li>

                                {/* First Page */}
                                {page > 3 && (
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(1)}
                                        >
                                            1
                                        </button>
                                    </li>
                                )}

                                {/* Ellipsis for skipped pages before the current page */}
                                {page > 4 && (
                                    <li className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                )}

                                {/* Pages around the current page */}
                                {[...Array(5)].map((_, i) => {
                                    const pageNum = page - 2 + i;
                                    if (pageNum > 0 && pageNum <= Math.ceil(data.total / data.pageSize)) {
                                        return (
                                            <li
                                                key={pageNum}
                                                className={`page-item ${page === pageNum && 'active'}`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => setPage(pageNum)}
                                                >
                                                    {pageNum}
                                                </button>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}

                                {/* Ellipsis for skipped pages after the current page */}
                                {page < Math.ceil(data.total / data.pageSize) - 3 && (
                                    <li className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                )}

                                {/* Last Page */}
                                {page < Math.ceil(data.total / data.pageSize) - 2 && (
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(Math.ceil(data.total / data.pageSize))}
                                        >
                                            {Math.ceil(data.total / data.pageSize)}
                                        </button>
                                    </li>
                                )}

                                {/* Next Button */}
                                <li className={`page-item ${page === Math.ceil(data.total / data.pageSize) && 'disabled'}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(p => p + 1)}
                                    >
                                        <i className="bi bi-chevron-right"></i>Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Modal (Enhanced) */}
                    {modalVisible && selectedCharacter && (
                        <div
                            className="modal show d-block position-fixed top-0 left-0 w-100 h-100 bg-dark bg-opacity-75"
                            style={{zIndex: 1050}}
                            tabIndex={-1}
                            aria-labelledby="characterModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="characterModalLabel">
                                            {selectedCharacter.name}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={handleModalClose}
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <div className="d-flex overflow-auto mb-3">
                                            {selectedCharacter.images?.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`${selectedCharacter.name} - Image ${index + 1}`}
                                                    style={{
                                                        width: "200px",
                                                        height: "auto",
                                                        margin: "5px",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <p><strong>Debut Manga:</strong> {selectedCharacter.debut.manga}</p>
                                        <p><strong>Debut Anime:</strong> {selectedCharacter.debut.anime}</p>
                                        <p><strong>Father:</strong> {selectedCharacter.family.father}</p>
                                        <p><strong>Mother:</strong> {selectedCharacter.family.mother}</p>
                                        <p><strong>Jutsu:</strong> {selectedCharacter.jutsu.join(", ")}</p>
                                        <p><strong>Nature Type:</strong> {selectedCharacter.natureType.join(", ")}</p>
                                        <p><strong>Birthdate:</strong> {selectedCharacter.personalDetails?.birthdate}
                                        </p>
                                        <p><strong>Gender:</strong> {selectedCharacter.personalDetails?.gender}</p>
                                        <p><strong>Clan:</strong> {selectedCharacter.personalDetails?.clan}</p>
                                        <p><strong>Status:</strong> {selectedCharacter.personalDetails?.status}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Characters;