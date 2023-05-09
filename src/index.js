const express = require('express')
const app = express()
app.use(express.json())
app.listen(3000)
app.disable('x-powered-by');
const cors = require('cors')
app.use(cors())

const rootRouter = require('./routers/rootRouter')
app.use("/api/v1", rootRouter)