interface Props {
  message: string;
}
export const MessageResult = ({ message }: Props) => {
  return (
    <div className="grid w-full h-full place-items-center">
      <p className="text-2xl font-bold text-dodger-blue-950">{message}</p>
    </div>
  );
};
