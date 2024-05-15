import { API } from "@/app/models/models";
import Group from "@/components/sections/group";
import { Fragment } from "react";

async function getData(params: { group: string }) {
  const res = await fetch(`${API}/group/session/${params.group}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Class({ params }: { params: { group: string } }) {
  const data = await getData(params);

  return (
    <Fragment>
      <Group data={data} />
    </Fragment>
  );
}
