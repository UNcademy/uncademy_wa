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

export const updateTask = gql`
mutation UpTask($id: Int!, $task: String!){
  updateTask(id: $id, task: {
    taskName: $task
  })
  {
    message
  }
}
`

export const deleteTasks = gql `
mutation RemoveTask($classId: Int!){
  deleteTasks(classId: $classId){
    message
  }
}
`

export const addGrade = gql `
mutation AddGrade($classId: Int!, $studentId: Int!, $taskId: Int!, $grade: Int!){
  addGrade(classId: $classId, studentId: $studentId, taskId: $taskId, grade: {value: $grade}){
    value
  }
}
`

export const editGrade = gql `
mutation EditGrade($classId: Int!, $studentId: Int!, $taskId: Int!, $grade: Int!){
  editGrade(classId: $classId, studentId: $studentId, taskId: $taskId, grade: {value: $grade}){
    message
  }
}
`

export const createFinalGrade = gql `
mutation FinalGrade($id: Int!){
  createFinalGrade(id: $id){
    message
  }
}
`