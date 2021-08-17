import React, { Component } from "react";
import PropTypes from "prop-types";

import { Sidebar, Topbar } from "../component";
// import Topbar from "./Topbar";
import { withStyles } from "@material-ui/core";
import { searchWallpaper } from "../redux/actions";

const styles = (theme) => ({});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSidebar: false,
      isHomePage: true,
    };
    var pagename = window.location.pathname;
    console.log("pagename", pagename);
    if (pagename == "/" || pagename == "/walzy/") {
      this.setState({
        isHomePage: true,
      });
      localStorage.setItem("isHomePage", true);
      // console.log("if-->>>>", this.state.isHomePage);
    } else {
      this.setState({
        isHomePage: false,
      });
      
      localStorage.setItem("isHomePage", false);
      // console.log("else--->>", this.state.isHomePage);
    }
  }

  handleSidebarOpen = () => {
    this.setState({ openSidebar: true }, () =>
      console.log("Main.js state is true.")
    );
  };

  handleSidebarClose = () => {
    this.setState({ openSidebar: false });
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Topbar onSidebarOpen={this.handleSidebarOpen} />
        <Sidebar
          open={this.state.openSidebar}
          onOpen={this.handleSidebarOpen}
          onClose={this.handleSidebarClose}
        />
        <main>{children}</main>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node,
};

export default withStyles(styles)(Main);
