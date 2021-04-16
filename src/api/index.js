import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_PSEUTOPY_API_URL
})

export async function convertCode(instructions, language) {
    const { data } = await api.post(`/convert/${language}`, {
        instructions
    });
    return data;
}

export async function getGrammar(language) {
    const { data } = await api.get(`/grammar/${language}`);
    return data;
}