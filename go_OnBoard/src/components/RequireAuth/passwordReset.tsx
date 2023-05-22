import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmThePasswordReset } from "../../utils/firebase/firebase.config";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

function PasswordReset() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  /* const { password, confirmPassword } = formFields; */

  let oobCode: string | null = searchParams.get("oobCode");

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formFields.password !== formFields.confirmPassword) {
      alert("Hasła się nie zgadzają.");
      return;
    }

    try {
      if (oobCode) {
        await confirmThePasswordReset(oobCode, formFields.confirmPassword);
        resetFormFields();
        setSuccessMessage(true);
      } else {
        alert("Coś jest nie tak; Spróbuj ponownie później!");
        console.log("missing oobCode");
      }
    } catch (error: any) {
      if (error.code === "auth/invalid-action-code") {
        alert("Coś jest nie tak; Spróbuj ponownie później.");
      }
      console.log(error.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      {successMessage ? (
        <div>
          <h3>Twoje hasło zostało zmienione</h3>
          <button onClick={() => navigate("/")}>Wróć do strony logowania</button>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div>
              <input type="password" name="password" value={formFields.password} onChange={handleChange} placeholder="Nowe hasło" required />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formFields.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PasswordReset;
