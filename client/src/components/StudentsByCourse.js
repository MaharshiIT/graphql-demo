import React from "react";
import { graphql } from "react-apollo";
import { getCourseStudents } from "../queries/queries";

function StudentsByCourse({ data }) {
  return (
    <div>
      <h2>Students by Course</h2>
      {data.loading && <div>Loading Students...</div>}
      {data.course &&
        data.course.students.map(({ name, id }) => <div key={id}>{name}</div>)}
    </div>
  );
}

export default graphql(getCourseStudents, {
  options: props => {
    return {
      variables: {
        courseId: props.courseId
      }
    };
  }
})(StudentsByCourse);
