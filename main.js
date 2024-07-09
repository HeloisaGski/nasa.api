import { getApod } from 'api.js';

async function mostrarImagemAstronomica() {
    const container = document.getElementById('imagem-container');
    container.innerHTML = '';  // Limpar o conteúdo existente

    try {
        const apodData = await getApod();
        if (apodData) {
            const { url, title, explanation } = apodData;
            const mediaType = apodData.media_type;

            const imagemHTML = mediaType === 'image'
                ? `<img src="${url}" alt="${title}" class="imagem" />`
                : `<iframe src="${url}" title="${title}" class="imagem"></iframe>`;

            container.innerHTML = `
                <h2>${title}</h2>
                ${imagemHTML}
                <p>${explanation}</p>
            `;
        }
    } catch (error) {
        console.error('Erro ao buscar dados da APOD:', error);
        container.innerHTML = '<p>Erro ao carregar a imagem.</p>';
    }
}

async function baixarImagem() {
    try {
        const apodData = await getApod();
        if (apodData && apodData.media_type === 'image') {
            const { url, title } = apodData;
            const response = await fetch(url);
            const blob = await response.blob();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${title}.jpg`;
            a.click();
            URL.revokeObjectURL(a.href);
            alert('Imagem baixada com sucesso!');
        } else {
            alert('A API não retornou uma imagem.');
        }
    } catch (error) {
        console.error('Erro ao baixar a imagem:', error);
        alert('Erro ao baixar a imagem.');
    }
}

// Tornar as funções disponíveis globalmente
window.mostrarImagemAstronomica = mostrarImagemAstronomica;
window.baixarImagem = baixarImagem;
