"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Membership } from ".";
import { getMembershipsFromApi } from "../api";
import { convertDataForTable } from "../lib/converter";

type MembershipsContextState = {
  memberships: Membership[];
  selectedMemberships: number[];
};

type MembershipsProviderValue = {
  memberships: Membership[];
};

const MembershipsContext = createContext<{
  membershipsState: MembershipsContextState;
  setData: Dispatch<SetStateAction<MembershipsContextState>>;
} | null>(null);

export const MembershipStoreProvider: React.FC<
  PropsWithChildren<MembershipsProviderValue>
> = ({ memberships, children }) => {
  const [membershipsState, setMembershipsState] =
    useState<MembershipsContextState>({
      memberships: memberships,
      selectedMemberships: [],
    });

  useEffect(() => {
    setMembershipsState((prev) => ({ ...prev, memberships: memberships }));
  }, [memberships]);

  return (
    <MembershipsContext.Provider
      value={{
        membershipsState: membershipsState,
        setData: setMembershipsState,
      }}
    >
      {children}
    </MembershipsContext.Provider>
  );
};

export const useMembershipsStore = () => {
  const membershipsContext = useContext(MembershipsContext);

  if (!membershipsContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }
  const { membershipsState, setData } = membershipsContext;

  const toggleSelectedMemberships = (familyId: number) => {
    const isMembershipsAlreadySelect =
      membershipsState.selectedMemberships.includes(familyId);

    if (isMembershipsAlreadySelect) {
      const filteredSelectedMemberships =
        membershipsState.selectedMemberships.filter(
          (currentId) => currentId !== familyId
        );
      return setData((prev) => ({
        ...prev,
        selectedMemberships: filteredSelectedMemberships,
      }));
    }
    const newSelectedMemberships = [
      ...membershipsState.selectedMemberships,
      familyId,
    ];
    setData((prev) => ({
      ...prev,
      selectedMemberships: newSelectedMemberships,
    }));
  };

  const toggleMainSelect = () => {
    const isIndeterminate =
      membershipsState.selectedMemberships.length > 0 &&
      membershipsState.selectedMemberships.length !==
        membershipsState.memberships.length;
    const isChecked =
      membershipsState.selectedMemberships.length ===
      membershipsState.memberships.length;

    if (isIndeterminate || isChecked) {
      return setData((prev) => ({ ...prev, selectedMemberships: [] }));
    }
    const selectedMemberships = membershipsState.memberships.map(
      (membership) => membership.id
    );
    return setData((prev) => ({
      ...prev,
      selectedMemberships: selectedMemberships,
    }));
  };

  const refetchMembers = async (familyId: string) => {
    const memberships = await getMembershipsFromApi(familyId);
    if (memberships) {
      const membershipsData = convertDataForTable(memberships);
      return setData((prev) => ({
        ...prev,
        memberships: membershipsData,
      }));
    }

  };

  return {
    membershipsState,
    toggleSelectedMemberships,
    toggleMainSelect,
    refetchMembers,
  };
};
