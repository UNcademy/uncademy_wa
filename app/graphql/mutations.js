import { gql } from '@apollo/client';

export const createTasks = gql`
mutation Tasks($classId: Int!, $tasks: [TaskAssign!]!){
  createTasks(classId: $classId, tasks:{
    teacherName: "Carmen Aleida Fernandez Moreno"
    tasks: $tasks
  })
  {
    message
  }
}`;

export const addAbsences = gql`
mutation Absences($classId: Int!, $studentId: Int!, $absences: Int!, $maxAbs: Int!){
  addAbsences(classId: $classId, studentId: $studentId, absences:{
    absences: $absences
    maxAbsences: $maxAbs
  })
  {
    message
  }
}
`

export const registerUser = gql`
mutation Register($registerBody: Register){
  register(registerBody: $registerBody)
  {
    message
  }
}
`