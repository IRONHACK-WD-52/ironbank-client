import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../apis/api";

function Profile() {
  const [state, setState] = useState({
    name: "",
    email: "",
    profilePictureUrl: "",
    address: {
      street: "",
      neighbourhood: "",
      city: "",
      state: "",
      postalCode: "",
      number: "",
    },
    profession: "",
    maritalStatus: "",
    birthDate: "",
    phoneNumber: "",
    document: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/profile");

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  function formatDate(date) {
    const dateObj = new Date(date);

    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div>
      <Link className="btn btn-primary" to="/profile/edit">
        Editar Perfil
      </Link>

      <h1>Perfil</h1>
      <hr />

      <img
        className="img-fluid rounded-circle"
        src={state.profilePictureUrl}
        alt="Sua foto de perfil"
      />

      <p>
        <strong>Nome: </strong>
        {state.name}
      </p>
      <p>
        <strong>E-mail: </strong>
        {state.email}
      </p>

      <h3>Endereço</h3>
      <hr />

      <p>
        <strong>Rua: </strong>
        {state.address.street}
      </p>
      <p>
        <strong>Número: </strong>
        {state.address.number}
      </p>
      <p>
        <strong>Bairro: </strong>
        {state.address.neighbourhood}
      </p>
      <p>
        <strong>Cidade: </strong>
        {state.address.city}
      </p>
      <p>
        <strong>Estado: </strong>
        {state.address.state}
      </p>
      <p>
        <strong>CEP: </strong>
        {state.address.postalCode}
      </p>

      <h3>Informações Pessoais</h3>
      <hr />

      <p>
        <strong>Profissão: </strong>
        {state.profession}
      </p>
      <p>
        <strong>Estado Civil: </strong>
        {state.maritalStatus}
      </p>
      <p>
        <strong>Data de Nascimento: </strong>
        {formatDate(state.birthDate)}
      </p>
      <p>
        <strong>Telefone: </strong>
        {state.phoneNumber}
      </p>
      <p>
        <strong>CPF: </strong>
        {state.document}
      </p>

      <Link className="btn btn-lg btn-primary" to="/account/create">
        Abra sua conta
      </Link>
    </div>
  );
}

export default Profile;
