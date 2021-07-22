import { useState, useEffect } from "react";

import api from "../../apis/api";

import ProfileForm from "./ProfileForm";

function EditProfile(props) {
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

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/profile");

        const addressObj = { ...response.data.address };
        delete response.data.address;
        delete addressObj._id;

        const date = new Date(response.data.birthDate);

        setState({
          ...response.data,
          ...addressObj,
          stateOrProvince: addressObj.state,
          birthDate: `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`,
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

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

      const response = await api.put("/profile", {
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
      props.history.push("/profile");
    } catch (err) {
      console.error(err.response);
      setError(err.response.data.error);
    }
  }

  return (
    <div className="container mt-5">
      <h1>Editar Perfil</h1>
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

export default EditProfile;
