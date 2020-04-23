import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';

import dayjs from 'dayjs';

import { Modal, ModalHeader, ModalBody, DropdownItem } from 'reactstrap';
import Select from 'react-select';

import UpdateTextField from 'src/components/bugs/UpdateTextField';

import { BUG } from 'src/graphql/queries/findOneBug';
import { USERS } from 'src/graphql/queries/findManyUsers';
import { UPDATE_BUG } from 'src/graphql/mutations/updateOneBug';

import { statusOptions } from 'src/utils/statusOptions';

const ModalBugCard = () => {
  const { id } = useParams();
  const history = useHistory();
  const [updateOneBug] = useMutation(UPDATE_BUG);
  const { data: users, loading: usersLoading } = useQuery(USERS);
  const { data, loading } = useQuery(BUG, {
    variables: {
      where: {
        id
      }
    }
  });
  const [values, setValues] = useState({
    title: '',
    content: ''
  });
  const [options, setOptions] = useState(null);

  const goToBugs = () => history.push('/bugs');

  useEffect(() => {
    if (!loading) {
      const { reporter, asignee, status } = data.findOneBug;

      setValues({
        ...data.findOneBug,
        status: statusOptions.find(statusOption => status === statusOption.value),
        reporter: reporter ? {
          label: reporter.username,
          value: reporter.id, 
        } : null,
        asignee: asignee ? {
          label: asignee.username,
          value: asignee.id, 
        } : null,
      })
    }
  }, [loading, data]);

  useEffect(() => {
    if (!usersLoading) {
      setOptions(users.findManyUser.map(user => ({
        label: user.username,
        value: user.id,
      })));
    }
  }, [users, usersLoading])

  const handleChange = ({ target: { value, name } }) => {
    setValues(v => ({
      ...v,
      [name]: value,
    }))
  };

  const handleChangeStatus = (value, name) => {
    let variables = {
      data: {},
      where: {
        id,
      }
    }

    if (name === 'asignee') {
      variables.data = {
        asignee: {
          connect: {
            id: value.value,
          }
        }
      }
    } else {
      variables.data = {
        [name]: value.value,
      }
    }

    setValues(v => ({
      ...v,
      [name]: value,
    }));
    updateOneBug({ variables })
    .catch(e => console.error(e.message));
  };

  return (
    <div>
      <Modal isOpen={true} toggle={goToBugs} className="modal-card">
        <ModalHeader toggle={goToBugs}>
          {!loading ? <UpdateTextField
            id={values.id}
            name="title"
            text={values.title}
            onChange={handleChange}
            initialValue={data.findOneBug.title}
          /> : 'Loading...'}
        </ModalHeader>
        <ModalBody>
          {loading ? <div>Loading...</div> : (
            <div className="modal-body-content">
              <div className="left-side">
                <div>
                  <span>Description</span>
                  <UpdateTextField
                    className="mt-2 small"
                    id={values.id}
                    name="content"
                    text={values.content}
                    onChange={handleChange}
                    initialValue={data.findOneBug.content}
                  />
                </div>
              </div>
              <div className="right-side">
                <div className="d-flex flex-column mb-3">
                  <span className="title mb-2">Status</span>
                  <Select
                    className="small"
                    value={values.status}
                    options={statusOptions}
                    onChange={value => handleChangeStatus(value, 'status')}
                  />
                </div>
                <div className="d-flex flex-column my-3">
                  <span className="title mb-1">Reporter</span>
                  <span className="small">
                    {values.reporter ? values.reporter.label : 'Unreported'}
                  </span>
                </div>
                <div className="d-flex flex-column my-3">
                  <span className="title mb-2">Assignee</span>
                  <Select
                    className="small"
                    value={values.asignee}
                    options={options}
                    onChange={value => handleChangeStatus(value, 'asignee')}
                    isLoading={usersLoading}
                    loadingMessage="Loading..."
                    noOptionsMessage="No users"
                  />
                </div>
                <DropdownItem divider/>
                <div className="date-container">
                  <span className="created">
                    Created {dayjs(values.createdAt).format('MMMM DD, YYYY, H:mm:ss')}
                  </span>
                  <span className="updated">
                    Updated {dayjs(values.updatedAt).format('MMMM DD, YYYY, H:mm:ss')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  )
};

export default ModalBugCard;
