import React from "react";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  getActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  getContent() {
    if (this.props.stream) {
      return "Are you sure to delete this stream: " + this.props.stream.title;
    }
    return "Are you sure to delete this stream?";
  }

  OnDismiss() {
    history.push("/");
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.getContent()}
        actions={this.getActions()}
        OnDismiss={this.OnDismiss}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return { stream: state.stream[props.match.params.id] };
};

export default connect(mapStateToProps, {
  deleteStream: deleteStream,
  fetchStream: fetchStream,
})(StreamDelete);
