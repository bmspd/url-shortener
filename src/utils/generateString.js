function generateRandomString(i) {
    let rnd = ''
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2)
    return rnd.substring(0, i)
}

function generateUniqueString(values, i) {
    const random = generateRandomString(i)

    if (values.includes(random)) generateUniqueString(values, i)

    return random
}

module.exports = { generateRandomString, generateUniqueString }