const apiKey = 'vgSqnR4A4K0MxupXRGvowinhgVZJ7nxucdcbluEm'; 

async function getApod() {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Erro ao buscar a imagem');

        const data = await response.json();
        displayApod(data);
    } catch (error) {
        console.error('Erro ao buscar a APOD:', error);
    }
}

function displayApod(data) {
    const apodContent = document.getElementById('apod-content');
    apodContent.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
        <img src="${data.url}" alt="${data.title}">
    `;
}

async function buscarAsteroide() {
    const id = document.getElementById('asteroid-id').value;
    try {
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Erro ao buscar o asteroide');

        const data = await response.json();
        displayAsteroide(data);
    } catch (error) {
        console.error('Erro ao buscar o asteroide:', error);
    }
}

function displayAsteroide(data) {
    const asteroidContent = document.getElementById('asteroid-content');
    asteroidContent.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Designação:</strong> ${data.designation}</p>
        <p><strong>Diâmetro:</strong> ${data.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
        <p><strong>Data de Aproximação:</strong> ${data.close_approach_data[0].close_approach_date}</p>
        <p><strong>Velocidade:</strong> ${data.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
        <p><strong>Detalhes:</strong> <a href="${data.nasa_jpl_url}" target="_blank">Mais informações</a></p>
    `;
}

function mostrarImagemAstronomica() {
    document.getElementById('apod-section').style.display = 'block';
    document.getElementById('asteroid-section').style.display = 'none';
}

function mostrarBuscaAsteroide() {
    document.getElementById('apod-section').style.display = 'none';
    document.getElementById('asteroid-section').style.display = 'block';
}

// Tornando as funções disponíveis no escopo global
window.getApod = getApod;
window.buscarAsteroide = buscarAsteroide;
window.mostrarImagemAstronomica = mostrarImagemAstronomica;
window.mostrarBuscaAsteroide = mostrarBuscaAsteroide;

// Carregar a imagem astronômica do dia ao carregar a página
document.addEventListener('DOMContentLoaded', mostrarImagemAstronomica);
