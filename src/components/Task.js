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
    func: "update task",
    btnValue: "update",
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
    console.log(props);

    console.log("edit button clicked");
    setModalIsOpen(true);
  };

  const onAddTask = async () => {
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
        taskDescription: descriptionValue, 
      };

      const taskId = props.id; 
      const putUrl = `http://localhost:9000/task/${taskId}`; 
      console.log("PUT URL:", putUrl);
      console.log("Data sent:", data);

      const response = await fetch(putUrl, {
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
      console.log("Updated task response:", updatedTaskResponse); 
      toast.success("Task updated successfully");
      setModalIsOpen(false);
    } catch (e) {
      toast.error(e.message);
      console.log("Error:", e.message);
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
        addNewTask={onAddTask}
        onClose={() => setModalIsOpen(false)}
        taskName={taskName}
        taskFunctionality={taskFunctionality.func}
        btnValue={taskFunctionality.btnValue}
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
