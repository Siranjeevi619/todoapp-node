import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TaskInputModal = (props) => {
  const {
    open,
    onClose,
    onAddTask,
    taskName,
    setTaskName,
    taskDescription,
    setTaskDescription,
    taskFunctionality,
  } = props;

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        contentLabel="Add New Task"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "500px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <div>
          <div className="container my-3">
            <p className="h4 text-center text-primary my-2">
              {taskFunctionality}
            </p>
            <form>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="task-name"
                  className="form-control w-100"
                  placeholder="Task Name"
                  onChange={(e) => setTaskName(e.target.value)}
                  value={taskName}
                  required
                />
                <label htmlFor="task-name">Task Name</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="Task Description"
                  onChange={(e) => setTaskDescription(e.target.value)}
                  value={taskDescription}
                  style={{ height: "100px" }}
                  required
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary me-2 shadow-sm"
                  onClick={onAddTask}
                >
                  Add Task
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskInputModal;
