import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: true,
    };
  }
  componentDidMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
  }
  componentDidUpdate() {
    const task = this.props.task;
    console.log("Task", task);
    console.log("State", this.state);
    if (task !== null && this.state.id !== task.id) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    } else if (task === null && this.state.id !== "") {
      this.setState({
        id: "",
        name: "",
        status: true,
      });
    }
  }
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  onChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    if (name === "status") {
      value = event.target.value === "true" ? true : false;
    } else {
      value = event.target.value;
    }
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  };
  onClear = () => {
    this.setState({
      name: "",
      status: true,
    });
  };
  render() {
    const { id } = this.state;
    return (
      <div class="text-center col-start-1 col-end-5">
        <div class="w-full">
          <form
            class="bg-white items-center rounded-lg border border-green-400"
            onSubmit={this.onSubmit}
          >
            <h2 class=" bg-green-400 text-white text-xl font-normal py-2 relative rounded-t-lg">
              {id !== "" ? "Cập Nhật Công Việc" : "Thêm công việc"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 absolute top-2.5 right-4 cursor-pointer hover:text-red-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={this.onCloseForm}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </h2>
            <div class="py-3 px-5">
              <label class="block text-left pb-2">Tên công việc</label>
              <input
                name="name"
                class=" py-1.5 w-full bg-gray-100 px-4 outline-none"
                type="text"
                placeholder="Nhập tên công việc"
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>
            <div class="py-3 px-5 text-left">
              <label class=" block pb-2">Trạng thái</label>
              <select
                name="status"
                class="block w-full bg-gray-100 py-1.5 px-4 outline-none "
                onChange={this.onChange}
                value={this.state.status}
              >
                <option value={true}>Kích hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
            </div>
            <div class="flex justify-around py-4">
              <button
                class="bg-green-300 px-8 py-2 rounded-md border border-blue-400 hover:bg-green-400"
                type="submit"
              >
                {id !== "" ? "Cập Nhật" : "Thêm Mới"}
              </button>
              <button
                type="button"
                class="bg-red-400 px-8 py-2 rounded-md border border-purple-400 hover:bg-red-500"
                onClick={this.onClear}
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
