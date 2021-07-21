import { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";

import SelectInput from "../../components/SelectInput";

function CreateAccount() {
  const [type, setType] = useState("Conta Corrente");
  const history = useHistory();

  function handleChange(event) {
    setType(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const response = await api.post("/account", { type });

      console.log(response);

      history.push(`/account/${response.data._id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Escolha seu tipo de conta:</h2>

      <SelectInput
        value={type}
        onChange={handleChange}
        items={["Conta Corrente", "Conta Poupança"]}
      />

      <button type="submit" className="btn btn-primary">
        Prosseguir
      </button>
    </form>
  );
}

export default CreateAccount;
