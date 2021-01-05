import { gql } from "apollo-boost";

const getStudentsQuery = gql`
  {
    students {
      name
      enrollType
      id
    }
  }
`;

const getCoursesQuery = gql`
  {
    courses {
      name
      id
    }
  }
`;

const getCourseStudents = gql`
  query GetCourseStudents($courseId: ID) {
    course(id: $courseId) {
      students {
        name
        id
      }
    }
  }
`;

const addCourseMutation = gql`
  mutation AddCourse($name: String!) {
    addCourse(name: $name) {
      name
      id
    }
  }
`;

export {
  getStudentsQuery,
  getCoursesQuery,
  getCourseStudents,
  addCourseMutation
};
