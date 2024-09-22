import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const showTaskModal = ({ taskId, onUpdate }) => {
  let taskName = "";
  let taskDescription = "";

  MySwal.fire({
    title: <h4 className="text-primary">Edit Task</h4>,
    html: (
      <div className="container">
        <div className="form-floating mb-3">
          <input
            type="text"
            id="task-name"
            className="form-control"
            placeholder="Task Name"
            onChange={(e) => (taskName = e.target.value)}
            defaultValue={taskName}
            required
          />
          <label htmlFor="task-name">Task Name</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            id="description"
            className="form-control"
            placeholder="Task Description"
            onChange={(e) => (taskDescription = e.target.value)}
            defaultValue={taskDescription}
            style={{ height: "100px" }}
            required
          />
          <label htmlFor="description">Description</label>
        </div>
      </div>
    ),
    showCancelButton: true,
    confirmButtonText: "Save Changes",
    cancelButtonText: "Cancel",
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2",
      actions: "my-2 d-flex justify-content-center",
    },
    preConfirm: () => {
      taskName = document.getElementById("task-name").value;
      taskDescription = document.getElementById("description").value;

      if (!taskName || !taskDescription) {
        Swal.showValidationMessage("Please fill out both fields");
        return false;
      }

      return handleUpdateRequest();
    },
  });
};

function TaskModal({ taskId, setIsModalVisible, setTasks }) {
  const handleUpdate = () => {
    setIsModalVisible(false);
    fetch("http://localhost:9000/task/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data.allTask || []);
      })
      .catch((e) => {
        console.error("Error fetching tasks:", e.message);
      });
  };

  useEffect(() => {
    showTaskModal({ taskId, onUpdate: handleUpdate });
  }, [taskId, handleUpdate]); 

  return null;
}

export default TaskModal;
