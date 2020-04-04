import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import Hamburger from "./Hamburger";
import { connect } from "react-redux";
import style from "./Navbar.css";

function Navbar(props) {
  const { auth } = props;
  const links = auth.uid ? (
    <SignedInLinks></SignedInLinks>
  ) : (
    <SignedOutLinks></SignedOutLinks>
  );
  return (
    <div>
      <Hamburger id="burger" auth={auth}></Hamburger>
      <nav class="transparent">
        <div class="nav-wrapper   ">
          <a href="/" class="brand-logo center">
            ToDo List App
          </a>

          <ul className="right hide-on-med-and-down right " id="mobile-demo">
            {auth.isLoaded && links}
          </ul>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("state", state);

  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

export default connect(mapStateToProps, null)(Navbar);
