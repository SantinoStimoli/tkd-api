import mysql from 'mysql2/promise'
import { DEFAULT_CONFIG } from '../global/global.js'

const connectionContent = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionContent)

export class StudentsModel {
  static async getAll ({ graduation, actives }) {
    const [result] = await connection.query('SELECT * FROM students' + (graduation !== undefined || actives !== undefined ? ' WHERE' + (graduation !== undefined ? ` graduation = "${graduation}"` : '') + (graduation !== undefined && actives !== undefined ? ' AND' : '') + (actives !== undefined ? ` isActive = ${actives}` : '') : ''))
    return result
  }

  static async getById ({ id }) {
    const [[result]] = await connection.query('SELECT * FROM students WHERE id = ?', [id])
    return result
  }

  static async create ({ input }) {
    const [result] = await connection.query('INSERT INTO students (name, lastName, graduation, phone, isActive, birthday, startDate) VALUES (?, ?, ?, ?, ?, ?, ?);', [input.name, input.lastName, input.graduation, input.phone, input.isActive, input.birthday, input.startDate])
    result.student = await this.getById({ id: result.insertId })
    return result
  }

  static async update ({ id, input }) {
    let sql = 'UPDATE students SET '
    const values = []

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

    if (input.birthday !== undefined) {
      sql += 'birthday = ?, '
      values.push(input.birthday)
    }

    if (input.startDate !== undefined) {
      sql += 'startDate = ?, '
      values.push(input.startDate)
    }

    if (values.length > 0) sql = sql.slice(0, -2)

    sql += ' WHERE id = ?'
    values.push(id)

    const [result] = await connection.query(sql, values)
    result.student = await this.getById({ id })
    return result
  }

  static async delete ({ id }) {
    const [result] = await connection.query('DELETE FROM students WHERE id = ?', [id])
    return result
  }

  static async changeActivitie ({ id }) {
    const [result] = await connection.query('UPDATE students SET isActive = NOT isActive WHERE id = ?', [id])
    result.student = await this.getById({ id })
    return result
  }
}
