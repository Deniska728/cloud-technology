import gql from 'graphql-tag';

export const BUG = gql`
  query findOneBug($where: BugWhereUniqueInput!) {
    findOneBug(where: $where) {
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