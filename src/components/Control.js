import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

class Control extends Component {
  render() {
    return (
      <div class=" flex justify-start items-center mx-6 mt-4 ">
        <Search onSearch={this.props.onSearch} />
        <Sort onSort={this.props.onSort} />
      </div>
    );
  }
}

export default Control;
