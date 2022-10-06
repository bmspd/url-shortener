const {getLinkByAlias, isLinkExists} = require("../services/links");
const {BadRequestError} = require("../modules/errors");
const {generateRandomString} = require("../utils/generateString");
const linksService = require('../services/links')

async function addAlias(request, response, next) {
    try {
        const linkObject = request.body
        const { link, isOneTimeLink, ttl } = linkObject

        //if (await isLinkExists(link)) throw new BadRequestError("This link is already exists")
        const random = generateRandomString(8)
        const newLink = {
            link,
            isOneTimeLink,
            visited: 0,
            alias: random,
            created_at: Date.now()
        }
        if (ttl) newLink.ttl = ttl
        const newLinkFromDB = await linksService.addAlias(random, newLink)
        delete newLinkFromDB['created_at']
        response.send(newLinkFromDB)
    } catch (e) {
        next(e)
    }
}

module.exports = { addAlias }