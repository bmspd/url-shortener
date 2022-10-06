const {getLinkByAlias} = require("../services/links");
const linksService = require("../services/links");
const {NotFoundError} = require("../modules/errors");

async function deleteAlias(request, response, next) {
    const { alias } = request.params
    const linkObject = getLinkByAlias(alias)
    try {
        if (linkObject) {
            if (linkObject.ttl && linkObject.created_at + linkObject.ttl < Date.now()) {
                await linksService.deleteAlias(alias)
                throw new NotFoundError('This alias does not exists')
            }
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