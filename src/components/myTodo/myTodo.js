import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { createUserTask } from "../../store/actions/userTaskActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import TableData from "./TableData";
import { Redirect } from "react-router-dom";

class MyToDo extends Component {
  state = {
    task: "",
    until: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createUserTask(this.state);
  };

  render() {
    const { userTasks, auth, profile } = this.props;

    if (!auth.uid && auth.isLoaded) return <Redirect to="/"></Redirect>;

    return (
      <>
        <div class="container">
          <span style={{ fontSize: "25px" }}>
            Welcome <br /> {profile.firstName} {profile.lastName}
          </span>
        </div>
        <Container fluid style={{ position: "absolute", top: "50px" }}>
          <Row
            className="no-gutters mx-0"
            style={{ marginBottom: "50px", marginTop: "20px" }}
          >
            <Col>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <TextField
                  onChange={(event) => this.handleChange(event)}
                  required
                  id="task"
                  label="Description"
                />

                <TextField
                  required
                  onChange={(event) => this.handleChange(event)}
                  id="until"
                  label="Date"
                  type="date"
                  style={{ marginLeft: "15px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <IconButton type="submit">
                  <AddCircleIcon></AddCircleIcon>
                </IconButton>
              </form>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Done</th>
                      <th>Task</th>
                      <th>Date</th>
                      <th>Created Date</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableData auth={auth} tasks={userTasks}></TableData>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("yes", state);

  return {
    userTasks: state.firestore.ordered.userTasks,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    // notifications: state.firestore.ordered.notifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUserTask: (taskObj) => dispatch(createUserTask(taskObj)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "userTasks", orderBy: ["createdAt", "desc"] },
    // { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(MyToDo);
