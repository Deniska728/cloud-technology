import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { UPDATE_USER } from 'src/graphql/mutations/updateOneUser';

const UpdateUserModal = ({ value }) => {
  const [updateOneUser] = useMutation(UPDATE_USER);
  const [btnLoading, setBtnLoading] = useState(false);
  const [username, setUsername] = useState(value.username || '');
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleChange = ({ target: { value } }) => {
    setUsername(value);
  }

  const handleCreateUser = event => {
    event.preventDefault();

    if (username) {
      const variables = {
        data: {
          username
        },
        where: {
          id: value.id
        }
      };

      setBtnLoading(true);

      updateOneUser({ variables })
      .then(res => toggle())
      .catch(e => alert(e.message))
      .finally(() => setBtnLoading(false));
    } else {
      alert('Enter username');
    }
  }

  return (
    <div>
      <Button color="light" className="mr-2" onClick={toggle}>
        Update
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update user</ModalHeader>
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
          <Button
            color="primary"
            onClick={handleCreateUser}
            disabled={btnLoading}
          >
            Update
          </Button>
          {' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default UpdateUserModal;