import initModels from '../models/init-models.js'
import db from '../config/database.js'

const { categories } = initModels(db)

export const getCategories = async (req, res) => {
  try {
    const data = await categories.findAll({})
    res.send({ data: data })
  } catch (e) {
    res.status(400).send({message: "Erro ao acessar a tabela de categoria"})
  }
}

export const createCategories = async (req, res) => {
  try {
    await categories.create(req.body)
    res.json({
      message: 'Um novo registro de categoria foi inserido no Banco de dados'
    })
  } catch (e) {
    res.status(400).send({message: "Erro ao Inserir uma nova categoria"})
  }
}

export const updateCategories = async (req, res) => {
  const { nome_categoria } = req.body
  const { id } = req.query
  try {
    await categories.update(
      { nome_categoria: nome_categoria },
      { where: { id_categoria: id } }
    )
    res.json({
      message: `A categoria com id ${id} foi atualizado no Banco de dados`
    })
  } catch (e) {
    res.status(400).send({message: "Erro ao Atualizar uma categoria"})
  }
}

export const deleteCategories = async (req, res) => {
  const { id } = req.query
  try {
    await categories.destroy({ where: { id_categoria: id } })
    res.json({
      message: `A categoria com id ${id} foi deletado no Banco de dados`
    })
  } catch (e) {
    res.status(400).send({message: "Erro ao Deletar uma categoria"})
  }
}
