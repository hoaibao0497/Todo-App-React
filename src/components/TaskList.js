import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, // all : -1 , active: 1 , deactive: 0
    };
  }
  onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { taskList } = this.props;
    const { filterName, filterStatus } = this.state;
    const itemTask = taskList.map((item, index) => {
      return (
        <TaskItem
          key={item.id}
          index={index}
          task={item}
          onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
        />
      );
    });
    return (
      <table class="w-full text-left rounded-lg">
        <thead>
          <tr class="text-gray-800 border border-b-0 text-center">
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Tên</th>
            <th class="px-4 py-3">Trạng Thái</th>
            <th class="px-4 py-3">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr class="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
            <td class="px-4 py-4"></td>
            <td class="px-4 py-4">
              <input
                name="filterName"
                value={filterName}
                onChange={this.onChange}
                class=" py-1.5 w-full bg-white px-4 outline-none"
                type="text"
                placeholder="Nhập tên công việc"
              />
            </td>
            <td class="px-4 py-4">
              <select
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
                id=""
                class="block w-full bg-white py-1.5 px-4 outline-none "
              >
                <option value={-1}>Tất cả</option>
                <option value={1}>Kích hoạt</option>
                <option value={0}>Ẩn</option>
              </select>
            </td>
            <td class="px-4 py-4"></td>
          </tr>
          {itemTask}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
