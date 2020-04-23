import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Input } from 'reactstrap';

import CustomButton from 'src/components/common/CustomButton';

import { UPDATE_BUG } from 'src/graphql/mutations/updateOneBug';

const UpdateTextField = ({ id, text, name, onChange, initialValue, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateOneBug] = useMutation(UPDATE_BUG);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => {
    onChange({ target: { name, value: initialValue } });
    toggle();
  };
  const handleUpdate = ({ value, name }) => {
    if (name === 'title' && !value) {
      return alert('Enter a title');
    }

    const variables = {
      data: {
        [name]: value,
      },
      where: {
        id,
      },
    };

    updateOneBug({ variables })
    .catch(e => console.error(e.message))
    .finally(() => toggle());
  };

  return (
    <div className={className}>
      {isOpen ? (
        <div className="input-container">
          <Input
            autoFocus
            type={name === 'content' ? 'textarea' : 'text'}
            name={name}
            value={text}
            onChange={onChange}
          />
          <CustomButton
            text="Update"
            color="light"
            className="update"
            onClick={() => handleUpdate({ value: text, name })}
          />
          <CustomButton color="light" text="Cancel" className="cancel" onClick={close} />
        </div>
      ) : (
        <div className="input-container text" onClick={toggle}>
          <span>
            {text || 'Add a description...'}
          </span>
        </div>
      )}
    </div>
  )
};

export default UpdateTextField;
