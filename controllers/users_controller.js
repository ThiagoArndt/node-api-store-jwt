import initModels from '../models/init-models.js'
import db from '../config/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const { users } = initModels(db)

export const registerUser = async (req, res) => {
  const { user_name, user_password } = req.body

  //Verifica se este usuário já existe
  try {
    const userExists = await users.findOne({ where: { user_name } })
    if (userExists != null) {
      return res.status(401).json({ message: 'Usuário já existente' })
    }
  } catch (e) {
    res.status(401).json({ message: 'Erro durante a procura pelo usuário' })
    console.log(e)
  }

  //Registra o usuário no Banco de Dados
  try {
    const password = bcrypt.hashSync(user_password, 10)

    const data = await users.create({
      user_name: user_name,
      user_password: password
    })

    res.json({
      data: data,
      message: 'Usuário criado com sucesso!'
    })
  } catch (e) {
    console.log('Erro ao criar usuário', e)
  }
}

export const loginUser = async (req, res) => {
  const { user_name, user_password } = req.body

  const userName = await users.findOne({ where: { user_name } })
  if (userName == null)
    return res.status(401).json({ message: 'Usuário não encontrado' })

  try {
    const decryptedPassword = decryptPassword(userName, user_password)
    if (decryptedPassword == null)
      return res.status(401).json({ message: 'Senha incorreta' })

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          username: user_name
        }
      },
      process.env.SECRET
    )

    res.send({
      user_name,
      token
    })
  } catch (e) {
    console.log('Erro ao criar usuário', e)
  }
}

const decryptPassword = async (username, password) => {
  bcrypt.compare(password, username.user_password, (err, hash) => {
    if (err) return null
    else return hash
  })
}
