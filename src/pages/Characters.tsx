import CharacterGrid from "../components/characters/CharacterGrid";
import CharacterModal from "../components/characters/CharacterModal";
import Pagination from "../components/characters/Pagination";
import {Character} from "../types/character";
import LoadingSpinner from "../components/common/LoadingSpinner.tsx";
import ErrorMessage from "../components/common/ErrorMessage.tsx";
import EmptyMessage from "../components/common/EmptyMessage.tsx";
import {useCharacters} from "../components/hooks/useCharacters.ts";
import {useState} from "react";

function Characters() {
    const [page, setPage] = useState(1);
    const {data, loading, error} = useCharacters(page);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const handleCardClick = (character: Character) => {
        setSelectedCharacter(character);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedCharacter(null);
    };

    if (loading) return <LoadingSpinner/>;
    if (error) return <ErrorMessage error={error} onRetry={() => setPage(1)}/>;
    if (!data || data.characters.length === 0) return <EmptyMessage/>;

    const totalPages = Math.ceil(data.total / data.pageSize);

    return (
        <div className="min-vh-100">
            <div className="container py-5">
                <h1 className="text-center mb-5 display-1">NARUTOPEDIA</h1>
                <CharacterGrid data={data} onCardClick={handleCardClick}/>
                <Pagination page={page} totalPages={totalPages} setPage={setPage}/>
                {modalVisible && selectedCharacter && (
                    <CharacterModal character={selectedCharacter} onClose={handleModalClose}/>
                )}
            </div>
        </div>
    );
}

export default Characters;