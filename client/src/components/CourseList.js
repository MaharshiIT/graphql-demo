import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getCoursesQuery } from "../queries/queries";
import StudentsByCourse from "./StudentsByCourse";

function CourseList({ data }) {
  const [courseId, setCourseId] = useState(0);
  const handleCourseClick = id => {
    setCourseId(id);
  };
  return (
    <div>
      <h2>Courses</h2>
      {data.loading && <div>Loading courses..</div>}
      <ul>
        {data.courses &&
          data.courses.map(({ name, id }) => (
            <li
              key={id}
              style={{ cursor: "pointer" }}
              onClick={() => handleCourseClick(id)}
            >
              {name}
            </li>
          ))}
      </ul>
      <StudentsByCourse courseId={courseId} />
    </div>
  );
}

export default graphql(getCoursesQuery)(CourseList);
