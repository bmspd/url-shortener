const {generateRandomString} = require("../utils/generateString");
const linksService = require('../services/links')

async function addAlias(request, response, next) {
    try {
        const linkObject = request.body
        const { link, isOneTimeLink, ttl } = linkObject

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
        if (ttl) {
            setTimeout(() => {
                linksService.deleteAlias(random)
            }, ttl)
        }
        delete newLinkFromDB['created_at']
        response.send(newLinkFromDB)
    } catch (e) {
        next(e)
    }
}

module.exports = { addAlias }