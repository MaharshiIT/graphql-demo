import React from "react";
import { graphql } from "react-apollo";
import { getStudentsQuery } from "../queries/queries";

function StudentList({ data }) {
  return (
    <div>
      <h2>Students</h2>
      {data.loading && <div>Loading students..</div>}
      <ul>
        {data.students &&
          data.students.map(({ id, name, enrollType }) => (
            <li key={id}>
              {name}
              <div>
                <small>{enrollType}</small>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default graphql(getStudentsQuery)(StudentList);
