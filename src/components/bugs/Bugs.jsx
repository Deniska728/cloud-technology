import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Board, { moveCard } from '@lourenci/react-kanban';

import BugCard from 'src/components/bugs/BugCard';
import ColumnHeader from 'src/components/bugs/ColumnHeader';

import { BUGS } from 'src/graphql/queries/findManyBugs';
import { UPDATE_BUG } from 'src/graphql/mutations/updateOneBug';

import initialBoard from 'src/utils/initialBoard';

const Bugs = () => {
  const { data, loading } = useQuery(BUGS);
  const [updateOneBug] = useMutation(UPDATE_BUG);
  const [controlledBoard, setBoard] = useState(initialBoard);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    if (source.fromColumnId !== destination.toColumnId) {
      const currentColumn = controlledBoard.columns.find(col => (
        col.id === destination.toColumnId
      ));

      const variables = {
        data: {
          status: currentColumn.status
        },
        where: {
          id: _card.id
        }
      }

      updateOneBug({ variables })
      .catch(e => console.error(e.message));
    }
    setBoard(updatedBoard);
  }

  useEffect(() => {
    if (!loading) {
      const boardData = initialBoard.columns.map(col => ({
        ...col,
        cards: data.findManyBug
          .filter(bug => bug.status === col.status)
          .map(bug => ({
            ...bug,
            description: bug.content
          }))
      }))

      setBoard({ columns: boardData });
    }
  }, [loading, data])

  return (
    <div className="board">
      <Board
        onCardDragEnd={handleCardMove}
        renderCard={(card, { dragging }) => <BugCard dragging={dragging} card={card} />}
        renderColumnHeader={ColumnHeader}
        disableColumnDrag
      >
        {controlledBoard}
      </Board>
    </div>
  );
};

export default Bugs;
