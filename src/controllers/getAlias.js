const linksService = require('../services/links')
const {NotFoundError} = require("../modules/errors");
const {resolveDataBasePath} = require("../utils/resolveDataBasePath");

async function getAlias(request, response, next) {
    const { alias } = request.params
    console.log("I AM IN THIS CONTROLLER!")
    try {
        const linkObject = await linksService.visitLink(alias)
        if (linkObject.ttl && linkObject.created_at + linkObject.ttl < Date.now()) {
            await linksService.deleteAlias(alias)
            throw new NotFoundError('This alias does not exists')
        }
        if (linkObject.isOneTimeLink) await linksService.deleteAlias(alias)
        console.log(linkObject)

        const res = {...linkObject, alias}

        response.send(res)
    } catch (e) {
        next(e)
    }

}

module.exports = { getAlias }