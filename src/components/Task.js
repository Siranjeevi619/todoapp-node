import React, { useState } from "react";
import "../assets/styles/Task.css";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TaskDetails from "./TaskDetails";
import TaskActions from "./TaskAction";
import TaskInputModal from "./TaskInputModal";

const MySwal = withReactContent(Swal);

function Task(props) {
  const taskFunctionality = {
    func:
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskName, setTaskName] = useState(props.name || "");
  const [descriptionValue, setTaskDescription] = useState(
    props.description || ""
  );

  const handleSuccess = () => {
    toast.success("Task completed successfully");
  };

  const handleEdit = () => {
    setModalIsOpen(true);
  };

  const addNewTask = async () => {
    if (taskName === "" || descriptionValue === "") {
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
        descriptionValue,
      };
      const taskId = props.id;
      const response = await fetch(`http://localhost:9000/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update Task");
      }

      const updatedTaskResponse = await response.json();
      console.log(updatedTaskResponse.status);
      toast.success("task update successfully");
      setModalIsOpen(false);
    } catch (e) {
      toast.error(e.message);
      console.log(e.message);
    }
  };

  const handleRemove = () => {
    toast.error("Task removed");
  };

  return (
    <div className="card mb-3 shadow-sm border border-dark-subtle">
      <Toaster />
      <TaskInputModal
        open={modalIsOpen}
        taskFunctionality={taskFunctionality}
        onClose={() => setModalIsOpen(false)}
        addNewTask={addNewTask}
        taskName={taskName}
        taskDescription={descriptionValue}
        setTaskName={setTaskName}
        setTaskDescription={setTaskDescription}
      />
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
