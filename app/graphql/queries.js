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