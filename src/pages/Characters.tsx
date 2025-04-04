import axios from "axios";
import { useEffect, useState } from "react";

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
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
        null
    );

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://dattebayo-api.onrender.com/characters?page=${page}&limit=10`,
                    {
                        signal: abortController.signal,
                    }
                );

                if (!response.data || typeof response.data !== "object") {
                    throw new Error("Invalid API response structure");
                }

                const {
                    characters: rawCharacters,
                    currentPage,
                    pageSize,
                    total,
                } = response.data;

                if (!Array.isArray(rawCharacters)) {
                    throw new Error("Invalid characters data format");
                }

                const processedCharacters = rawCharacters.map((char: any) => ({
                    id: char.id,
                    name: char.name,
                    images: char.images || [],
                    debut: {
                        manga: char.debut?.manga || "N/A",
                        anime: char.debut?.anime || "N/A",
                    },
                    family: {
                        father: char.family?.father || "N/A",
                        mother: char.family?.mother || "N/A",
                    },
                    jutsu: char.jutsu || [],
                    natureType: char.natureType || [],
                    personalDetails: {
                        birthdate: char.personal?.birthdate || "N/A",
                        gender: char.personal?.sex || "N/A",
                        titles: char.personal?.titles || [],
                        clan: char.personal?.clan || "Unknown Clan",
                        status: char.personal?.status || "N/A",
                    },
                    voiceActors: {
                        japanese: char.voiceActors?.japanese || [],
                        english: char.voiceActors?.english || [],
                    },
                }));

                setData({
                    pageNumber: currentPage,
                    characters: processedCharacters,
                    pageSize,
                    total,
                });
            } catch (error) {
                if (!axios.isCancel(error)) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : "Failed to fetch characters";
                    setError(message);
                    setData(null);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => abortController.abort();
    }, [page]);

    const handleCardClick = (character: Character) => {
        setSelectedCharacter(character);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedCharacter(null);
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setPage(1);
                        setError(null);
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!data || data.characters.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <p className="lead">No characters found</p>
            </div>
        );
    }

    const totalPages = Math.ceil(data.total / data.pageSize);

    return (
        <div className="min-vh-100">
            <div className="container py-5">
                <h1
                    className="text-center mb-5 display-1"
                    style={{
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        fontFamily: '"Knewave", sans-serif',
                        color: "#FFAC33",
                    }}
                >
                    CHARACTERS
                </h1>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {data.characters.map((character) => (
                        <div className="col" key={character.id}>
                            <div
                                className="card h-100"
                                onClick={() => handleCardClick(character)}
                                style={{ cursor: "pointer" }}
                                role="button"
                            >
                                <div
                                    className="card-image position-relative overflow-hidden"
                                    style={{ paddingTop: "100%" }}
                                >
                                    <img
                                        src={
                                            character.images?.[0] ||
                                            "https://placehold.co/400x600?text=No+Image"
                                        }
                                        alt={character.name}
                                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                "https://placehold.co/400x600?text=Image+Error";
                                        }}
                                    />
                                    <div className="badge-overlay position-absolute top-0 end-0 m-2">
                    <span className="badge bg-danger">
                      {character.personalDetails.clan}
                    </span>
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title text-nowrap m-0 p-0 fw-bold">
                                        {character.name}
                                    </h5>
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
                            <li className={`page-item ${page === 1 && "disabled"}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setPage((p) => p - 1)}
                                >
                                    <i className="bi bi-chevron-left"></i>Previous
                                </button>
                            </li>

                            {/* First Page */}
                            {page > 3 && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => setPage(1)}>
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
                                if (pageNum > 0 && pageNum <= totalPages) {
                                    return (
                                        <li
                                            key={pageNum}
                                            className={`page-item ${page === pageNum && "active"}`}
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
                            {page < totalPages - 3 && (
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            )}

                            {/* Last Page */}
                            {page < totalPages - 2 && (
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(totalPages)}
                                    >
                                        {totalPages}
                                    </button>
                                </li>
                            )}

                            {/* Next Button */}
                            <li className={`page-item ${page === totalPages && "disabled"}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setPage((p) => p + 1)}
                                >
                                    <i className="bi bi-chevron-right"></i>Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {modalVisible && selectedCharacter && (
                    <div
                        className="modal show d-block bg-dark bg-opacity-75"
                        style={{ zIndex: 1050 }}
                    >
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content w-100 mx-auto">
                                <div className="modal-header">
                                    <h2 className="modal-title">{selectedCharacter.name}</h2>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleModalClose}
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <div className="w-100">
                                        <div className="d-flex overflow-y-scroll mb-3 gap-2">
                                            {selectedCharacter.images?.length === 1 ? (
                                                <img
                                                    src={selectedCharacter.images[0]}
                                                    alt={`${selectedCharacter.name} - Image`}
                                                    className="img-fluid"
                                                    style={{
                                                        width: "100%", // Full width for a single image
                                                        height: "auto",
                                                        objectFit: "contain",
                                                    }}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src =
                                                            "https://placehold.co/400x600?text=Image+Error";
                                                    }}
                                                />
                                            ) : (
                                                selectedCharacter.images?.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`${selectedCharacter.name} - Image ${
                                                            index + 1
                                                        }`}
                                                        className="img-thumbnail"
                                                        style={{
                                                            width: "25rem",
                                                            height: "25rem",
                                                            objectFit: "contain",
                                                        }}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src =
                                                                "https://placehold.co/200x300?text=Image+Error";
                                                        }}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row g-3">
                                        <div className="row">
                                            {selectedCharacter.debut.manga !== "N/A" ||
                                            selectedCharacter.debut.anime !== "N/A" ||
                                            selectedCharacter.personalDetails.clan !== "N/A" ||
                                            selectedCharacter.personalDetails.status !== "N/A" ? (
                                                <div className="col-md-6">
                                                    <h5>Biography</h5>
                                                    {selectedCharacter.debut.manga !== "N/A" && (
                                                        <p className="p-0 m-0">
                                                            <strong>Debut Manga:</strong>{" "}
                                                            {selectedCharacter.debut.manga}
                                                        </p>
                                                    )}
                                                    {selectedCharacter.debut.anime !== "N/A" && (
                                                        <p className="p-0 m-0">
                                                            <strong>Debut Anime:</strong>{" "}
                                                            {selectedCharacter.debut.anime}
                                                        </p>
                                                    )}
                                                    {selectedCharacter.personalDetails.clan !== "N/A" && (
                                                        <p className="p-0 m-0">
                                                            <strong>Clan:</strong>{" "}
                                                            {selectedCharacter.personalDetails.clan}
                                                        </p>
                                                    )}
                                                    {selectedCharacter.personalDetails.status !==
                                                        "N/A" && (
                                                            <p className="p-0 m-0">
                                                                <strong>Status:</strong>{" "}
                                                                {selectedCharacter.personalDetails.status}
                                                            </p>
                                                        )}
                                                </div>
                                            ) : null}

                                            {selectedCharacter.family.father !== "N/A" ||
                                            selectedCharacter.family.mother !== "N/A" ? (
                                                <div className="col-md-6">
                                                    <h5>Family</h5>
                                                    {selectedCharacter.family.father !== "N/A" && (
                                                        <p className="p-0 m-0">
                                                            <strong>Father:</strong>{" "}
                                                            {selectedCharacter.family.father}
                                                        </p>
                                                    )}
                                                    {selectedCharacter.family.mother !== "N/A" && (
                                                        <p className="p-0 m-0">
                                                            <strong>Mother:</strong>{" "}
                                                            {selectedCharacter.family.mother}
                                                        </p>
                                                    )}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-12">
                                            {selectedCharacter.voiceActors && (
                                                <div>
                                                    <h5>Voice Actor</h5>
                                                    <ul>
                                                        {Array.isArray(
                                                                selectedCharacter.voiceActors.japanese
                                                            ) &&
                                                            selectedCharacter.voiceActors.japanese.length >
                                                            0 && (
                                                                <li>
                                                                    <strong>Japanese:</strong>
                                                                    <ul>
                                                                        {selectedCharacter.voiceActors.japanese.map(
                                                                            (actor, index) => (
                                                                                <li key={index}>{actor}</li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </li>
                                                            )}
                                                        {Array.isArray(
                                                                selectedCharacter.voiceActors.english
                                                            ) &&
                                                            selectedCharacter.voiceActors.english.length >
                                                            0 && (
                                                                <li>
                                                                    <strong>English:</strong>
                                                                    <ul>
                                                                        {selectedCharacter.voiceActors.english.map(
                                                                            (actor, index) => (
                                                                                <li key={index}>{actor}</li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </li>
                                                            )}
                                                    </ul>
                                                </div>
                                            )}
                                            <h5>Abilities</h5>
                                            <ul>
                                                {/* Jutsu Section */}
                                                {selectedCharacter.jutsu &&
                                                    selectedCharacter.jutsu.length > 0 &&
                                                    !selectedCharacter.jutsu.includes("N/A") && (
                                                        <li>
                                                            <p className="fw-bold">Jutsu</p>
                                                            <ul>
                                                                {selectedCharacter.jutsu
                                                                    .slice(0, 3)
                                                                    .map((jutsu, index) => (
                                                                        <li key={index}>{jutsu}</li>
                                                                    ))}
                                                                {selectedCharacter.jutsu.length > 3 && (
                                                                    <li>and more...</li>
                                                                )}
                                                            </ul>
                                                        </li>
                                                    )}

                                                {/* Nature Types Section */}
                                                {selectedCharacter.natureType &&
                                                    selectedCharacter.natureType.length > 0 &&
                                                    !selectedCharacter.natureType.includes("N/A") && (
                                                        <li>
                                                            <p className="fw-bold">Nature Types</p>
                                                            <ul>
                                                                {selectedCharacter.natureType
                                                                    .slice(0, 3)
                                                                    .map((type, index) => (
                                                                        <li key={index}>{type}</li>
                                                                    ))}
                                                                {selectedCharacter.natureType.length > 3 && (
                                                                    <li>and more...</li>
                                                                )}
                                                            </ul>
                                                        </li>
                                                    )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleModalClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Characters;
