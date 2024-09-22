import React, { useEffect, useState } from "react";
import "../../assets/styles/Modal.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Task from "../../components/Task";

function HomePage() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetch("http://localhost:9000/task/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tasks.");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data.allTask);
      })
      .catch((e) => {
        console.error("Error fetching tasks:", e.message);
      });
  }, []);

  const handleNewTask = async () => {
    // Validate fields
    if (taskName === "" || taskDescription === "") {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out both fields!",
      });
      return;
    }

    try {
      const data = {
        taskName,
        taskDescription,
      };
      const response = await fetch("http://localhost:9000/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add task.");
      }

      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);

      setTaskName("");
      setTaskDescription("");

      MySwal.fire({
        title: "Task Added",
        text: `Task: ${newTask.taskName}\nDescription: ${newTask.taskDescription}`,
        icon: "success",
        confirmButtonText: "OK",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const showModal = () => {
    MySwal.fire({
      title: <p className="h2 text-primary">Add New Task</p>,
      html: (
        <div className="container">
          <div className="form-floating mb-3">
            <input
              type="text"
              id="task-name"
              className="form-control"
              placeholder="Task Name"
              defaultValue={taskName}
            />
            <label htmlFor="task-name">Task Name</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              id="description"
              className="form-control"
              placeholder="Task Description"
              defaultValue={taskDescription}
              style={{ height: "120px" }}
            />
            <label htmlFor="description">Description</label>
          </div>
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: "Add Task",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger mx-2",
        actions: "my-2 d-flex justify-content-center",
      },
      preConfirm: () => {
        // Fetch input values directly from the modal
        const taskNameValue = document.getElementById("task-name").value.trim();
        const taskDescriptionValue = document
          .getElementById("description")
          .value.trim();

        if (taskNameValue === "" || taskDescriptionValue === "") {
          Swal.showValidationMessage("Please fill out both fields");
          return false;
        }

        // Update the state with the values obtained
        setTaskName(taskNameValue);
        setTaskDescription(taskDescriptionValue);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleNewTask();
      }
    });
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2"></div>
          <div className="col-12 col-lg-8">
            <div className="text-center my-md-4 my-3">
              <h2>Hello Steve</h2>
              <p className="text-center">
                Push yourself with{" "}
                <span className="text-primary">consistency</span>
              </p>
              <div className="text-center text-md-end">
                <button className="btn btn-primary" onClick={showModal}>
                  Add Task <i className="bi bi-plus fw-bold"></i>
                </button>
              </div>
              <div className="my-md-2 my-1">
                {tasks.map((task) => (
                  <Task
                    key={task._id}
                    name={task.taskName}
                    description={task.taskDescription}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2 mt-5"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
