import React from 'react';

import { Button, Spinner } from 'reactstrap';

const CustomButton = ({ text, onClick, color, disabled, className = '', spinnerColor, loading }) => {
  return (
    <Button
      onClick={onClick}
      color={color}
      className={className}
      disabled={disabled}
    >
      {text}
      {loading && <Spinner className="ml-2" color={spinnerColor} size="sm" />}
    </Button>
  )
};

export default CustomButton;
