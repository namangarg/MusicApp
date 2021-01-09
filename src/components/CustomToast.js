import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import "./CustomToast.css";
function CustomToast({ saved, setSaved, message, name }) {
  const [show, setShow] = useState(true);

  return (
    <div className="toastDiv">
      <Toast
        className="customToast"
        onClose={setSaved}
        show={saved}
        delay={2500}
        autohide
      >
        <Toast.Header>
          <span className="mr-auto">
            {`${name ? name.value : ""} ${message}`}{" "}
          </span>
        </Toast.Header>
      </Toast>
    </div>
  );
}

export default CustomToast;
