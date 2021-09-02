import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sort: {
        by: "name",
        value: 1,
      },
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      this.setState({
        tasks: JSON.parse(localStorage.getItem("tasks")),
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return (
      this.s4() +
      this.s4() +
      "_" +
      this.s4() +
      this.s4() +
      "_" +
      this.s4() +
      this.s4()
    );
  }
  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };
  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };
  onSubmit = (data) => {
    const { tasks } = this.state;
    if (data.id === "") {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      const index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  onUpdateStatus = (id) => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };
  findIndex = (id) => {
    const { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };
  onDelete = (id) => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
        isDisplayForm: false,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };
  onUpdate = (id) => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    const taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });
    this.onShowForm();

    // console.log(taskEditing);
  };
  onFilter = (filterName, filterStatus) => {
    filterStatus = +filterStatus;
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };
  onSearch = (keyword) => {
    console.log(keyword);
    this.setState({
      keyword: keyword,
    });
    // console.log(this.state);
  };
  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
  };
  render() {
    let { tasks, isDisplayForm, taskEditing, filter, keyword, sort } =
      this.state;
    const eleTaskForm = isDisplayForm ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    if (sort.by === "name") {
      tasks.sort((a, b) => {
        let result = a.name.toString().localeCompare(b.name.toString());
        if (result === 1) return sort.value;
        else if (result === -1) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status < b.status) return sort.value;
        else if (a.status > b.status) return -sort.value;
        else return 0;
      });
    }

    return (
      <div class="container mx-auto">
        <h1 class="text-4xl text-center font-semibold py-4 border-b-2">
          Quản lý công việc
        </h1>
        <div class="grid grid-cols-12 gap-10 m-4">
          {eleTaskForm}
          <div
            className={
              isDisplayForm
                ? "text-center col-end-13 col-span-8 rounded-lg shadow-lg border border-gray-200"
                : "text-center col-end-13 col-span-12 rounded-lg shadow-lg border border-gray-200"
            }
          >
            <div class="text-left pb-2 ml-6 mt-5">
              <button
                class="bg-green-400 py-2 px-10 rounded-md text-white hover:bg-green-500"
                onClick={() => {
                  this.onToggleForm();
                }}
              >
                Thêm công việc
              </button>
            </div>
            <Control onSearch={this.onSearch} onSort={this.onSort} />
            <div class="bg-white rounded-lg py-6">
              <div class="block overflow-x-auto mx-6">
                <TaskList
                  taskList={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
