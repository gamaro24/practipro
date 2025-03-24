import React from "react";
import { Button, Modal } from "react-bootstrap";
import { reqAxios, waitAndRefresh } from "../../helpers/helpers";

const ModalSign = ({ entity, showAlertSign }) => {

  //debo pasar si es profesor o supervisor
  const signEntity = async () => {
    const entitySign = await reqAxios(
      "PUT",
      `/${entity.entityType}/sign/${entity.id}?roleId=${entity.roleId}`,
      null,
      null
    );
    showAlertSign(false);
    if (entitySign.status === 200) {
      waitAndRefresh("/assist", 1000);
    }
  };

  return (
    <>
      <Modal show={true} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>
            ¿Desea firmar esta asistencia<strong>{entity.entityName}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showAlertSign(false)}>
            Cerrar
          </Button>
          <Button variant="success" onClick={signEntity}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalSign;
