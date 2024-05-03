
import { LoginForm } from "../components/login/LoginForm";

export const LoginPage = () => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-8 bg-dodger-blue-950 min-h-svh font-poppins"
    >
      <div className="relative">
        <h1 className="text-white text-7xl md:text-8xl text-latinBlue">
          LATIN<span className="font-bold text-dodger-blue-600">AD</span>
        </h1>
        <p className="absolute right-0 px-2 text-base font-bold text-center text-black uppercase bg-orange-500 rounded-full -rotate-3">
          Challenge
        </p>
      </div>
      <section className="w-full max-w-md px-4 ">
        <LoginForm />
      </section>

    </section>
  );
};
