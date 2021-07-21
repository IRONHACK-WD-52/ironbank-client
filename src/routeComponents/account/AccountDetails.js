import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../../apis/api";

function AccountDetails() {
  const [state, setState] = useState({
    agency: "",
    accountNumber: "",
    balance: 0,
    type: "",
  });

  const [recentTransaction, setRecentTransaction] = useState({
    amount: 0,
    sender: "",
    receiver: "",
    createdAt: "",
  });

  // Substitui o props.match.params.id
  const { id } = useParams();

  useEffect(() => {
    async function fetchAccount() {
      try {
        const response = await api.get(`/account/${id}`);

        setState({ ...response.data });

        const transactionsResponse = await api.get(`/transaction/${id}`);

        const lastTransaction =
          transactionsResponse.data[transactionsResponse.data.length - 1]; // Extrando a transação mais recente (a última inserida)

        setRecentTransaction({ ...lastTransaction });
      } catch (err) {
        console.error(err);
      }
    }
    fetchAccount();
  }, [id]);

  function renderRecentTransaction() {
    const hours = String(
      new Date(recentTransaction.createdAt).getHours()
    ).padStart(2, "0");
    const minutes = String(
      new Date(recentTransaction.createdAt).getMinutes()
    ).padStart(2, "0");

    if (recentTransaction.amount > 0) {
      return `Você recebeu uma transferência de ${recentTransaction.amount} de ${recentTransaction.sender} às ${hours}:${minutes}`;
    }

    return `Você fez uma transferência de ${Math.abs(
      recentTransaction.amount
    )} à ${recentTransaction.receiver} às ${hours}:${minutes}`;
  }

  return (
    <div className="bg-primary vw-100 vh-100 container d-flex flex-column justify-content-center">
      <div className="rounded shadow-sm bg-white text-center w-100">
        <div className="d-flex justify-content-around">
          <p>
            <strong>Agência: </strong>
            {state.agency}
          </p>

          <p>
            <strong>{state.type} Nº: </strong>
            {String(state.accountNumber).padStart(7, "0")}
          </p>
        </div>

        <p className="fs-1">
          {state.balance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        {/* Mostra a última transferência feita ou recebida */}
        <p>{renderRecentTransaction()}</p>
      </div>
      <div className="rounded shadow-sm bg-white w-50 mt-3 p-3">
        <Link to={`/${id}/transaction/create`}>
          <i className="fas fa-exchange-alt fa-2x"></i>
          <p>Transferência</p>
        </Link>
      </div>
      <div className="rounded shadow-sm bg-white w-50 mt-3 p-3">
        <Link to={`/${id}/transaction`}>
          <i className="fas fa-list fa-2x"></i>
          <p>Extrato</p>
        </Link>
      </div>
    </div>
  );
}

export default AccountDetails;
