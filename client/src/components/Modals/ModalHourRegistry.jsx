import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteAxios, deleteFile, reqAxios, waitAndRefresh } from "../../helpers/helpers";

const ModalHourRegistry = ({ entity, showAlertRegistry }) => {

  const registerEntity = async () => {

    const entityRegistry = await reqAxios(
      "POST",
      `/${entity.entityType}/create/${entity.id}`,
      {userId: entity.userId,
       hourId: entity.id  
      },
      null
    );
    showAlertRegistry(false);
    if (entityRegistry.status === 200) {
      waitAndRefresh("/", 1000);
    }
  };

  return (
    <>
      <Modal show={true} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>
            ¿Desea registrarse a esta hora <strong>{entity.entityName}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showAlertRegistry(false)}>
            Cerrar
          </Button>
          <Button variant="success" onClick={registerEntity}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalHourRegistry;
