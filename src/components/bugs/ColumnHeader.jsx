import React from 'react';

import NewCardForm from 'src/components/bugs/NewCardForm';

const ColumnHeader = ({ title, cards, status }) => {

  return (
    <div className="column-header-container">
      <div className="column-header">
        <span className="title mr-1">{title}</span>
        <span className="counter">{cards.length}</span>
      </div>
      <NewCardForm status={status} />
    </div>
  );
};

export default ColumnHeader;
