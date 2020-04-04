import React, { Component } from "react";
import PublicNewTaskForm from "./PublicNewTaskForm";
import ProjectsTable from "./ProjectsTable";
import Notifications from "./Notifications";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import notifStyle from "./notifStyle.css";
class Dashboard extends Component {
  render() {
    const { publicTasks, notifications } = this.props;

    return (
      <div className={"mainDash"}>
        <div className="dashboard container">
          <div style={{ marginTop: "10px" }} className="row">
            <div className="col">
              <PublicNewTaskForm></PublicNewTaskForm>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <ProjectsTable tasks={publicTasks}></ProjectsTable>
            </div>
          </div>
        </div>
        <div className="notifications  ">
          <Notifications notifications={notifications}></Notifications>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    publicTasks: state.firestore.ordered.publicTasks,
    // auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "publicTasks", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 15, orderBy: ["time", "desc"] },
  ])
)(Dashboard);
