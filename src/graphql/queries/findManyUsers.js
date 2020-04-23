import gql from 'graphql-tag';

export const USERS = gql`
  query findManyUsers {
    findManyUser {
      id
      username
      assignedBugs {
        id
        status
        content
        asignee {
          id
          username
        }
        reporter {
          id
          username
        }
        createdAt
        updatedAt
      }
      reportedBugs {
        id
        status
        content
        asignee {
          id
          username
        }
        reporter {
          id
          username
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;