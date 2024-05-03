import { Display } from "../../lib/interfaces";
import { DisplayCard } from "./DisplayCard";

interface Props {
  data: Display[];
}
export const DisplaysGrid = ({ data }: Props) => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {!data.length && (
        <p className="self-center text-xl font-semibold text-center md:col-span-2 xl:col-span-3 text-dodger-blue-960">
          {" "}
          Sin Resultados
        </p>
      )}
      {data.map((display, i) => (
        <DisplayCard {...display} key={display.name + i} />
      ))}
    </section>
  );
};
