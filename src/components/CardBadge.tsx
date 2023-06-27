import clsx from "clsx";

type Props = {
  stockAmount: number;
};

function CardBadge({ stockAmount }: Props) {
  return (
    <div
      className={clsx(
        "px-6 py-2 rounded-md top-4 left-4  absolute shadow-md text-white text-center",
        stockAmount === 0 ? "bg-red-500" : "bg-green-500"
      )}
    >
      {stockAmount === 0 ? "Out of stock" : `Only ${stockAmount} in Stock`}
    </div>
  );
}

export default CardBadge;
