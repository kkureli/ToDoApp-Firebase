import React from "react";
import moment from "moment";
import uuid from "react-uuid";

const TableData = props => {
  const { tasks } = props;

  return (
    <>
      {tasks &&
        tasks.map(task => {
          return (
            <tr key={uuid()}>
              <td>{task.task}</td>
              <td>{task.until}</td>
              <td>{task.name}</td>
              <td>{moment(task.createdAt.toDate()).calendar()}</td>
            </tr>
          );
        })}
    </>
  );
};

export default TableData;
