import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation updateOneUser (
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateOneUser(data: $data, where: $where) {
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