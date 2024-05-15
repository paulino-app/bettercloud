import { useEffect, useState } from "react";
import Input from "../ui/input";
import { Button, Line, Title } from "../ui";
import Dropdown from "../ui/dropdown";
import { API } from "@/app/models/models";
import useFetch from "@/app/hooks/useFetch";

interface DialogAddMemberProps {
  success: () => void;
  groupId: number;
}

interface MemberData {
  memberId: string;
  groupId: number;
}

export default function DialogAddMember({
  success,
  groupId,
}: DialogAddMemberProps) {
  const { data: members, startFetch: fetchMembers } = useFetch(
    `${API}/group/${groupId}/members-not-in-group`,
  );
  const { status, startFetch: addMember } = useFetch(`${API}/group/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [memberOptions, setMemberOptions] = useState<
    { name: string; code: string }[]
  >([]);
  const [data, setData] = useState<MemberData>({
    memberId: "",
    groupId: groupId,
  });

  useEffect(() => {
    fetchMembers();
    handleChange("groupId", groupId);
  }, [groupId]);

  useEffect(() => {
    if (Array.isArray(members) && members.length > 0) {
      setMemberOptions(members.map(({ id, name }) => ({ name, code: id })));
    }
  }, [members]);

  useEffect(() => {
    if (status === "success") {
      success();
    }
  }, [status]);

  const handleChange = (key: string, value: any): void => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddMember = () => {
    if (!data.memberId) return;
    addMember(data);
  };

  return (
    <div className="mt-6 w-full">
      <Title name="Add Member" />
      <Line />
      <div className="mb-4 mt-5 grid w-full gap-3 md:grid-cols-2">
        <Dropdown
          name="memberId"
          label="Member"
          options={memberOptions}
          change={handleChange}
        />
      </div>
      <div className="my-8" />
      <Button name="Add" fill={true} handleClick={handleAddMember} />
    </div>
  );
}
