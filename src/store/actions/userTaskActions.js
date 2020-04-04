export const createUserTask = taskObj => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const authorId = getState().firebase.auth.uid;

    const firestore = getFirestore();
    firestore
      .collection("userTasks")
      .add({
        ...taskObj, ///project.title ve project.content demek ile ayni sey (spread operator kullanmak)
        createdAt: new Date(),
        uid: authorId,
        done: false
      })
      .then(() => {
        dispatch({ type: "CREATE_USER_TASK", taskObj });
      })
      .catch(err => {
        dispatch({ type: "CREATE_USER_TASK_ERROR", err });
      });
  };
};

export const deleteUserTask = id => {
  console.log("dispatch", id);
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("userTasks")
      .doc(id)
      .delete()
      .then(() => {
        console.log("deleted");
        dispatch({ type: "DELETE_PROJECT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "DELETE_PROJECT_ERROR" });
      });
  };
};
export const updateUserTask = (taskObj, taskId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("userTasks")
      .doc(taskId)
      .update(taskObj)
      .then(() => {
        console.log("updated");
        dispatch({ type: "UPDATE_PROJECT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_PROJECT_ERROR" });
      });
  };
};
export const updateDone = (doneObj, taskId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("userTasks")
      .doc(taskId)
      .update(doneObj)
      .then(() => {
        console.log("updated");
        dispatch({ type: "UPDATE_PROJECT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_PROJECT_ERROR" });
      });
  };
};
