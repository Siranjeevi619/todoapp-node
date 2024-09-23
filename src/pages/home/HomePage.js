import React, { useEffect, useState } from "react";
import "../../assets/styles/Modal.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Task from "../../components/Task";
import TaskInputModal from "../../components/TaskInputModal";

function HomePage() {
  const taskFunctionality = "Add new Task";

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

      setModalIsOpen(false);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <TaskInputModal
          open={modalIsOpen}
          taskFunctionality={taskFunctionality}
          onClose={() => setModalIsOpen(false)}
          onAddTask={handleNewTask}
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
        />
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
                <button
                  className="btn btn-primary"
                  onClick={() => setModalIsOpen(true)}
                >
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
