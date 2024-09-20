import React, { useState } from "react";
import "../../assets/styles/Modal.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Task from "../../components/Task";
function HomePage() {
  const [taskName, setTaskName] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const MySwal = withReactContent(Swal);

  const showModal = () => {
    MySwal.fire({
      title: <h4 className="text-primary">Add New Task</h4>,
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
              defaultValue={descriptionValue}
              style={{ height: "100px" }}
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
        const taskNameInput = document.getElementById("task-name").value;
        const descriptionInput = document.getElementById("description").value;

        if (!taskNameInput || !descriptionInput) {
          Swal.showValidationMessage("Please fill out both fields");
          return false;
        }

        return {
          taskName: taskNameInput,
          description: descriptionInput,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setTaskName(result.value.taskName);
        setDescriptionValue(result.value.description);

        MySwal.fire({
          title: "Task Added",
          text: `Task: ${result.value.taskName}\nDescription: ${result.value.description}`,
          icon: "success",
          confirmButtonText: "OK",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-primary", 
          },
        });
      }
    });
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2"></div>
          <div className="col-12 col-md-8">
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
                <Task name={taskName} description={descriptionValue} />
                <Task name={taskName} description={descriptionValue} />
                <Task name={taskName} description={descriptionValue} />
                <Task name={taskName} description={descriptionValue} />
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
