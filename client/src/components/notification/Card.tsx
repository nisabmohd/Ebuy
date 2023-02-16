type CardProps = {
  message: string;
};
export default function Card({ message }: CardProps) {
  return <div>{message}</div>;
}
