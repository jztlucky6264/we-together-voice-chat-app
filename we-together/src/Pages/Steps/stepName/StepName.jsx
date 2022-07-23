import React from "react";

const StepName = ({ onNext }) => {
  return (
    <>
      <div>Name Component</div>
      <button onClick={onNext}>Next</button>
    </>
  );
};

export default StepName;
