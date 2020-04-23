import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import Select from 'react-select';

import CustomButton from 'src/components/common/CustomButton';

import { CREATE_BUG } from 'src/graphql/mutations/createOneBug';
import { BUGS } from 'src/graphql/queries/findManyBugs';
import { USERS } from 'src/graphql/queries/findManyUsers';

const NewCardForm = ({ status }) => {
  const [createOneBug] = useMutation(CREATE_BUG);
  const { data, loading } = useQuery(USERS);
  const client = useApolloClient();
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(null);
  const [values, setValues] = useState({
    title: '',
  });

  useEffect(() => {
    if (!loading) {
      setOptions(data.findManyUser.map(user => ({
        label: user.username,
        value: user.id
      })));
    }
  }, [loading, data]);

  const handleChange = ({ target: { name, value } }) => {
    setValues(v => ({
      ...v,
      [name]: value,
    }))
  }

  const addCard = () => {
    const { reporter, title } = values;
  
    if (title) {
      let variables = {
        data: {
          ...values,
          status,
        }
      }

      if (reporter) {
        variables.data.reporter = {
          connect: {
            id: values.reporter.value,
          }
        };
      }

      console.log(variables)

      createOneBug({ variables })
      .then(({ data }) => {
        const cachedProfile = client.readQuery({
          query: BUGS,
        }) 
        
        client.writeQuery({
          query: BUGS,
          data: { 
            findManyBug: [...cachedProfile.findManyBug, data.createOneBug]
          }
        })
        setIsOpen(false);
      })
      .catch(e => console.error(e.message))
    }
  }

  return (
    <div className="new-card">
      {isOpen ? (
        <form className="new-card-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            autoComplete="off"
            onChange={handleChange}
          />
          <label htmlFor="test">
            Reporter
          </label>
          <Select
            id="test"
            name="reporter"
            onChange={value => handleChange({ target: { value, name: 'reporter' } })}
            options={options}
            isLoading={loading}
            loadingMessage="Loading..."
            noOptionsMessage={() => 'No users'}
            maxMenuHeight={200}
          />
          <div className="actions">
            <CustomButton text="Add" color="light" onClick={addCard} />
            <CustomButton text="Cancel" color="light" onClick={() => setIsOpen(false)} />
          </div>
        </form>
      ) : (
        <button
          type="button"
          className="btn create-button"
          onClick={() => setIsOpen(true)}
        >
          + Create card
        </button>
      )}
    </div>
  );
};

export default NewCardForm;
