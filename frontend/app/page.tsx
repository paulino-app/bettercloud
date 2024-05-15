"use client";

import GroupCard, { GroupCardAdd } from "@/components/cards/group";
import DialogCreateFamily from "@/components/dialog/dialogCreateFamily";
import DialogCreateGroup from "@/components/dialog/dialogCreateGroup";
import DialogCreateMember from "@/components/dialog/dialogCreateMember";
import { DialogContainer } from "@/components/dialog/dialogContainer";
import WavesContainer from "@/components/ui/wave";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { API } from "./models/models";
import IconCard, { IconCardAdd } from "@/components/cards/iconCard";
import { GroupSkeleton, IconSkeleton } from "@/components/ui/skeleton";
import Footer from "@/components/ui/footer";
import { Container, Line, Title, GridContainer } from "@/components/ui";

export default function Home(): JSX.Element {
  const {
    data: groups,
    status: groupsStatus,
    startFetch: groupsFetch,
  } = useFetch(`${API}/group`);

  const {
    data: families,
    status: familiesStatus,
    startFetch: familiesFetch,
  } = useFetch(`${API}/family`);

  const {
    data: members,
    status: membersStatus,
    startFetch: membersFetch,
  } = useFetch(`${API}/member`);

  const { status: groupDeleteStatus, startFetch: groupDeleteFetch } = useFetch(
    `${API}/group`,
    {
      method: "DELETE",
    },
  );

  const { status: familyDeleteStatus, startFetch: familyDeleteFetch } =
    useFetch(`${API}/family`, {
      method: "DELETE",
    });

  const { status: memberDeleteStatus, startFetch: memberDeleteFetch } =
    useFetch(`${API}/member`, {
      method: "DELETE",
    });

  const router = useRouter();

  useEffect(() => {
    fetchAll();
  }, []);

  /**
   * Fetches all groups, families, and members.
   */
  const fetchAll = (): void => {
    groupsFetch();
    familiesFetch();
    membersFetch();
  };

  const [displayCreateGroup, setDisplayCreateGroup] = useState<boolean>(false);
  const [displayCreateFamily, setDisplayCreateFamily] =
    useState<boolean>(false);
  const [displayCreateMember, setDisplayCreateMember] =
    useState<boolean>(false);

  const [loadingAll, setLoadingAll] = useState<boolean>(true);

  useEffect(() => {
    if (
      groupsStatus === "success" &&
      familiesStatus === "success" &&
      membersStatus === "success"
    ) {
      setLoadingAll(false);
    }
  }, [groupsStatus, familiesStatus, membersStatus]);

  useEffect(() => {
    if (groupDeleteStatus === "success") {
      groupsFetch();
    }
  }, [groupDeleteStatus]);

  useEffect(() => {
    if (familyDeleteStatus === "success") {
      familiesFetch();
    }
  }, [familyDeleteStatus]);

  useEffect(() => {
    if (memberDeleteStatus === "success") {
      membersFetch();
    }
  }, [memberDeleteStatus]);

  /**
   * Handles clicking on a group.
   * @param {string} session - The session ID of the group.
   */
  const handleGroupClick = (session: string): void => {
    router.push(`/group/${session}`);
  };

  /**
   * Handles creating a group.
   */
  const handleGroupCreate = (): void => {
    if (Array.isArray(members) && members.length > 0) {
      setDisplayCreateGroup(true);
    }
  };

  /**
   * Handles creating a family.
   */
  const handleFamilyCreate = (): void => {
    setDisplayCreateFamily(true);
  };

  /**
   * Handles creating a member.
   */
  const handleMemberCreate = (): void => {
    if (Array.isArray(families) && families.length > 0) {
      setDisplayCreateMember(true);
    }
  };

  /**
   * Closes the dialog.
   */
  const handleCloseDialog = (): void => {
    setDisplayCreateGroup(false);
    setDisplayCreateFamily(false);
    setDisplayCreateMember(false);
  };

  /**
   * Updates the data after a successful operation.
   */
  const successUpdate = (): void => {
    handleCloseDialog();
    fetchAll();
  };

  /**
   * Deletes a group.
   * @param {number} id - The ID of the group to delete.
   */
  const deleteGroup = (id: number): void => {
    if (!id) return;
    const body = { id };
    groupDeleteFetch(body);
  };

  /**
   * Deletes a family.
   * @param {number} id - The ID of the family to delete.
   */
  const deleteFamily = (id: number): void => {
    if (!id) return;
    const body = { id };
    familyDeleteFetch(body);
  };

  /**
   * Deletes a member.
   * @param {number} id - The ID of the member to delete.
   */
  const deleteMember = (id: number): void => {
    if (!id) return;
    const body = { id };
    memberDeleteFetch(body);
  };

  return (
    <Fragment>
      <WavesContainer />

      {/* Dialogs */}
      {displayCreateGroup && (
        <DialogContainer handleClose={handleCloseDialog} size="xl">
          <DialogCreateGroup success={handleGroupClick} />
        </DialogContainer>
      )}
      {displayCreateFamily && (
        <DialogContainer handleClose={handleCloseDialog} size="sm">
          <DialogCreateFamily success={successUpdate} />
        </DialogContainer>
      )}
      {displayCreateMember && (
        <DialogContainer handleClose={handleCloseDialog}>
          <DialogCreateMember success={successUpdate} />
        </DialogContainer>
      )}

      <Container>
        {/* Groups */}
        <Title name="Groups" />
        <Line />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {loadingAll ? (
            <Fragment>
              <GroupSkeleton />
              <GroupSkeleton />
            </Fragment>
          ) : (
            <Fragment>
              {groups.map((group: any[], index: string) => (
                <GroupCard
                  {...group}
                  key={index}
                  remove={deleteGroup}
                  handleClick={handleGroupClick}
                />
              ))}

              <GroupCardAdd handleClick={handleGroupCreate} />
            </Fragment>
          )}
        </div>

        {/* Family */}
        <div className="py-6" />

        <Title name="Families" />
        <Line />

        <GridContainer>
          {loadingAll ? (
            <Fragment>
              <IconSkeleton />
              <IconSkeleton />
              <IconSkeleton />
            </Fragment>
          ) : (
            <Fragment>
              {families.map((family: any[], index: number) => (
                <IconCard {...family} remove={deleteFamily} key={index} />
              ))}

              <IconCardAdd handleClick={handleFamilyCreate} />
            </Fragment>
          )}
        </GridContainer>

        {/* Members */}
        <div className="py-6" />

        <Title name="Members" />
        <Line />

        <GridContainer>
          {loadingAll ? (
            <Fragment>
              <IconSkeleton />
              <IconSkeleton />
              <IconSkeleton />
            </Fragment>
          ) : (
            <Fragment>
              {members.map((member: any[], index: number) => (
                <IconCard {...member} remove={deleteMember} key={index} />
              ))}

              <IconCardAdd handleClick={handleMemberCreate} />
            </Fragment>
          )}
        </GridContainer>
      </Container>

      <Footer />
    </Fragment>
  );
}
