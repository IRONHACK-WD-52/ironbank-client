import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

import api from "../../apis/api";

import CreditCard from "../../components/CreditCard";

function CardDetails() {
  const [state, setState] = useState({
    number: "",
    validThru: "",
    securityCode: "",
  });

  const { accountId } = useParams();

  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await api.get(`/account/${accountId}`);

        const card = response.data.cards[0];

        setState({ ...card });
      } catch (err) {
        console.error(err.response.data);
      }
    }
    fetchCard();
  }, [accountId]);

  return (
    <div className="container mt-5">
      <CreditCard
        number={state.number}
        expiration={state.validThru}
        bgColor="#0D6DFD"
        color="#fff"
        owner={loggedInUser.user.name.toUpperCase()}
      />

      <div className="m-4">
        <p>
          <strong>Nome: </strong>
          {loggedInUser.user.name.toUpperCase()}
        </p>
        <p>
          <strong>Número: </strong>
          {state.number}
        </p>
        <p>
          <strong>Vencimento: </strong>
          {state.validThru}
        </p>
        <p>
          <strong>Cód. Segurança: </strong>
          {state.securityCode}
        </p>
      </div>
    </div>
  );
}

export default CardDetails;
