import { readStudentsJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'

const students = readStudentsJSON()

export class StudentModel {
  static async getAll ({ graduation }) {
    if (graduation) {
      return students.filter(student => student.graduation === graduation)
    }
    return students
  }

  static async getById ({ id }) {
    return students.find(student => student.id === parseInt(id))
  }

  static async create ({ input }) {
    const newStudent = {
      id: randomUUID(),
      graduation: 'Blanco',
      ...input
    }

    students.push(newStudent)

    return newStudent
  }

  static async update ({ id, input }) {
    const studentIndex = students.findIndex(student => student.id === parseInt(id))

    if (studentIndex === -1) return false

    console.log(input)

    const updatedStudent = {
      ...students[studentIndex],
      ...input
    }

    students[studentIndex] = updatedStudent

    return updatedStudent
  }
}
