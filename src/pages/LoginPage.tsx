import { LoginForm } from "../components/login/LoginForm";

export const LoginPage = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-8 min-h-svh font-poppins">
      <h1 className="text-7xl md:text-8xl text-latinBlue">
        LATIN<span className="font-bold text-black">AD</span>
      </h1>
      <section className="w-full max-w-md px-4 ">
        <LoginForm />
      </section>
    </main>
  );
};
