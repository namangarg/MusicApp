import React from "react";
import { Modal, Button } from "react-bootstrap";

function CustomModal({ show }) {
  return (
    <Modal
      show={show}
      backdrop="static"
      className="modalcustom"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Playlists</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalCustomBody">
        <div className="customDiv">
          <input placeholder="Name" />
          <input placeholder="Description" />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
