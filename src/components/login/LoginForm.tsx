import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { LoginResponse } from "../../lib/interfaces";
import { BASE_URL } from "../../lib/contants";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { saveCredentials } = useContext(AppContext);

  const navigate = useNavigate();

  const toggleShowPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setShowPassword(e.target.checked);
  };

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);
    const { email, password } = event.target as HTMLFormElement;

    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
      .then((response) => response.json())
      .then((data: LoginResponse) => {
        saveCredentials({
          email: data.user.email,
          isLogged: true,
          token: data.token,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
        toast.error("Email o contraseña incorrecto");
      })
      .finally(() => setLoading(false));

    form.reset();
  };

  return (
    <form
      className="flex flex-col items-start gap-6 px-6 py-12"
      onSubmit={login}
    >
      <div className="flex flex-col w-full gap-2">
        <label className="text-white" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          name="email"
          className="px-4 py-2 rounded-sm focus:border-0"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label className="text-white" htmlFor="password">
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          required
          id="password"
          name="password"
          minLength={4}
          className="px-4 py-2 rounded-sm"
        />
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            onChange={toggleShowPassword}
            className="mr-2"
          />
          <span className="text-sm">Mostar contraseña</span>
        </label>
      </div>
      <button disabled={loading} className="px-6 py-2 mt-2 font-semibold text-white transition-colors rounded-full disabled:pointer-events-none disabled:bg-gray-400 bg-dodger-blue-600 hover:text-dodger-blue-700 hover:bg-white ">
        {loading ? "Ingresando" : "Ingresar"}
      </button>
    </form>
  );
};
