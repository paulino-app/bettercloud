import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IconCardProps {
  id: string | number;
  name: string;
  remove: (id: string | number) => void;
  color?: string;
  disableRemove?: boolean;
}

export default function IconCard({
  id,
  name,
  remove,
  color = "",
  disableRemove = false,
}: any) {
  // Function to get the first capital letter of a string
  const getFirstCapitalLetter = (str: string): string => {
    const capitalLetter = str.match(/[a-zA-Z]/);
    return capitalLetter ? capitalLetter[0].toUpperCase() : "";
  };

  // Function to handle the removal of the card
  const handleRemove = (): void => {
    remove(id);
  };

  return (
    <div className="group relative h-[196px] rounded-[14px] bg-white shadow-main-shadow">
      {/* Remove button */}
      {!disableRemove && (
        <div className="absolute right-5 top-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button onClick={handleRemove}>
            <RiDeleteBin6Line className="text-xl text-main-gray-semi" />
          </button>
        </div>
      )}

      {/* Card content */}
      <div className="flex h-[132px] items-center justify-center">
        <div
          className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-slate-500"
          style={{ backgroundColor: color }}
        >
          {/* Initial letter */}
          <span className="font-varela text-5xl text-white">
            {getFirstCapitalLetter(name)}
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="w-full text-center text-2xl text-main-gray">{name}</div>
      </div>
    </div>
  );
}

interface IconCardAddProps {
  handleClick: () => void;
}

export function IconCardAdd({ handleClick }: IconCardAddProps) {
  return (
    <div
      className="h-[196px] cursor-pointer rounded-[14px] border-[2px] border-dashed border-main-gray-semi bg-transparent"
      onClick={handleClick}
    >
      <div className="flex h-full items-center justify-center">
        <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full border-[2px] border-dashed border-main-gray-semi">
          <AiOutlinePlus className="text-4xl text-main-gray-semi" />
        </div>
      </div>
    </div>
  );
}
