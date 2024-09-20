// src/components/Task.js
import React, { useState } from "react";
import "../assets/styles/Task.css";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TaskDetails from "../components/TaskDetails";
import TaskActions from "../components/TaskAction";
import TaskModal from "../components/TaskModal";

const MySwal = withReactContent(Swal);

function Task() {
  const [taskName, setTaskName] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleSuccess = () => {
    toast.success("Task completed successfully");
  };

  const handleEdit = () => {
    TaskModal(MySwal, taskName, descriptionValue).then((result) => {
      if (result.isConfirmed) {
        setTaskName(result.value.taskName);
        setDescriptionValue(result.value.description);

        MySwal.fire({
          title: "Task Updated",
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
    toast("Editing task...");
  };

  const handleRemove = () => {
    toast.error("Task removed");
  };

  return (
    <div className="card mb-3 shadow-sm border border-dark-subtle">
      <Toaster />
      <div className="row g-0">
        <TaskDetails taskName={taskName} description={descriptionValue} />
        <TaskActions
          onEdit={handleEdit}
          onSuccess={handleSuccess}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}

export default Task;
