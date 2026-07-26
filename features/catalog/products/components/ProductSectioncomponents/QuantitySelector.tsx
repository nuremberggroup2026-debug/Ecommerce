"use client";

type Props = {
  quantity: number;
  stock: number;
  setQuantity: (value: number) => void;
};


export default function QuantitySelector({
  quantity,
  stock,
  setQuantity,
}: Props) {


  const changeQuantity = (delta:number)=>{

    setQuantity(
      Math.min(
        Math.max(
          1,
          quantity + delta
        ),
        stock
      )
    );

  };


  return (
    <div className="space-y-3">

      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 block">
        Quantity
      </label>


      <div className="inline-flex items-center border border-neutral-200 rounded-full bg-white p-1 shadow-sm">


        <button
          onClick={()=>changeQuantity(-1)}
          disabled={quantity <= 1}
          className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
        >
          -
        </button>


        <span className="w-10 text-center text-xs font-semibold">
          {quantity}
        </span>


        <button
          onClick={()=>changeQuantity(1)}
          disabled={quantity >= stock}
          className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
        >
          +
        </button>


      </div>

    </div>
  );
}