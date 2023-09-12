import { parseBoolean, readStudentsJSON } from '../../utils.js'
import { randomUUID } from 'node:crypto'

const students = readStudentsJSON()

export class StudentModel {
  static async getAll ({ graduation, actives }) {
    let filteredStudents = students

    if (graduation) {
      filteredStudents = filteredStudents.filter(student => student.graduation === graduation.toLowerCase())
    }

    if (actives !== undefined) {
      filteredStudents = filteredStudents.filter(student => student.isActive === parseBoolean(actives))
    }

    return filteredStudents.length === 0 ? null : filteredStudents
  }

  static async getById ({ id }) {
    return students.find(student => student.id.toString() === id.toString())
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
    const studentIndex = students.findIndex(student => student.id.toString() === id.toString())

    if (studentIndex === -1) return students[studentIndex]

    const updatedStudent = {
      ...students[studentIndex],
      ...input
    }

    students[studentIndex] = updatedStudent

    return updatedStudent
  }

  static async delete ({ id }) {
    const studentIndex = students.findIndex(student => student.id.toString() === id.toString())

    if (studentIndex === -1) return null

    students.splice(studentIndex, 1)

    return students[studentIndex]
  }

  static async changeActivitie ({ id }) {
    const studentIndex = students.findIndex(student => student.id.toString() === id.toString())
    const student = students[studentIndex]
    if (studentIndex === -1) return null

    const updatedStudent = {
      ...student,
      isActive: !student.isActive
    }

    students[studentIndex] = updatedStudent

    return updatedStudent
  }
}
