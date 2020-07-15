import streams from "../apis/streams";
import history from "../history";

const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", {
      ...formValues,
      userId: userId,
    });

    dispatch({
      type: "CREATE_STREAM",
      payload: response.data,
    });

    history.push("/");
  };
};

const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({
      type: "DELETE_STREAM",
      payload: id,
    });
    history.push("/");
  };
};

const editStream = (id, formValues) => {
  console.log(formValues);
  return async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    console.log(response);

    dispatch({
      type: "EDIT_STREAM",
      payload: response.data,
    });

    history.push("/");
  };
};

const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
      type: "FETCH_STREAM",
      payload: response.data,
    });
  };
};

const fetchStreams = () => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/`);
    dispatch({
      type: "FETCH_STREAMS",
      payload: response.data,
    });
  };
};

export {
  signIn,
  signOut,
  createStream,
  deleteStream,
  editStream,
  fetchStream,
  fetchStreams,
};
