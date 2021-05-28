import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_PSEUTOPY_API_URL
})

/**
 * Get the converted code, calling the api and retreive data
 * @async
 * @function convertCode
 * @return {Promise<Array<Object>|error>}
 */
export async function convertCode(instructions, language) {
    const { data } = await api.post(`/convert/${language}`, {
        instructions
    });
    return data;
}

/**
 * Get grammar, calling the api and retreive data
 * @async
 * @function getGrammar
 * @return {Promise<Array<Object>|error>}
 */
export async function getGrammar(language) {
    const { data } = await api.get(`/grammar/${language}`);
    return data;
}