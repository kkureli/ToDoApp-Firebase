import React from "react";
import { slide as Menu } from "react-burger-menu";
import style from "./Hamburger.css";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { NavLink } from "react-router-dom";
import HomeLink from "./HomeLink";
export default class Hamburger extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    const { auth } = this.props;

    const links = auth.isEmpty ? (
      <SignedOutLinks></SignedOutLinks>
    ) : (
      <SignedInLinks></SignedInLinks>
    );
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu id="hamburger">
        <HomeLink></HomeLink>
        {links}
      </Menu>
    );
  }
}
