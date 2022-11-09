import { gql } from '@apollo/client';

export const getSchedule = gql`
query Schedule($semester: String!, $teacher: String!){
  getSchedule(info:{
    teacherName: $teacher
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
        weight
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

export const login=gql `
query login($username:String!, $password:String!){
    login(loginBody:{
        username: $username,
        password: $password
      }){
        statusCode
        message
        data{accessToken}
    }
}`;


export const getRegistration = gql`
query GetRegistration($id: String!){
  getRegistration(id: $id){
    idStudent
    idProgram
    subjects{
      idSubject
      nameSubject
      cupSubject
      days
      time
    }
  }
}`;


export const getAppointment = gql`
query GetAppointment($id: String!){
  getAppointment(id:$id){
    idStudent
    idProgram
    date
    dateEnd
  }
}`;

//TODO: Reemplazar por el query respectivo
export const soapService = gql `
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