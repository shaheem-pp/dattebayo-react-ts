import {useEffect, useState} from "react";
import axios from "axios";
import {CharacterApiResponse} from "../../types/character.ts";
import {getCharacters} from "../../services/characterService.ts";

export const useCharacters = (page: number) => {
    const [data, setData] = useState<CharacterApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        setLoading(true);
        setError(null);

        getCharacters(page)
            .then((res) => {
                const characters = res.characters.map((char: any) => ({
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
                    pageNumber: res.currentPage,
                    characters,
                    pageSize: res.pageSize,
                    total: res.total,
                });
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    const message =
                        error instanceof Error ? error.message : "Failed to fetch characters";
                    setError(message);
                    setData(null);
                }
            })
            .finally(() => {
                if (!abortController.signal.aborted) setLoading(false);
            });

        return () => abortController.abort();
    }, [page]);

    return {data, loading, error};
};