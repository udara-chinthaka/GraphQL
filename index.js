const { ApolloServer, gql } = require('apollo-server');
const UserService = require('./dataSource/file');
const ProjectService = require('./project/project')

const typeDefs = gql`
type Query{
    user(
    id: ID, 
    firstName: String,
    age:Int,
    lastName:String,
    gender:String,
    address:String,
    phoneNumbers:String,
    ): [User],
    findUserById(id:ID):User,
    project:[Project],
    findProjectById(id:ID):Project
}

type User {
    id: ID!,
    firstName: String,
    age:Int,
    lastName:String @deprecated(reason:"we are gonna remove this coming versions"),
    gender:String,
    address:String,
    phoneNumbers:String,
    projects:[Project]
}

type Project  {
    id:ID!,
    projectName: String
    startDate : String
    client: String
    users : [Int]
}
`

// data source
const dataSources = () => ({
    userService: new UserService(),
    projectService: new ProjectService()
})

// resolver
const resolvers = {
    Query: {
        // get all data from the data source
        user: (parent, args, { dataSources }, info) => {
            return dataSources.userService.getAllUser(args);
        },
        // configure filter by ID
        findUserById: (parent, { id }, { dataSources }, info) => {
            return dataSources.userService.getUserById(id)[0];
        },
        project: (parent, args, { dataSources }, info) => {
            return dataSources.projectService.getProject();
        },
        findProjectById: (parent, { id }, { dataSources }, info) => {
            return dataSources.projectService.findProjectById(id);
        },
        // User: {
        //     async projects(user, args, { dataSources }, info) {
        //         let projects = await dataSources.projectService.getProject();
        //         let workProject = projects.filter(projects => {
        //             return projects.users.includes(user.id);
        //         });
        //         return workProject;
        //     }
        // }
    }
}

const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });

gqlServer.listen({ port: process.env.port || 4000 })
    .then(({ url }) => { console.log(`GraphQL server started on ${url}`); })
    .catch(() => {
        console.log('Unable to start the server');
    });