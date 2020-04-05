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
    const { publicTasks, notifications, auth } = this.props;
    let warning = auth.isEmpty ? (
      <p style={{ color: "pink" }}>
        For personal ToDo App usage please
        <a href="/signup">
          <span style={{ color: "blue" }}> signup </span>
        </a>
        or
        <a href="/login">
          <span style={{ color: "blue" }}> login</span>
        </a>
      </p>
    ) : (
      <p style={{ color: "pink" }}>
        For personal ToDo App usage please go to
        <a href="/mytodo">
          <span style={{ color: "blue" }}> myTodo</span>
        </a>
      </p>
    );

    return (
      <div className={"mainDash"}>
        <div className="dashboard container">
          <p className="mt-4 mb-0 pb-0" style={{ color: "pink" }}></p>
          <div style={{ marginTop: "0px", paddingTop: "0" }} className="row">
            <div className="col">
              {auth.isLoaded && warning}
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
    auth: state.firebase.auth,
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
