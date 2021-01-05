import React, { useState } from "react";
import { graphql, compose } from "react-apollo";
import { getCoursesQuery, addCourseMutation } from "../queries/queries";

function AddCourse({ addCourseMutate }) {
  const [name, setName] = useState("");
  const submitForm = e => {
    e.preventDefault();
    addCourseMutate({
      variables: {
        name
      },
      refetchQueries: [{ query: getCoursesQuery }]
    });
  };
  return (
    <form id="add-course" onSubmit={submitForm}>
      <div className="field">
        <label>Course name:</label>
        <input type="text" onChange={e => setName(e.target.value)} />
      </div>
      <button>Add</button>
    </form>
  );
}

export default graphql(addCourseMutation, { name: "addCourseMutate" })(
  AddCourse
);
