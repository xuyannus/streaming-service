import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flvjs from "flv.js";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.attachPlayer();
  }

  componentDidUpdate() {
    this.attachPlayer();
  }

  componentWillUnmount() {
    if (this.player) this.player.destroy();
  }

  attachPlayer() {
    console.log(`http://localhost:8000/live/${this.props.match.params.id}.flv`);

    if (this.player || !this.props.stream) {
      return;
    }

    console.log(this.player);
    console.log(this.props.stream);

    this.player = flvjs.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${this.props.match.params.id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        <video
          id="video"
          ref={this.videoRef}
          style={{ width: "100%" }}
          controls={true}
        />
        <h1>{this.props.stream.title}</h1>
        <h3>{this.props.stream.description}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    stream: state.stream[props.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream: fetchStream })(
  StreamShow
);
