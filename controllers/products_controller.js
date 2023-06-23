import initModels from '../models/init-models.js'
import db from '../config/database.js'
import { Op } from 'sequelize'

const { products, orders } = initModels(db)

export const getProducts = async (req, res) => {
  const { id_categoria, qtde_pedido } = req.query

  var data = undefined

  const options = {}
  if (id_categoria !== undefined) {
    options.id_categoria = id_categoria
  }

  try {
    if (qtde_pedido !== undefined) {
      var orderData = await orders.findAll({
        where: {
          qtde_pedido
        }
      })
      var list = []
      for (var i in orderData) {
        list.push(orderData[i].dataValues)
      }

      let result = list.map(item => item.cod_produto)

      data = await products.findAll({
        where: { ...options, cod_produto: { [Op.in]: result } }
      })
    } else {
      data = await products.findAll({ where: options })
    }
    res.send({ data: data })
  } catch (e) {
    res.status(400).send({ message: 'Erro ao acessar a tabela de produto' })
  }
}

export const createProducts = async (req, res) => {
  try {
    await products.create(req.body)
    res.json({
      message: 'Um novo registro de produto foi inserido no Banco de dados'
    })
  } catch (e) {
    res.status(400).send({ message: 'Erro ao Inserir um novo produto' })
  }
}

export const updateProducts = async (req, res) => {
  const { nome_produto, qtde_produto, id_categoria } = req.body
  const { id } = req.query
  try {
    await products.update(
      { nome_produto, qtde_produto, id_categoria },
      { where: { cod_produto: id } }
    )
    res.json({
      message: `O produto com id ${id} foi atualizado no Banco de dados`
    })
  } catch (e) {
    res.status(400).send({ message: 'Erro ao Atualizar um produto' })
  }
}

export const deleteProducts = async (req, res) => {
  const { id } = req.query
  try {
    await products.destroy({ where: { cod_produto: id } })
    res.json({
      message: `O produto com id ${id} foi deletado no Banco de dados`
    })
  } catch (e) {
    res.status(400).send({ message: 'Erro ao Deletar um produto' })
  }
}
