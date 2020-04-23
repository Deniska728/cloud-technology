import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { Card, CardBody, CardHeader, DropdownItem } from 'reactstrap';

import { DELETE_BUG } from 'src/graphql/mutations/deleteOneBug';
import { BUGS } from 'src/graphql/queries/findManyBugs';

const BugCard = ({ card }) => {
  const [deleteOneBug, { loading }] = useMutation(DELETE_BUG);
  const history = useHistory();
  const client = useApolloClient();
  const { content, id, title, asignee } = card;

  const removeCard = id => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete a card?')) {
      deleteOneBug({
        variables: {
          where: {
            id,
          }
        }
      })
      .then(({ data }) => {
        const cachedProfile = client.readQuery({
          query: BUGS,
        })

        client.writeQuery({
          query: BUGS,
          data: { 
            findManyBug: cachedProfile.findManyBug.filter(bug => bug.id !== data.deleteOneBug.id)
          }
        })
      })
    }
  }

  return (
    <Card className="card">
      <div className="content-container" onClick={() => history.push(`/bugs/${id}`)}>
        <CardHeader className="title-container">
            {title}
        </CardHeader>
        <CardBody>
          <p className="description">
            {content || 'No description'}
          </p>
          <DropdownItem divider />
          <div className="d-flex justify-content-between flex-wrap footer-description">
            <span>Assignee: </span>
            <span>{asignee ? asignee.username : 'Unassigned'}</span>
          </div>
        </CardBody>
      </div>
      <button
        disabled={loading}
        className="remove-card-btn"
        type="button"
        onClick={() => removeCard(id)}
      >
        <div className="delete">
          <span />
          <span />
        </div>
      </button>
    </Card>
  );
};

export default BugCard
