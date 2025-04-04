export interface Character {
    id: number;
    name: string;
    images?: string[];
    debut: { manga?: string; anime?: string };
    family: { father?: string; mother?: string };
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

export interface CharacterApiResponse {
    characters: Character[];
    pageNumber: number;
    pageSize: number;
    total: number;
}