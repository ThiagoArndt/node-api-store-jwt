import { verify } from 'jsonwebtoken'
import 'dotenv/config'

const secret = process.env.SECRET

export const verifyToken = (req, res, next) => {
  var bearer = req.headers.authorization
  if (typeof bearer == 'undefined') {
    return res.status(401).json({ message: 'Token Vazio' })
  }
  if (bearer.split(' ')[0] != 'Bearer') {
    return res.status(401).json({ message: 'Token Não é Bearer' })
  }

  let token = bearer.split(' ')[1]

  try {
    verify(token, secret)
  } catch (error) {
    return res.status(401).send({
      error: 'Falha ao autenticar token'
    })
  }

  next()
}
