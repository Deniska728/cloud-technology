import gql from 'graphql-tag';

export const DELETE_BUG = gql`
  mutation deleteOneBug($where: BugWhereUniqueInput!) {
    deleteOneBug(where: $where) {
      id
    }
  }
`;