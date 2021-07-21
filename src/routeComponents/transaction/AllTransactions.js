import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../../apis/api";

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);

  const { accountId } = useParams();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await api.get(`/transaction/${accountId}`);

        setTransactions([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTransactions();
  }, [accountId]);

  function formatDate(date) {
    const dateObj = new Date(date);

    const time = dateObj.toLocaleTimeString().slice(0, 4);
    const dateString = dateObj.toLocaleDateString();

    return `${dateString} ${time}`;
  }

  function renderAmount(amount) {
    if (amount > 0) {
      return <span className="text-success">+{amount}</span>;
    }

    return <span className="text-danger">{amount}</span>;
  }

  return (
    <div className="container mt-5">
      <h2>Seu extrato </h2>
      <table className="table table-hover" style={{ fontSize: "14px" }}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Recebedor</th>
            <th>Pagador</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction._id}>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>{transaction.receiver}</td>
                <td>{transaction.sender}</td>
                <td>{renderAmount(transaction.amount)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllTransactions;
