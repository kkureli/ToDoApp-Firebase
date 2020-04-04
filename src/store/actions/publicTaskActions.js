export const createPublicTask = taskObj => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database

    const firestore = getFirestore();
    firestore
      .collection("publicTasks")
      .add({
        ...taskObj, ///project.title ve project.content demek ile ayni sey (spread operator kullanmak)
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_PUBLIC_TASK", taskObj });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PUBLIC_TASK_ERROR", err });
      });
  };
};
