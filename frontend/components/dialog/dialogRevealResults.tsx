import React, { Fragment, useEffect } from "react";
import { Line, Title } from "../ui";
import useFetch from "@/app/hooks/useFetch";
import { API } from "@/app/models/models";
import { RowSkeleton } from "../ui/skeleton";

interface DialogRevealResultsProps {
  groupId: number;
}

interface Result {
  santa: {
    name: string;
  };
  recipient: {
    name: string;
  };
}

/**
 * DialogRevealResults component to reveal Secret Santa results.
 * @param {DialogRevealResultsProps} props - The props for the DialogRevealResults component.
 * @returns {JSX.Element} The DialogRevealResults component.
 */
export default function DialogRevealResults({
  groupId,
}: DialogRevealResultsProps): JSX.Element {
  const { data, status, startFetch } = useFetch(
    `${API}/reveal-results/${groupId}`,
  );

  useEffect(() => {
    startFetch();
  }, []);

  return (
    <Fragment>
      <Title name="Results" />
      <Line />
      {status == "success" ? (
        <Fragment>
          <div className="max-h-[300px] overflow-y-scroll bg-slate-200 md:max-h-[200px]">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200 bg-white">
                {data?.map((value: any, index: number) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {value.santa.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">
                      →
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {value.recipient.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
        </Fragment>
      )}
    </Fragment>
  );
}
