import React from "react";

import "./global.css";

const chevronRight = (
  <svg
    width="5"
    height="8"
    viewBox="0 0 5 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.21211 0.787842L4.21211 3.78784C4.26837 3.8441 4.29997 3.92041 4.29997 3.99997C4.29997 4.07954 4.26837 4.15584 4.21211 4.21211L1.21211 7.21211L0.787842 6.78784L3.57571 3.99997L0.787842 1.21211L1.21211 0.787842Z"
      fill="#B5B3B1"
    />
  </svg>
);

export const CustomBreadCrumb = () => {
  const path = window.location.pathname.slice(1);

  const breadcumb = path.split("/").map(word => {
    const newWord = word.split("-").join(" ").toUpperCase();
    return newWord;
  });

  return (
    <div className="custom-breadcumb-container">
      <div className="custom-breadcumb">
        <a href="/">
          <span>INÍCIO</span>
        </a>
      </div>

      {breadcumb.map(word => {
        return (
          <div key={word} className="custom-breadcumb">
            {chevronRight}
            <span>{word}</span>
          </div>
        );
      })}
    </div>
  );
};
