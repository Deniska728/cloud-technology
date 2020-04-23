import gql from 'graphql-tag';

export const DELETE_ONE_USER = gql`
  mutation deleteOneUser($where: UserWhereUniqueInput!) {
    deleteOneUser(where: $where) {
      id
    }
  }
`;