import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalQr = ({ children, onClose }) => {
  return (
          <Modal show={true} backdrop="static" centered>
            <Modal.Header>
              <Modal.Title>
                QR CODE
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {children}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
  );
};

export default ModalQr;
