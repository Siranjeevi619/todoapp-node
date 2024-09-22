import React from "react";

function TaskDetails({ taskName, description }) {
  return (
    <div className="col-md-7 col-12 d-flex align-items-center p-3">
      <div className="my-md-3 my-1">
        <p className="h3 mb-md-2 mb-1 fw-light m-0 mx-auto text-center text-md-start">
          {taskName ? taskName : "Make a coffee"}
        </p>
        <p>
          {description
            ? description
            : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
        </p>
      </div>
    </div>
  );
}

export default TaskDetails;
