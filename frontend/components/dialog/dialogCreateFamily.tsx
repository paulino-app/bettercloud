import { useEffect, useState } from "react";
import Input from "../ui/input";
import { Button, Line, SubTitle } from "../ui";
import useFetch from "@/app/hooks/useFetch";
import { API } from "@/app/models/models";

interface DialogCreateFamilyProps {
  success: () => void;
}

interface FamilyData {
  name: string;
}

export default function DialogCreateFamily({
  success,
}: DialogCreateFamilyProps) {
  const { status, startFetch: createFamily } = useFetch(`${API}/family`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [data, setData] = useState<FamilyData>({ name: "" });

  useEffect(() => {
    if (status === "success") {
      success();
    }
  }, [status]);

  const handleChange = (key: string, value: any): void => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateFamily = () => {
    if (!data.name) return;
    createFamily(data);
  };

  return (
    <div className="mt-6 w-full">
      <SubTitle name="New Family" />
      <Line />
      <Input name="name" label="Family" change={handleChange} />
      <div className="my-8" />
      <Button name="Create" fill={true} handleClick={handleCreateFamily} />
    </div>
  );
}
