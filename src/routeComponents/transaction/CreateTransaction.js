import { useState } from "react";
import { useHistory, useParams } from "react-router";

import api from "../../apis/api";

import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";

function CreateTransaction() {
  const [state, setState] = useState({
    amount: 0,
    receiver: "",
    type: "Transferência",
  });

  const { accountId } = useParams();
  const history = useHistory();

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const profileResponse = await api.get("/profile");

      const response = await api.post("/transaction", {
        ...state,
        accountId,
        sender: profileResponse.data.document, // CPF do usuário logado
        amount: state.amount * -1, // Fixando o número para negativo pois toda transferência que sai do aplicativo vai ser um débito na conta
      });

      history.push(`/account/${accountId}`);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Nova Transferência</h2>

        <TextInput
          type="text"
          label="Chave PIX do Recebedor"
          name="receiver"
          onChange={handleChange}
          value={state.receiver}
        />

        <TextInput
          type="number"
          label="Valor"
          name="amount"
          onChange={handleChange}
          value={state.amount}
        />

        <SelectInput
          label="Tipo de Operação"
          name="type"
          onChange={handleChange}
          value={state.type}
          items={["Transferência", "Pagamento"]}
        />

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Transferir
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTransaction;
