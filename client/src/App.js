import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import CourseList from './components/CourseList';
import StudentList from './components/StudentList';
import AddCourse from './components/AddCourse';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>School</h1>
                <AddCourse />
                <CourseList />
                <StudentList />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
