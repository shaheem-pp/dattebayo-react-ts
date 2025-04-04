import axios from "axios";

export const getCharacters = async (page: number) => {
    const response = await axios.get(
        `https://dattebayo-api.onrender.com/characters?page=${page}&limit=10`
    );

    return response.data;
};