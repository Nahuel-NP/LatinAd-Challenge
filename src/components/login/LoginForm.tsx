import { ChangeEvent, FormEvent, useState } from "react";
import { BASE_URL, LoginResponse } from "../../lib";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setShowPassword(e.target.checked);
  };

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const { email, password } = event.target as HTMLFormElement;

    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
      .then((response) => response.json())
      .then((data: LoginResponse) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    form.reset();
  };

  return (
    <form
      className="flex flex-col items-start gap-6 bg-[#62a8ea] py-12 px-6"
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
        <label className="text-white">
          <input
            type="checkbox"
            onChange={toggleShowPassword}
            className="mr-2"
          />
          <span className="text-sm">Mostar contraseña</span>
        </label>
      </div>
      <button className="px-4 py-2 mt-4 font-semibold transition-colors bg-white rounded-sm hover:text-white hover:bg-latinBlue ">
        Ingresar
      </button>
    </form>
  );
};
