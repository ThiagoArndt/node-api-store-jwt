import { Sequelize } from 'sequelize'
import 'dotenv/config'
const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql'
  }
)
export default db
