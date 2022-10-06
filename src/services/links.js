const fs = require('fs/promises')

const {NotFoundError} = require("../modules/errors");
const {resolveLinksPath} = require("../utils/resolveDataBasePath");

async function getLinkByAlias(alias) {
    const links = require(resolveLinksPath())

    return links[alias]
}

async function visitLink(alias) {
    const links = require(resolveLinksPath())

    if (!links[alias]) {
        throw new NotFoundError('No link found')
    }

    links[alias].visited = links[alias].visited + 1;

    await fs.writeFile(resolveLinksPath(), JSON.stringify(links, null, 2), 'utf-8')

    return links[alias]
}

async function resetLinkVisits(alias) {
    const links = require(resolveLinksPath())

    if (!links[alias]) {
        throw new NotFoundError('No link found')
    }

    links[alias].visited = 0

    await fs.writeFile(resolveLinksPath(), JSON.stringify(links, null, 2), 'utf-8')

    return links[alias]
}

async function isLinkExists(link) {
    const links = require(resolveLinksPath())

    return (Object.values(links).some(el => el.link === link))
}

async function addAlias(alias, link) {
    const links = require(resolveLinksPath())

    links[alias] = {...link}

    await fs.writeFile(resolveLinksPath(), JSON.stringify(links, null, 2), 'utf8')

    return link
}

async function deleteAlias(alias) {
    const links = require(resolveLinksPath())
    if (!links[alias]) throw new NotFoundError('There is no this alias')
    delete links[alias]

    await fs.writeFile(resolveLinksPath(), JSON.stringify(links, null, 2), 'utf-8')
}

module.exports = { visitLink, getLinkByAlias, isLinkExists, addAlias, deleteAlias, resetLinkVisits }