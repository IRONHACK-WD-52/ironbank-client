import mastercard from "../assets/images/master-card.svg";

const CreditCard = (props) => {
  const { number, expiration, owner, bgColor, color } = props;

  function formatCardNumber(number) {
    const numberStr = String(number);

    const sections = [];

    for (let i = 0; i < 15; i = i + 4) {
      sections.push(numberStr.slice(i, i + 4));
    }

    return sections.join(" ");
  }

  return (
    <div
      className="m-3 p-3"
      style={{
        backgroundColor: bgColor,
        color: color,
        borderRadius: "0.5rem",
        height: "180px",
      }}
    >
      <div className="w-100 d-flex justify-content-end">
        <img className="w-25 h-25" src={mastercard} alt="card" />
      </div>

      <p> {formatCardNumber(number)} </p>
      <p>Expires {expiration}</p>
      <p>{owner}</p>
    </div>
  );
};

export default CreditCard;
