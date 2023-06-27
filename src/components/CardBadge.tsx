type Props = {
  stockAmount: number;
};

function CardBadge({ stockAmount }: Props) {
  return (
    <div className="px-6 py-2 bg-emerald-500 rounded-md top-4 left-4  absolute shadow-md text-white text-center">
      Only {stockAmount} in Stock
    </div>
  );
}

export default CardBadge;
