import gql from 'graphql-tag';

export const CREATE_BUG = gql`
  mutation createOneBug ($data: BugCreateInput!) {
    createOneBug(data: $data) {
      id
      title
      content
      status
      tags
      asignee {
        id
        username
        updatedAt
        createdAt
      }
      reporter {
        id
        username
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;