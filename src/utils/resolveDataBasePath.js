const path = require('path')

function resolveDataBasePath() {
    return path.resolve(__dirname, '../db')
}

function resolveLinksPath() {
    return path.resolve(resolveDataBasePath(), 'links.json')
}

module.exports = { resolveDataBasePath, resolveLinksPath }