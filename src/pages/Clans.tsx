import {useEffect, useState} from "react";
import {Button, Card, Col, Container, ListGroup, Row, Spinner} from "react-bootstrap";

interface Clan {
    id: number;
    name: string;
    characters: number[];
}

interface Character {
    id: number;
    name: string;
    images: string[];
}

function Clans() {
    const [clans, setClans] = useState<Clan[]>([]);
    const [characters, setCharacters] = useState<Record<number, Character>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchClans(currentPage);
    }, [currentPage]);

    const fetchClans = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`https://dattebayo-api.onrender.com/clans?page=${page}&limit=10`);
            if (!response.ok) throw new Error("Failed to fetch clans");
            const data = await response.json();
            setClans(data.clans);
            setTotalPages(Math.ceil(data.total / data.pageSize));

            // Fetch all character details
            const characterIds = [...new Set(data.clans.flatMap((clan: Clan) => clan.characters))];
            fetchCharacters(characterIds);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCharacters = async (characterIds: number[]) => {
        const characterData: Record<number, Character> = {};
        await Promise.all(
            characterIds.map(async (id) => {
                try {
                    const res = await fetch(`https://dattebayo-api.onrender.com/characters/${id}`);
                    if (res.ok) {
                        const charData = await res.json();
                        characterData[id] = {
                            id: charData.id,
                            name: charData.name,
                            images: charData.images
                        };
                    }
                } catch (err) {
                    console.error(`Failed to fetch character ${id}:`, err);
                }
            })
        );
        setCharacters(characterData);
    };

    return (
        <Container className="my-5">
            <h1 className="display-2 fw-bolder text-center">Clans</h1>
            {loading && <Spinner animation="border"/>}
            {error && <p className="text-danger">{error}</p>}
            <ListGroup>
                {clans.map((clan) => (
                    <ListGroup.Item key={clan.id}>
                        <h3>{clan.name}</h3>
                        <Row>
                            {clan.characters.map((charId) => {
                                const character = characters[charId];
                                return character ? (
                                    <Col key={charId} md={3} className="mb-3">
                                        <Card>
                                            <Card.Img
                                                variant="top"
                                                src={character.images[0] || "https://via.placeholder.com/150"}
                                                alt={character.name}
                                            />
                                            <Card.Body>
                                                <Card.Title>{character.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ) : null;
                            })}
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
                <Button
                    variant="primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </Button>
                <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
                <Button
                    variant="primary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </Container>
    );
}

export default Clans;
