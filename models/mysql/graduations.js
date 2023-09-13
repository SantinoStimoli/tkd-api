import mysql from 'mysql2/promise'
import { SQL_CONFIG } from '../../global/global.js'

const connection = await mysql.createConnection(SQL_CONFIG)

export class GraduationsModel {
  static async getAll () {
    const [result] = await connection.query('SELECT * FROM graduations')
    return result
  }

  static async getById ({ id }) {
    const [[result]] = await connection.query('SELECT * FROM graduations WHERE id = ?', [id])
    return result
  }

  static async create ({ input }) {
    const [result] = await connection.query('INSERT INTO graduations (graduation) VALUES (?);', [Object.values(input)])
    result.graduation = await this.getById({ id: result.insertId })
    return result
  }

  static async update ({ id, input }) {
    let sql = 'UPDATE graduations SET '
    const values = []

    if (input.graduation !== undefined) {
      sql += 'graduation = ?, '
      values.push(input.graduation)
    }

    if (values.length > 0) sql = sql.slice(0, -2)

    sql += ' WHERE id = ?'
    values.push(id)

    const [result] = await connection.query(sql, values)
    result.graduation = await this.getById({ id })
    return result
  }

  static async delete ({ id }) {
    const [result] = await connection.query('DELETE FROM graduations WHERE id = ?', [id])
    return result
  }
}
