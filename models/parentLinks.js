import mysql from 'mysql2/promise'
import { CONFIG } from '../global/global.js'

const connectionContent = CONFIG
const connection = await mysql.createConnection(connectionContent)

export class ParentLinksModel {
  static async getAll () {
    const [result] = await connection.query('SELECT * FROM parent_link')
    return result
  }

  static async getById ({ id }) {
    const [[result]] = await connection.query('SELECT * FROM parent_link WHERE id = ?', [id])
    return result
  }

  static async create ({ input }) {
    const [result] = await connection.query('INSERT INTO parent_link (link) VALUES (?);', [input.link])
    result.parent = await this.getById({ id: result.insertId })
    return result
  }

  static async update ({ id, input }) {
    let sql = 'UPDATE parent_link SET '
    const values = []

    if (input.link !== undefined) {
      sql += 'link = ?, '
      values.push(input.link)
    }

    if (values.length > 0) sql = sql.slice(0, -2)

    sql += ' WHERE id = ?'
    values.push(id)

    const [result] = await connection.query(sql, values)
    result.parent = await this.getById({ id })
    return result
  }

  static async delete ({ id }) {
    const [result] = await connection.query('DELETE FROM parent_link WHERE id = ?', [id])
    return result
  }
}
