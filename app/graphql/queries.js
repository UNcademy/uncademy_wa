import { gql } from '@apollo/client';

export const getSchedule = gql`
query{
  getSchedule(info:{
    teacherName: "Carmen Aleida Fernandez Moreno"
    semester: "2022-II"
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