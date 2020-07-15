import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    return (
      <div>
        <h3>Edit a Stream:</h3>
        <StreamForm
          initialValues={
            this.props.stream &&
            _.pick(this.props.stream, "title", "description")
          }
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    stream: state.stream[props.match.params.id],
  };
};

export default connect(mapStateToProps, {
  editStream: editStream,
  fetchStream: fetchStream,
})(StreamEdit);
