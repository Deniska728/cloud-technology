import gql from 'graphql-tag';

export const UPDATE_BUG = gql`
  mutation  updateOneBug(
    $data: BugUpdateInput!
    $where: BugWhereUniqueInput!
  ) {
    updateOneBug(data: $data, where: $where) {
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