import React from "react";

function TaskActions({ onEdit, onSuccess, onRemove }) {
  return (
    <div className="col-md-5 col-12 bg-white d-flex justify-content-around align-items-center p-md-2 pb-2">
      <button
        className="btn btn-success btn-sm"
        onClick={onSuccess}
        aria-label="Mark task as done"
      >
        Done <i className="bi bi-check-circle"></i>
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={onEdit}
        aria-label="Edit task"
      >
        Edit <i className="bi bi-pencil"></i>
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={onRemove}
        aria-label="Remove task"
      >
        Remove <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}

export default TaskActions;
