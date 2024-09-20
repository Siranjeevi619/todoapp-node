// src/components/TaskModal.js
import React from "react";
import Swal from "sweetalert2";
function TaskModal(MySwal, taskName, descriptionValue) {
  return MySwal.fire({
    title: <h4 className="text-primary">Edit Task</h4>,
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
    confirmButtonText: "Save Changes",
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
  });
}

export default TaskModal;
