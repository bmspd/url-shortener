const linksService = require('../services/links')

async function getAlias(request, response, next) {
    const { alias } = request.params
    setTimeout(() => {
        console.log('test-timeout')
    }, 2000)
    try {
        const linkObject = await linksService.visitLink(alias)
        if (linkObject.isOneTimeLink) await linksService.deleteAlias(alias)
        console.log(linkObject)

        const res = {...linkObject, alias}

        response.send(res)
    } catch (e) {
        next(e)
    }

}

module.exports = { getAlias }