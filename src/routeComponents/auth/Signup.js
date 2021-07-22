import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";

import ProfileForm from "./ProfileForm";

function Signup(props) {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    street: "",
    neighbourhood: "",
    city: "",
    stateOrProvince: "",
    postalCode: "",
    number: "",
    profession: "",
    maritalStatus: "",
    birthDate: "",
    phoneNumber: "",
    document: "",
  });
  const [error, setError] = useState(null);

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const {
        street,
        neighbourhood,
        city,
        stateOrProvince,
        postalCode,
        number,
      } = state;

      const response = await api.post("/signup", {
        ...state,
        address: {
          street,
          neighbourhood,
          city,
          state: stateOrProvince,
          postalCode,
          number,
        },
      });
      setError(null);
      props.history.push("/auth/login");
    } catch (err) {
      console.error(err.response);
      setError(err.response.data.error);
    }
  }

  return (
    <div className="container mt-5">
      <h1>Cadastre-se</h1>
      <ProfileForm
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        location={props.location}
      />
    </div>
  );
}

export default Signup;
