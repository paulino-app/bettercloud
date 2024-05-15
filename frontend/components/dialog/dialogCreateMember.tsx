import { useEffect, useState } from "react";
import Input from "../ui/input";
import { Button, Line, Title } from "../ui";
import Dropdown from "../ui/dropdown";
import { API } from "@/app/models/models";
import useFetch from "@/app/hooks/useFetch";

interface DialogCreateMemberProps {
  success: () => void;
  mode?: "general" | "single"; // Mode of creation, defaults to "general"
  groupId?: number; // ID of the group, defaults to -1
}

interface MemberData {
  familyId: number;
  groupId: number;
  photo: string;
  name: string;
  description: string;
  email: string;
  phone: string;
}

export default function DialogCreateMember({
  success,
  mode = "general",
  groupId = -1,
}: DialogCreateMemberProps) {
  const { data: families, startFetch: fetchFamilies } = useFetch(
    `${API}/family`,
  );
  const { status: memberStatus, startFetch: createMember } = useFetch(
    `${API}/member`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const { status: groupStatus, startFetch: createGroupMember } = useFetch(
    `${API}/member/group`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const [data, setData] = useState<MemberData>({
    familyId: -1,
    groupId: groupId,
    photo: "",
    name: "",
    description: "",
    email: "",
    phone: "",
  });

  const [familyOptions, setFamilyOptions] = useState<
    { name: string; code: number }[]
  >([]);

  useEffect(() => {
    fetchFamilies();
  }, []);

  useEffect(() => {
    if (memberStatus === "success" || groupStatus === "success") {
      success();
    }
  }, [memberStatus, groupStatus]);

  useEffect(() => {
    if (Array.isArray(families) && families.length > 0) {
      setFamilyOptions(families.map(({ id, name }) => ({ name, code: id })));
    }
  }, [families]);

  const handleChange = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateFamily = () => {
    if (data.familyId === -1 || !data.name) return;
    mode === "single" ? createGroupMember(data) : createMember(data);
  };

  return (
    <div className="mt-6 w-full">
      <Title name="New Member" />
      <Line />
      <div className="mb-4 mt-5 grid w-full gap-3 md:grid-cols-2">
        <Input name="name" label="Name" change={handleChange} />
        <Dropdown
          name="familyId"
          label="Family"
          options={familyOptions}
          change={handleChange}
        />
        <Input name="email" label="Email" change={handleChange} />
        <Input name="phone" label="Phone Number" change={handleChange} />
      </div>
      <div className="my-8" />
      <Button name="Create" fill={true} handleClick={handleCreateFamily} />
    </div>
  );
}
