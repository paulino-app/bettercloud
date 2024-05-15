import React from "react";
import { Button, Line, Title } from "../ui";

interface DialogMemberModeProps {
  newMember: () => void;
  existingMember: () => void;
}

/**
 * DialogMemberMode component to add a new or existing member.
 * @param {DialogMemberModeProps} props - The props for the DialogMemberMode component.
 * @returns {JSX.Element} The DialogMemberMode component.
 */
export default function DialogMemberMode({
  newMember,
  existingMember,
}: DialogMemberModeProps): JSX.Element {
  return (
    <>
      <Title name="Add Member" />
      <Line />
      <div className="flex gap-4 pt-5">
        <Button
          name="New member"
          fill={true}
          attach={true}
          handleClick={newMember}
        />
        <Button
          name="Existing member"
          fill={true}
          attach={true}
          handleClick={existingMember}
        />
      </div>
    </>
  );
}
