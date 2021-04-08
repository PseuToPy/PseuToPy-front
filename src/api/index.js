import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_PSEUTOPY_API_URL
})

export async function convertCode(instructions, language) {
    const { data, status } = await api.post(`/convert/${language}`, {
        instructions
    });
    console.log(data, status);
    return data;
}

export async function getGrammar(language) {
    const { data, status } = await api.get(`/grammar/${language}`);
    console.log(data, status);
    return data;
}