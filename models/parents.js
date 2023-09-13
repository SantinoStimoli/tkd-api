import mysql from 'mysql2/promise'
import { DEFAULT_CONFIG } from '../global/global.js'

const connectionContent = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionContent)

export class ParentsModel {
  static async getAll () {
    const [result] = await connection.query('SELECT * FROM parents')
    return result
  }

  static async getById ({ id }) {
    const [[result]] = await connection.query('SELECT * FROM parents WHERE id = ?', [id])
    return result
  }

  static async create ({ input }) {
    const [result] = await connection.query('INSERT INTO parents (link, name, lastName, phone) VALUES (?, ?, ?, ?);', [input.link, input.name, input.lastName, input.phone])
    result.parent = await this.getById({ id: result.insertId })
    return result
  }

  static async update ({ id, input }) {
    let sql = 'UPDATE parents SET '
    const values = []

    if (input.link !== undefined) {
      sql += 'link = ?, '
      values.push(input.link)
    }

    if (input.name !== undefined) {
      sql += 'name = ?, '
      values.push(input.name)
    }

    if (input.lastName !== undefined) {
      sql += 'lastName = ?, '
      values.push(input.lastName)
    }

    if (input.phone !== undefined) {
      sql += 'phone = ?, '
      values.push(input.phone)
    }

    if (values.length > 0) sql = sql.slice(0, -2)

    sql += ' WHERE id = ?'
    values.push(id)

    const [result] = await connection.query(sql, values)
    result.parent = await this.getById({ id })
    return result
  }

  static async delete ({ id }) {
    const [result] = await connection.query('DELETE FROM parents WHERE id = ?', [id])
    return result
  }
}
