import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      id
      username
      assignedBugs {
        id
        status
        content
        asignee {
          username
        }
        reporter {
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
          username
        }
        reporter {
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