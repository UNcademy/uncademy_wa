import { gql } from '@apollo/client';

export const getSchedule = gql`
query Schedule($semester: String!){
  getSchedule(info:{
    teacherName: "Carmen Aleida Fernandez Moreno"
    semester: $semester
  })
  {
    monday{
      id
      course
      schedule
      classroom
    }
    tuesday{
      id
      course
      schedule
      classroom
    }
    wednesday{
      id
      course
      schedule
      classroom
    }
    thursday{
      id
      course
      schedule
      classroom
    }
    friday{
      id
      course
      schedule
      classroom
    }
    saturday{
      id
      course
      schedule
      classroom
    }
  }
}`;

export const classListDetails = gql`
query ClassList($id: Int!){
  classListDetails(id: $id){
    semester
    courseName
    courseGroup
    EnrolledStudents{
      Student{
        studentId
        studentName
        studyProgram
      }
      absences
      Tasks{
        taskName
        Grade{
          value
        }
      }
    }
    Teachers{
      teacherId
      teacherName
      TeacherRole{
        isHead
      }
    }
  }
}`;

export const getTasks = gql `
query Task($teacherId: Int!, $classId: Int!){
  getTasks(teacherId: $teacherId, classId: $classId){
    taskId
    taskName
    weight
  }
}
`

export const generateAct = gql `
query Act($id: Int!, $name: String!){
  generateAct(groupId: $id, teacherName: $name){
    message
  }
}
`

export const getAct = gql `
query TokenAct($id: Int!){
  getAct(actId: $id){
    message
  }
}
`

export const statsByGroup = gql `
query Stats($id: Int!){
  statsByGroup(groupId: $id){
    participation_percentage
    approbation_percentage
    average_grade
    standard_deviation
    best_grade
    worst_grade
  }
}
`