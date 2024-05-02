import { Display } from "../../lib/interfaces";
import { DisplayCard } from "./DisplayCard";

interface Props {
  data: Display[];
}
export const DisplaysGrid = ({ data }: Props) => {
  return (
    <section className="grid gap-4 border-gray-400 md:grid-cols-2 xl:grid-cols-3">
      {data.map((display, i) => (
        <DisplayCard {...display} key={display.name + i} />
      ))}
    </section>
  );
};
