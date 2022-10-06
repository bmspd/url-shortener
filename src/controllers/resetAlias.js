const linksService = require('../services/links')
const {getLinkByAlias} = require("../services/links");

async function resetAlias(request, response, next) {
    const { alias } = request.params
    const linkObject = getLinkByAlias(alias)
    try {
        if (linkObject) {
            await linksService.resetLinkVisits(alias)
            response.send({status: "ok"})
        } else {
            throw new Error()
        }
    } catch (e) {
        response.send({status: 'error'})
    }
}

module.exports = { resetAlias }