import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCalendar, FaUsers } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Member {
  id: number;
  name: string;
  familyId: number;
}

interface GroupCardProps {
  id: number;
  name: string;
  members: Member[];
  handleClick: (session: string) => void;
  date: string;
  session: string;
  remove: (id: number) => void;
}

/**
 * GroupCard component to display a group's details.
 * @param {number} id - The ID of the group.
 * @param {string} name - The name of the group.
 * @param {Member[]} members - The members of the group.
 * @param {string} date - The creation date of the group.
 * @param {string} session - The session ID of the group.
 * @param {(session: string) => void} handleClick - Function to handle group click.
 * @param {(id: number) => void} remove - Function to remove the group.
 */
const GroupCard: React.FC<any> = ({
  id,
  name,
  members,
  date,
  handleClick,
  remove,
  session,
}) => {
  /**
   * Formats the date to a readable string.
   * @param {string} dateStr - The date string.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  /**
   * Handles the click event on the card.
   */
  const onClick = (): void => {
    handleClick(session);
  };

  /**
   * Handles the remove event.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
   */
  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    remove(id);
  };

  return (
    <div
      className="group relative h-[86px] w-full cursor-pointer rounded-[14px] bg-white px-7 shadow-main-shadow"
      onClick={onClick}
    >
      {/* Name */}
      <div className="w-full pt-4 text-left text-xl text-main-gray md:text-2xl">
        {name}
      </div>

      <div className="w-full pt-1 text-left text-sm text-main-gray-semi md:text-base">
        <FaUsers className="mb-[3px] mr-1 inline" />
        {members.length}
        <FaCalendar className="mb-[3px] ml-4 mr-2 inline" />
        {formatDate(date)}
      </div>

      {/* delete */}
      <div className="absolute right-5 top-[34px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button onClick={handleRemove}>
          <RiDeleteBin6Line className="text-xl text-main-gray-semi" />
        </button>
      </div>
    </div>
  );
};

export default GroupCard;

interface GroupCardAddProps {
  handleClick: () => void;
}

/**
 * GroupCardAdd component to add a new group.
 */
export const GroupCardAdd: React.FC<GroupCardAddProps> = ({ handleClick }) => {
  return (
    <div
      className="h-[86px] w-full cursor-pointer rounded-[14px] border-[2px] border-dashed border-main-gray-semi bg-transparent px-7"
      onClick={handleClick}
    >
      <div className="flex h-full w-full items-end text-2xl text-main-gray-semi">
        <AiOutlinePlus className="mr-2 text-3xl text-main-gray-semi" />
        New group
      </div>
    </div>
  );
};
