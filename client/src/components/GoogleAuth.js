import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions/index";

const GOOGLE_CREDENTIAL =
  "279881074725-n6hdcc9ueh8v4p2929ld0fha6gid460r.apps.googleusercontent.com";
const GOOGLE_SCOPE = "email profile";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: GOOGLE_CREDENTIAL,
          scope: GOOGLE_SCOPE,
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  toSignIn = () => {
    this.auth.signIn();
  };

  toSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.signedIn === null) {
      return null;
    } else if (this.props.signedIn) {
      return (
        <button onClick={this.toSignOut} className="ui red button google">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.toSignIn} className="ui red button google">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
