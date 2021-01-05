const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const courseList = [
  { id: "1", name: "JavaScript", credits: 10 },
  { id: "2", name: "React", credits: 9 },
  { id: "3", name: "Java", credits: 8 },
  { id: "4", name: "Python", credits: 7 },
  { id: "5", name: "PHP", credits: 6 }
];

const studentList = [
  {
    id: "4",
    name: "Abc",
    email: "abc@abc.com",
    enrollType: "Full-time",
    courseIds: ["2", "3"]
  },
  {
    id: "5",
    name: "Def",
    email: "def@def.com",
    enrollType: "Part-time",
    courseIds: ["1", "2", "3"]
  },
  {
    id: "6",
    name: "Ghi",
    email: "ghi@ghi.com",
    enrollType: "Full-time",
    courseIds: ["3", "4", "5"]
  },
  {
    id: "7",
    name: "Jkl",
    email: "jkl@jkl.com",
    enrollType: "Part-time",
    courseIds: ["4", "5"]
  },
  {
    id: "8",
    name: "Mno",
    email: "mno@mno.com",
    enrollType: "Full-time",
    courseIds: ["5"]
  }
];

const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    credits: { type: GraphQLInt },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return _.filter(studentList, { courseIds: [parent.id] });
      }
    }
  })
});

const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    enrollType: { type: GraphQLString },
    courseIds: { type: new GraphQLList(GraphQLID) },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return _.filter(courseList, item =>
          _.includes(parent.courseIds, item.id)
        );
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    course: {
      type: CourseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(courseList, { id: args.id });
      }
    },
    student: {
      type: StudentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(studentList, { id: args.id });
      }
    },
    studentsByEnrollType: {
      type: new GraphQLList(StudentType),
      args: { enrollType: { type: GraphQLString } },
      resolve(parent, args) {
        return _.filter(studentList, { enrollType: args.enrollType });
      }
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return courseList;
      }
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return studentList;
      }
    }
  }
});
let idCounter = 11;
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCourse: {
      type: CourseType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        courseList.push({
          id: (idCounter++).toString(),
          name: args.name,
          credits: idCounter
        });
        return courseList;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
