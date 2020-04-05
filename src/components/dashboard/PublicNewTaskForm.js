import React, { Component } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { createPublicTask } from "../../store/actions/publicTaskActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import style from "./style.module.css";
export class PublicNewTaskForm extends Component {
  state = {
    task: "",
    until: "",
    name: "Anonymous",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createPublicTask(this.state);
  };

  render() {
    return (
      <form style={{ marginTop: "0" }} onSubmit={(e) => this.handleSubmit(e)}>
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
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className={style.nameField}
          required
          onChange={(event) => this.handleChange(event)}
          label="Name"
          id="name"
          defaultValue="Anonymous"
        />
        <IconButton type="submit">
          <AddCircleIcon></AddCircleIcon>
        </IconButton>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPublicTask: (taskObj) => dispatch(createPublicTask(taskObj)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  PublicNewTaskForm
);
