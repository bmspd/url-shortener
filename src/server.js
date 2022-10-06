const path = require('path')

const express = require('express')
const { ping } = require("./controllers/ping");
const {errorHandler} = require("./middlewares/errorHandler");
const {notFound} = require("./middlewares/notFound");
const {getAlias} = require("./controllers/getAlias");
const {addAlias} = require("./controllers/addAlias");
const {resetAlias} = require("./controllers/resetAlias");
const {deleteAlias} = require("./controllers/deleteAlias");

const app = express()

const PORT = 3000
app.use(express.json())
app.get('/ping', ping)
app.get('/:alias', getAlias)
app.post('/links', addAlias)
app.put('/:alias/reset', resetAlias)
app.delete('/:alias', deleteAlias)
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server started at ${PORT} port!`)
})