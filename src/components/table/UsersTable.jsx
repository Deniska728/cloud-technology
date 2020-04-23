import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import CustomButton from 'src/components/common/CustomButton';
import Table from 'src/components/table/Table';

import { USERS } from 'src/graphql/queries/findManyUsers';
import { CREATE_USER } from 'src/graphql/mutations/createOneUser';

const defaultCols = {
  id: 'id',
  username: 'username',
  assignedBugs: 'assignedBugs',
  reportedBugs: 'reportedBugs',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

const UsersTable = () => {
  const { data, loading, refetch } = useQuery(USERS);
  const [createOneUser] = useMutation(CREATE_USER);
  const client = useApolloClient();
  const [currentLoading, setCurrentLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [username, setUsername] = useState('');

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const refetchData = () => {
    setCurrentLoading(true);
    refetch().finally(() => {
      setCurrentLoading(false);
    });
  }

  const handleChange = ({ target: { value } }) => {
    setUsername(value);
  }

  const handleCreateUser = event => {
    event.preventDefault();

    if (username) {
      const variables = {
        data: {
          username
        }
      };

      setBtnLoading(true);

      createOneUser({ variables })
      .then(res => {
        const cachedProfile = client.readQuery({
          query: USERS,
        });
        
        client.writeQuery({
          query: USERS,
          data: {
            findManyUser: [...cachedProfile.findManyUser, res.data.createOneUser]
          }
        })
        toggle();
      })
      .catch(e => alert(e.message))
      .finally(() => setBtnLoading(false));
    } else {
      alert('Enter username');
    }
  }

  useEffect(() => setCurrentLoading(loading), [loading]);

  return (
    <div className="p-2 table-container">
      <Table
        data={currentLoading ? [] : data.findManyUser}
        type="users"
        defaultCols={defaultCols}
      />
      <div className="d-flex">
        <CustomButton
          color="primary"
          className="mr-2"
          onClick={toggle}
          text="Add new user"
        />
        <CustomButton color="light" text="Refetch table data" onClick={refetchData} />
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create user</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleCreateUser}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                placeholder="Enter a username"
                onChange={handleChange}
                value={username}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <CustomButton
            text="Create"
            onClick={handleCreateUser}
            disabled={btnLoading}
            color="primary"
            loading={btnLoading}
            spinnerColor="success"
          />
          {' '}
          <CustomButton color="secondary" onClick={toggle} text="Cancel" />
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default UsersTable;