import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";

function ProfileForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <fieldset className="form-group">
        <legend>Básico</legend>
        <TextInput
          label="Name"
          type="text"
          name="name"
          id="signupFormName"
          value={props.state.name}
          onChange={props.handleChange}
        />

        <TextInput
          label="E-mail"
          type="email"
          name="email"
          id="signupFormEmail"
          value={props.state.email}
          onChange={props.handleChange}
        />

        {props.location.pathname === "/auth/signup" ? (
          <TextInput
            label="Password"
            type="password"
            name="password"
            id="signupFormPassword"
            value={props.state.password}
            onChange={props.handleChange}
          />
        ) : null}
      </fieldset>

      <fieldset className="form-group">
        <legend>Endereço</legend>
        <TextInput
          label="Rua"
          type="text"
          name="street"
          id="signupFormStreet"
          value={props.state.street}
          onChange={props.handleChange}
        />

        <TextInput
          label="Número"
          type="text"
          name="number"
          id="signupFormNumber"
          value={props.state.number}
          onChange={props.handleChange}
        />

        <TextInput
          label="Bairro"
          type="text"
          name="neighbourhood"
          id="signupFormNeighbourhood"
          value={props.state.neighbourhood}
          onChange={props.handleChange}
        />

        <TextInput
          label="Cidade"
          type="text"
          name="city"
          id="signupFormCity"
          value={props.state.city}
          onChange={props.handleChange}
        />

        <TextInput
          label="Estado"
          type="text"
          name="stateOrProvince"
          id="signupFormState"
          value={props.state.stateOrProvince}
          onChange={props.handleChange}
        />

        <TextInput
          label="CEP"
          type="text"
          name="postalCode"
          id="signupFormPostalCode"
          value={props.state.postalCode}
          onChange={props.handleChange}
        />
      </fieldset>

      <fieldset className="form-group">
        <legend>Informações pessoais</legend>
        <TextInput
          label="Profissão"
          type="text"
          name="profession"
          id="signupFormProfession"
          value={props.state.profession}
          onChange={props.handleChange}
        />

        <SelectInput
          label="Estado Civil"
          type="text"
          name="maritalStatus"
          id="signupFormMaritalStatus"
          value={props.state.maritalStatus}
          onChange={props.handleChange}
          items={["Casado(a)", "Divorciado(a)", "Solteiro(a)", "Viuvo(a)"]}
        />

        <TextInput
          label="Data de Nascimento"
          type="date"
          name="birthDate"
          id="signupFormBirthDate"
          value={props.state.birthDate}
          onChange={props.handleChange}
        />

        <TextInput
          label="Número de telefone"
          type="text"
          name="phoneNumber"
          id="signupFormPhoneNumber"
          value={props.state.phoneNumber}
          onChange={props.handleChange}
        />

        <TextInput
          label="CPF"
          type="text"
          name="document"
          id="signupFormDocument"
          value={props.state.document}
          onChange={props.handleChange}
        />
      </fieldset>

      {props.error ? (
        <div className="alert alert-danger">{props.error}</div>
      ) : null}

      <div className="form-group">
        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
