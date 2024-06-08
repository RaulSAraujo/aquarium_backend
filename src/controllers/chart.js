const business = require('../business/chart')

/**
 * @description Busca dados para montar os graficos.
 * @param {*} request 
 * @param {*} h 
 * @property {string} aquarium_id - Id do aquário.
 * @property {object} query - Parâmetros de busca.
 * @property {object} logger - Parâmetros do log exe: info, warn, error.
 * @returns {void}
 */
const findAll = async (request, h) => {
    const { params: { aquarium_id }, query, logger } = request;
    const { code, result } = await business.findAll(aquarium_id, query, logger);

    const map = {
        'Nível de água': 'nivel_agua',
        'Nível oxigênio': 'nivel_oxigenio',
        'pH': 'ph',
        'Luminosidade': 'luminosidade',
        'Temperatura': 'temperatura'
    }

    let initialName
    let body = {
        "nivel_agua": '',
        "nivel_oxigenio": '',
        'ph': '',
        'luminosidade': '',
        'temperatura': ''
    }
    const chart = result.map((item) => {
        if (item.name !== initialName) {
            body[map[item.name]] = item.value
        }

        if (item.name === initialName) {
            const data = new Date(item.created_at);
            const send = { ...body, created_at: format(data) }
            body = {
                "nivel_agua": '',
                "nivel_oxigenio": '',
                'ph': '',
                'luminosidade': '',
                'temperatura': ''
            }
            initialName = undefined

            return send
        }

        if (!initialName) {
            initialName = item.name
        }
    }).filter((item) => item !== undefined)

    return h.response(chart).code(code);
}

// Função para formatar a data no formato brasileiro
const format = (data) => {
    const day = data.getDate().toString().padStart(2, '0');
    const mounth = (data.getMonth() + 1).toString().padStart(2, '0');
    const year = data.getFullYear();
    const hours = data.getHours().toString().padStart(2, '0');
    const minutes = data.getMinutes().toString().padStart(2, '0');
    const seconds = data.getSeconds().toString().padStart(2, '0');

    return `${day}/${mounth}/${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
    findAll
}