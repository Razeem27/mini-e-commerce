import Image from "next/image";

type Props = {
  showTimestamp?: boolean;
  orderData?: {
    title: string;
    color: string;
    size: string;
    price: number;
    imageUrl: string;
  };
};

export default function ProductOrderCard({ showTimestamp = true, orderData }: Props) {
  // Use orderData if provided, otherwise use dummy data for backward compatibility
  const data = orderData || {
    title: "Nike Air Max 90",
    color: "9ADA2A",
    size: "7",
    price: 1200,
    imageUrl: "/images/nike_shoes.png"
  };
  return (
    <article
      className={`bg-white/10 w-full min-h-32 flex justify-between p-4 rounded-[8.6px] gap-8 mb-5`}
    >
      <div className="relative w-28 items-end pointer-events-none overflow-hidden flex rounded-lg bg-black shrink-0">
        <Image
          src="/images/Product-order-nike-green.png"
          alt={`${data.title} in ${data.color}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div
          className={`flex justify-between ${
            !showTimestamp ? "items-center h-full" : ""
          }`}
        >
          <div>
            <p className="text-[20px] font-medium text-white mb-0.5">
              {data.title}
            </p>
            <p className="text-[15px] font-semibold text-white/60">
              UK {data.size}, {data.color.toUpperCase()}
            </p>
          </div>
          <p>
            <span className="text-[17px] font-normal text-white mr-2">
              ₹{data.price}
            </span>
            <span className="line-through text-[13px] font-normal text-white/50">
              ₹{Math.round(data.price * 1.165)}
            </span>
          </p>
        </div>

        {showTimestamp && (
          <time className="text-[13px] text-white/60">
            12:34 PM, 20th Dec 2025
          </time>
        )}
      </div>
    </article>
  );
}
