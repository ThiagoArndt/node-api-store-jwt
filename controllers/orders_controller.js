import initModels from '../models/init-models.js'
import db from '../config/database.js'

const { orders, products } = initModels(db)

export const getOrders = async (req, res) => {
  try {
    const data = await orders.findAll({})
    res.send({ data: data })
  } catch (e) {
    res.status(400).send({ message: 'Erro ao acessar a tabela de pedido' })
  }
}

export const createOrders = async (req, res) => {
  var qtdeProduto = null
  const { cod_produto } = req.body
  try {
    const product = await products.findOne({ where: { cod_produto } })
    qtdeProduto = product.dataValues.qtde_produto

    if (qtdeProduto <= 3) {
      qtdeProduto = 4
    } else if (qtdeProduto > 3 && qtdeProduto < 7) {
      qtdeProduto = 3
    } else {
      return res
        .status(400)
        .send({ message: 'Quantidade do produto deve ser menor que 7' })
    }
  } catch (e) {
    return res.status(400).send({ message: 'Código do produto inexistente' })
  }

  try {
    await orders.create({
      cod_produto: cod_produto,
      qtde_pedido: qtdeProduto
    })
    res.json({
      message: 'Um novo registro de pedido foi inserido no Banco de dados'
    })
  } catch (e) {
    res.status(400).send({ message: 'Erro ao Inserir um novo pedido' })
  }
}

export const updateOrders = async (req, res) => {
  const { qtde_pedido, cod_produto } = req.body
  const { id } = req.query
  try {
    await orders.update(
      { qtde_pedido, cod_produto },
      { where: { num_pedido: id } }
    )
    res.json({
      message: `O pedido com id ${id} foi atualizado no Banco de dados`
    })
  } catch (e) {
    res.status(400).send({ message: 'Erro ao Atualizar um pedido' })
  }
}

export const deleteOrders = async (req, res) => {
  const { id } = req.query
  try {
    await orders.destroy({ where: { num_pedido: id } })
    res.json({
      message: `O pedido com id ${id} foi deletado no Banco de dados`
    })
  } catch (e) {
    res.status(400).send({ message: 'Erro ao Deletar um pedido' })
  }
}
