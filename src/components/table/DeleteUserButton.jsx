import React from 'react';

import { useMutation, useApolloClient } from '@apollo/react-hooks';

import CustomButton from 'src/components/common/CustomButton';

import { DELETE_ONE_USER } from 'src/graphql/mutations/deleteOnUser';
import { USERS } from 'src/graphql/queries/findManyUsers';

const DeleteUserButton = ({ id }) => {
  const [deleteOneUser, { loading }] = useMutation(DELETE_ONE_USER);
  const client = useApolloClient();

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete a user?')) {
      deleteOneUser({
        variables: {
          where: {
            id
          }
        }
      })
      .then(({ data }) => {
        const cachedProfile = client.readQuery({
          query: USERS,
        }) 
  
        client.writeQuery({
          query: USERS,
          data: { 
            findManyUser: cachedProfile.findManyUser.filter(user => user.id !== data.deleteOneUser.id)
          }
        })
      })
    }
  }

  return (
    <CustomButton
      text="Delete"
      color="light"
      onClick={handleDelete}
      disabled={loading}
    />
  );
};

export default DeleteUserButton;
