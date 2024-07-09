// api.js
const baseURL = 'https://api.nasa.gov/planetary/apod?api_key=vgSqnR4A4K0MxupXRGvowinhgVZJ7nxucdcbluEm';

export async function getApod() {
    try {
        const response = await fetch(baseURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados da APOD:', error);
        return null;
    }
}
