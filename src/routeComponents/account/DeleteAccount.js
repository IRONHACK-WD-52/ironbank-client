import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import api from "../../apis/api";

function DeleteAccount() {
  const [show, setShow] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  function handleClose() {
    setShow(false);
    history.goBack(); // Volta para a página anterior
  }

  async function handleDelete() {
    try {
      const response = await api.delete(`/account/${id}`);

      history.push(`/profile`);
    } catch (err) {
      console.error(err.response.data);
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Encerrar sua conta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja encerrar sua conta? Essa operação é irreversível.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Encerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAccount;
