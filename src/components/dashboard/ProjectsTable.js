import React from "react";
import Table from "react-bootstrap/Table";
import TableData from "./TableData.js";
export default function componentName(props) {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Task</th>
            <th>Until</th>
            <th>User Name</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          <TableData tasks={props.tasks}></TableData>
        </tbody>
      </Table>
    </>
  );
}
