import React, { Component } from "react";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };
  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  };
  render() {
    const { task, index } = this.props;
    return (
      <tr class="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
        <td class="px-4 py-4">{index + 1}</td>
        <td class="px-4 py-4">{task.name}</td>
        <td class="px-4 py-4 text-center">
          <span
            className={
              task.status === true
                ? "text-sm bg-green-500 text-white rounded-full px-2 py-1 text-center"
                : "text-sm bg-red-500 text-white rounded-full px-2 py-1 text-center"
            }
            onClick={this.onUpdateStatus}
          >
            {task.status === true ? "Kích Hoạt" : "Ẩn"}
          </span>
        </td>
        <td class="text-center px-3 py-4 flex justify-center gap-5">
          <a href="#">
            <svg
              onClick={this.onUpdate}
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={this.onDelete}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
