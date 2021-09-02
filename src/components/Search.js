import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };
  render() {
    let { keyword } = this.state;
    return (
      <>
        <input
          name="keyword"
          value={keyword}
          onChange={this.onChange}
          type="text"
          class=" py-1.5 bg-gray-100 px-4 outline-none w-1/2 rounded-l-lg focus:shadow"
          placeholder="Nhập từ khoá..."
        />
        <label
          type="button"
          onClick={this.onSearch}
          class="bg-green-300 px-2 py-1.5 rounded-r-lg border border-white text-white hover:bg-green-400"
        >
          Tìm kiếm
        </label>
      </>
    );
  }
}

export default Search;
