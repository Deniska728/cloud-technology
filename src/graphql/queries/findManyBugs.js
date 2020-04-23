import gql from 'graphql-tag';

export const BUGS = gql`
  query findManyBugs {
    findManyBug {
      id
      title
      content
      status
      tags
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
  }
`;