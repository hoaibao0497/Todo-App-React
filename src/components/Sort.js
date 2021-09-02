import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: "name",
        value: 1,
      },
    };
  }
  onClick = async (sortBy, sortValue) => {
    await this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
    this.props.onSort(sortBy, sortValue);
  };

  render() {
    let { sort } = this.state;
    return (
      <>
        <button class="bg-green-300 px-14 py-1.5 ml-20  rounded-md text-white border border-white hover:bg-green-400 group relative">
          Sắp xếp
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 inline-block pl-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>
          <div class="absolute top-10 right-0 bg-green-300 border border-black-500 rounded-md cursor-pointer group-focus:block w-full hidden">
            <div
              onClick={() => {
                this.onClick("name", 1);
              }}
              className={
                sort.by === "name" && sort.value === 1
                  ? " bg-green-400  px-3"
                  : "bg-green-300 "
              }
            >
              Tên A-Z
            </div>
            <div
              onClick={() => {
                this.onClick("name", -1);
              }}
              className={
                sort.by === "name" && sort.value === -1
                  ? " bg-green-400 px-3"
                  : "bg-green-300"
              }
            >
              Tên Z-A
            </div>
            <hr />
            <div
              onClick={() => {
                this.onClick("status", 1);
              }}
              className={
                sort.by === "status" && sort.value === 1
                  ? " bg-green-400 px-3"
                  : "bg-green-300 "
              }
            >
              {" "}
              Trạng Thái Kích Hoạt
            </div>
            <div
              onClick={() => {
                this.onClick("status", -1);
              }}
              className={
                sort.by === "status" && sort.value === -1
                  ? " bg-green-400 px-3"
                  : "bg-green-300 "
              }
            >
              Trạng Thái Ẩn
            </div>
          </div>
        </button>
      </>
    );
  }
}

export default Sort;
