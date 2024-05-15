import { useEffect, useState } from "react";
import Input from "../ui/input";
import { Button, Line, SubTitle } from "../ui";
import Dropdown from "../ui/dropdown";
import { API } from "@/app/models/models";
import useFetch from "@/app/hooks/useFetch";

interface DialogCreateGroupProps {
  success: (session: any) => void;
}

interface GroupData {
  name: string;
  organizerId: number;
  theme: string;
  moneyLimit: number;
}

export default function DialogCreateGroup({ success }: DialogCreateGroupProps) {
  const { data: members, startFetch: fetchMembers } = useFetch(`${API}/member`);
  const {
    data: response,
    status,
    startFetch: createGroup,
  } = useFetch(`${API}/group`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [organizerOptions, setOrganizerOptions] = useState<
    { name: string; code: number }[]
  >([]);
  const [data, setData] = useState<GroupData>({
    name: "",
    organizerId: 0,
    theme: "",
    moneyLimit: 0,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (Array.isArray(members) && members.length > 0) {
      setOrganizerOptions(members.map(({ id, name }) => ({ name, code: id })));
    }
  }, [members]);

  useEffect(() => {
    if (status === "success") {
      success(response.session);
    }
  }, [status]);

  const handleChange = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateGroup = () => {
    if (!data.name || !data.organizerId) return;
    createGroup(data);
  };

  return (
    <div className="mt-6 w-full">
      <SubTitle name="New Group" />
      <Line />
      <div className="mb-4 mt-5 grid w-full gap-3 md:grid-cols-2">
        <Input name="name" label="Name" change={handleChange} />
        <Dropdown
          name="organizerId"
          label="Organizer"
          options={organizerOptions}
          change={handleChange}
        />
        <Input name="theme" label="Theme" change={handleChange} />
        <Input name="moneyLimit" label="Money Limit" change={handleChange} />
      </div>
      <div className="my-8" />
      <Button name="Create" fill={true} handleClick={handleCreateGroup} />
    </div>
  );
}
