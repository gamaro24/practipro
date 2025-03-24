import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteAxios, reqAxios, waitAndRefresh } from "../../helpers/helpers";

const ModalDelete = ({ entity, showAlert }) => {
  
  const deleteEntity = async () => {
    try {
      const entityDeleted = await deleteAxios(
        `/${entity.entityType}/delete/${entity.id}`
      );
  
      showAlert(false); // Close modal even if there’s an error
      if (entityDeleted?.status === 200) {
        waitAndRefresh(entity.navigate, 1000);
      }
    } catch (error) {
      console.error("Error deleting entity:", error);
      showAlert(false); // Ensure modal closes on failure
    }
  };

  return (
    <>
      <Modal show={true} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>
            ¿Desea eliminar <strong>{entity.entityName}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showAlert(false)}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={deleteEntity}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDelete;
