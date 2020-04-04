import React, { Component } from "react";
import {
  updateUserTask,
  updateDone,
} from "../../store/actions/userTaskActions";
import moment from "moment";
import uuid from "react-uuid";
import Button from "@material-ui/core/Button";
import { deleteUserTask } from "../../store/actions/userTaskActions";
import { connect } from "react-redux";
import Checkbox from "./Checkbox";

class TableData extends Component {
  state = {
    task: "",
    until: "",
  };

  render() {
    const { tasks } = this.props;
    const { auth } = this.props;

    const deleteHandler = (e, uid) => {
      e.preventDefault();
      this.props.deleteTask(uid);
    };

    let editButtonHandler = (spanId, doneBtnId, editBtnId) => {
      let doneIcon = document.getElementById(doneBtnId);
      doneIcon.classList.remove("hidden");
      let task = document.getElementById(spanId);
      task.contentEditable = "true";
      task.focus();
      let editBtn = document.getElementById(editBtnId);
      editBtn.classList.add("hidden");
    };

    let taskDoneBtnPressed = (editBtnId, doneBtnId, spanId, taskId, dateId) => {
      let doneIcon = document.getElementById(doneBtnId);
      doneIcon.classList.add("hidden");
      let editBtn = document.getElementById(editBtnId);
      editBtn.classList.remove("hidden");
      let span = document.getElementById(spanId);

      span.contentEditable = "false";
      let date = document.getElementById(dateId).innerText;

      let obj = { task: span.innerText, until: date }; //state asynchrous calistigi icin ilk seferinde state bos guncelliyordu. oyuzden obj de tuttum

      this.props.updateUserTask(obj, taskId);
    };

    let dateDoneBtnPressed = (
      editBtnId,
      doneBtnId,
      spanId,
      taskId,
      taskSpanId
    ) => {
      let doneIcon = document.getElementById(doneBtnId);
      doneIcon.classList.add("hidden");
      let editBtn = document.getElementById(editBtnId);
      editBtn.classList.remove("hidden");
      let span = document.getElementById(spanId);
      span.contentEditable = "false";
      let taskSpan = document.getElementById(taskSpanId).innerText;

      let obj = { task: taskSpan, until: span.innerText }; //state asynchrous calistigi icin ilk seferinde state bos guncelliyordu. oyuzden obj de tuttum

      this.props.updateUserTask(obj, taskId);
    };

    const checkboxHandler = (done, id) => {
      let updatedDone = done === true ? false : true;
      let doneObj = { done: updatedDone };

      this.props.updateDone(doneObj, id);
    };

    return (
      <>
        {tasks &&
          tasks.map((task) => {
            let taskSpanId = uuid();
            let doneBtnId = uuid();
            let editBtnId = uuid();
            let dateEditId = uuid();
            let dateDoneId = uuid();
            let dateId = uuid();
            if (task.uid === auth.uid) {
              return (
                <tr key={uuid()}>
                  <td>
                    {" "}
                    <label onClick={() => checkboxHandler(task.done, task.id)}>
                      <Checkbox checked={task.done}></Checkbox>
                      <span style={{ color: "red" }}></span>
                    </label>
                  </td>
                  <td>
                    <span
                      className={task.done === true ? "done" : null}
                      id={taskSpanId}
                    >
                      {task.task}{" "}
                    </span>

                    <i
                      id={editBtnId}
                      style={{ marginLeft: "15px" }}
                      onClick={() =>
                        editButtonHandler(taskSpanId, doneBtnId, editBtnId)
                      }
                      class={" fas fa-pencil-alt"}
                    ></i>

                    <i
                      id={doneBtnId}
                      style={{ marginLeft: "15px" }}
                      onClick={() =>
                        taskDoneBtnPressed(
                          editBtnId,
                          doneBtnId,
                          taskSpanId,
                          task.id,
                          dateId
                        )
                      }
                      class={"fas fa-check-circle hidden"}
                    ></i>
                  </td>

                  <td>
                    <span
                      className={task.done === true ? "done" : null}
                      id={dateId}
                    >
                      {" "}
                      {task.until}{" "}
                    </span>

                    <i
                      id={dateEditId}
                      onClick={() =>
                        editButtonHandler(dateId, dateDoneId, dateEditId)
                      }
                      style={{ marginLeft: "15px" }}
                      // onClick={() => editButtonHandler(taskId, doneBtnId, editBtnId)}
                      class={" fas fa-pencil-alt"}
                    ></i>

                    <i
                      id={dateDoneId}
                      style={{ marginLeft: "15px" }}
                      onClick={() =>
                        dateDoneBtnPressed(
                          dateEditId,
                          dateDoneId,
                          dateId,
                          task.id,
                          taskSpanId
                        )
                      }
                      class={"fas fa-check-circle hidden"}
                    ></i>
                  </td>

                  <td>{moment(task.createdAt.toDate()).calendar()}</td>
                  <td>
                    <Button onClick={(e) => deleteHandler(e, task.id)}>
                      <i
                        style={{ color: "red" }}
                        class="fas fa-trash-alt fa-lg"
                      ></i>
                    </Button>
                  </td>
                </tr>
              );
            }
          })}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (id) => dispatch(deleteUserTask(id)),
    updateUserTask: (taskObj, id) => dispatch(updateUserTask(taskObj, id)),
    updateDone: (doneObj, id) => dispatch(updateDone(doneObj, id)),
  };
};

export default connect(null, mapDispatchToProps)(TableData);
