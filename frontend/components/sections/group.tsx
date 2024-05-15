"use client";

import { Button, Container, GridContainer, Line, Title } from "@/components/ui";
import { Fragment, useEffect, useState } from "react";
import IconCard, { IconCardAdd } from "../cards/iconCard";
import { DialogContainer } from "../dialog/dialogContainer";
import DialogCreateMember from "../dialog/dialogCreateMember";
import useFetch from "@/app/hooks/useFetch";
import { API } from "@/app/models/models";
import DialogMemberMode from "../dialog/dialogMemberMode";
import DialogAddMember from "../dialog/dialogAddMember";
import WavesContainer from "../ui/wave";
import Footer from "../ui/footer";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IconSkeleton } from "../ui/skeleton";
import DialogRevealResults from "../dialog/dialogRevealResults";

interface GroupData {
  id: number;
  name: string;
  session: string;
  members: any[];
  state: string;
}

interface GroupProps {
  data: GroupData;
}

/**
 * Group component to manage and display group details and members.
 * @param {GroupProps} props - The props for the Group component.
 * @returns {JSX.Element} The Group component.
 */
export default function Group({ data }: GroupProps): JSX.Element {
  const { status: assignStatus, startFetch } = useFetch(`${API}/assign-santa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const {
    data: members,
    status: membersStatus,
    startFetch: membersFetch,
  } = useFetch(`${API}/member/group/session/${data.session}`);

  const { status: memberDeleteStatus, startFetch: memberDeleteFetch } =
    useFetch(`${API}/group/member`, {
      method: "DELETE",
    });

  const [displayResults, setDisplayResults] = useState<boolean>(false);
  const [displayMembersChoose, setDisplayMembersChoose] =
    useState<boolean>(false);
  const [displayMembers, setDisplayMembers] = useState<any[]>([]);
  const [displayCreateMember, setDisplayCreateMember] =
    useState<boolean>(false);
  const [displayAddMember, setDisplayAddMember] = useState<boolean>(false);
  const [displayButtonName, setDisplayButtonName] = useState<string>("");
  const [state, setState] = useState<string>(data?.state);

  const router = useRouter();

  useEffect(() => {
    const { members: dataMembers, state: dataState } = data;

    setDisplayMembers(dataMembers);

    let buttonName: string = "Draw Participants";

    if (dataMembers.length <= 1) {
      buttonName = "Add Participants";
    }

    if (dataState === "assigned") {
      buttonName = "Reveal Results";
    }

    setDisplayButtonName(buttonName);
  }, [data]);

  useEffect(() => {
    if (assignStatus === "success") {
      setDisplayButtonName("Reveal Results");
      setState("assigned");
    }
  }, [assignStatus]);

  useEffect(() => {
    if (memberDeleteStatus === "success") {
      membersFetch();
    }
  }, [memberDeleteStatus]);

  useEffect(() => {
    if (membersStatus === "success") {
      setDisplayMembers(members);
    }
  }, [membersStatus]);

  useEffect(() => {
    if (state === "idle" && members.length > 0) {
      setDisplayButtonName("Draw Participants");
    }
  }, [members, state]);

  const handleCloseDialog = (): void => {
    setDisplayResults(false);
    setDisplayCreateMember(false);
    setDisplayAddMember(false);
    setDisplayMembersChoose(false);
  };

  const successUpdate = (): void => {
    handleCloseDialog();
    membersFetch();
    setDisplayAddMember(false);
    setDisplayCreateMember(false);
  };

  const handleDisplayResults = (): void => {
    setDisplayResults(true);
  };

  /**
   * Handles the control button click.
   */
  const handleControlClick = (): void => {
    switch (state) {
      case "idle":
        if (displayMembers.length <= 1) {
          handleMemberOption();
        } else {
          const body = {
            groupId: data?.id,
          };

          startFetch(body);
        }
        break;

      case "assigned":
        handleDisplayResults();
        break;

      default:
        break;
    }
  };

  const handleMemberOption = (): void => {
    setDisplayMembersChoose(true);
  };

  const handleMemberCreate = (): void => {
    setDisplayMembersChoose(false);
    setDisplayCreateMember(true);
  };

  const handleMemberAdd = (): void => {
    setDisplayMembersChoose(false);
    setDisplayAddMember(true);
  };

  const handleClickHome = (): void => {
    router.push("/");
  };

  const removeMemberFromGroup = (id: number): void => {
    if (!id) return;

    const body = { memberId: id, groupId: data.id };

    memberDeleteFetch(body);
  };

  return (
    <Fragment>
      <WavesContainer />

      <button className="absolute left-12 top-12" onClick={handleClickHome}>
        <FaArrowLeft className="text-4xl text-white" />
      </button>

      {displayResults && (
        <DialogContainer handleClose={handleCloseDialog}>
          <DialogRevealResults groupId={data.id} />
        </DialogContainer>
      )}

      {displayMembersChoose && (
        <DialogContainer handleClose={handleCloseDialog} size="sm">
          <DialogMemberMode
            newMember={handleMemberCreate}
            existingMember={handleMemberAdd}
          />
        </DialogContainer>
      )}

      {displayCreateMember && (
        <DialogContainer handleClose={handleCloseDialog}>
          <DialogCreateMember
            success={successUpdate}
            mode="single"
            groupId={data?.id}
          />
        </DialogContainer>
      )}

      {displayAddMember && (
        <DialogContainer handleClose={handleCloseDialog} size="sm">
          <DialogAddMember success={successUpdate} groupId={data.id} />
        </DialogContainer>
      )}

      <Container>
        <div className="py-4" />
        <Title name={data?.name} center={true} />
        <Line />

        {/* control */}
        {displayButtonName && (
          <div className="flex rounded-[14px] bg-white pb-4 pt-6">
            <Button name={displayButtonName} handleClick={handleControlClick} />
          </div>
        )}

        {/* participants */}
        <Title name="Participants" />
        <Line />

        <GridContainer>
          {displayMembers.length <= 0 ? (
            <Fragment>
              <IconSkeleton />
              <IconSkeleton />
              <IconSkeleton />
            </Fragment>
          ) : (
            <Fragment>
              {displayMembers.map((family, index) => (
                <IconCard
                  {...family}
                  remove={removeMemberFromGroup}
                  disableRemove={state !== "idle"}
                  key={index}
                />
              ))}

              {state === "idle" && (
                <IconCardAdd handleClick={handleMemberOption} />
              )}
            </Fragment>
          )}
        </GridContainer>
      </Container>

      <Footer />
    </Fragment>
  );
}
