import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteAxios, deleteFile, reqAxios, waitAndRefresh } from "../../helpers/helpers";

const ModalDelete = ({ entity, showAlert }) => {
  //entity.entityType -> instance/partner/customer
  
  const deleteEntity = async () => {

    const entityDeleted = await deleteAxios(
      `/${entity.entityType}/delete/${entity.id}`
    );
    showAlert(false);
    if (entityDeleted.status === 200) {
      waitAndRefresh(entity.navigate, 1000);
      //await reqAxios("GET", "/universities/getall", "", "");
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
