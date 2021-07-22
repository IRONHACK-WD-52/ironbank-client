import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../../apis/api";

function AccountDetails() {
  const [state, setState] = useState({
    agency: "",
    accountNumber: "",
    balance: 0,
    type: "",
    cards: [],
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

        if (transactionsResponse.data.length) {
          const lastTransaction =
            transactionsResponse.data[transactionsResponse.data.length - 1]; // Extrando a transação mais recente (a última inserida)

          setRecentTransaction({ ...lastTransaction });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAccount();
  }, [id]);

  function renderRecentTransaction() {
    if (recentTransaction.amount !== 0) {
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

    return null;
  }

  console.log(state);

  return (
    <div className="bg-primary vw-100 vh-100 container d-flex flex-column justify-content-center">
      <div className="rounded shadow-sm bg-white text-center w-100 p-3">
        <div>
          <p className="mb-1">
            <strong>Agência: </strong>
            {state.agency}
          </p>

          <p>
            <strong>{state.type} Nº: </strong>
            {String(state.accountNumber).padStart(7, "0")}
          </p>
        </div>

        <small>Saldo</small>
        <p className="fs-1">
          {state.balance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        {/* Mostra a última transferência feita ou recebida */}
        <p>{renderRecentTransaction()}</p>
      </div>
      <div className="row mt-3 d-flex justify-content-evenly">
        <div className="rounded shadow-sm bg-white p-3 col-5 mt-2">
          <Link to={`/${id}/transaction/create`}>
            <i className="fas fa-exchange-alt fa-2x"></i>
            <p>Transferência</p>
          </Link>
        </div>
        <div className="rounded shadow-sm bg-white p-3 col-5 mt-2">
          <Link to={`/${id}/transaction`}>
            <i className="fas fa-list fa-2x"></i>
            <p>Extrato</p>
          </Link>
        </div>
        <div className="rounded shadow-sm bg-white p-3 col-5 mt-2">
          <Link to={`/account/${id}/delete`}>
            <i className="fas fa-ban fa-2x"></i>
            <p>Encerrar conta</p>
          </Link>
        </div>
        <div className="rounded shadow-sm bg-white p-3 col-5 mt-2">
          {state.cards.length ? (
            <Link to={`/${id}/card`}>
              <i className="fas fa-credit-card fa-2x"></i>
              <p>Ver cartão</p>
            </Link>
          ) : (
            <Link to={`/${id}/card/create`}>
              <i className="fas fa-credit-card fa-2x"></i>
              <p>Pedir cartão</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
