import express from 'express'
import cors from 'cors'
import db from './config/database.js'

import categoriesRouter from './routers/categories_routes.js'
import productsRouter from './routers/products_routes.js'
import ordersRouter from './routers/orders_routes.js'
import usersRouter from './routers/users-routes.js'

import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'

const file = fs.readFileSync('./utils/swagger-utils.yml', 'utf8')
const swaggerDocument = YAML.parse(file)

const server = express()
server.use(express.json())
server.use(cors())

try {
  await db.authenticate()
  console.log('Conexão com o MySQl estabelecida!')
} catch (e) {
  console.log('Conexão com o MySQL não etabelecida', e)
}

server.use(categoriesRouter)
server.use(productsRouter)
server.use(ordersRouter)
server.use(usersRouter)
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.listen(5000, () =>
  console.log('server executando em http://localhost:5000')
)
