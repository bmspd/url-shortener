const {getLinkByAlias} = require("../services/links");
const linksService = require("../services/links");

async function deleteAlias(request, response, next) {
    const { alias } = request.params
    const linkObject = getLinkByAlias(alias)
    try {
        if (linkObject) {
            await linksService.deleteAlias(alias)
            response.send({status: "ok"})
        } else {
            throw new Error()
        }
    } catch(e) {
        response.send({status: 'error'})
    }
}

module.exports = { deleteAlias }