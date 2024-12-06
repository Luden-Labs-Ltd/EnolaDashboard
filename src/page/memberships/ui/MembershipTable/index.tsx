"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { UniversalTable } from "@widgets/UniversalTable";
import { renderCeilDropDownItemsType } from "@widgets/UniversalTable/ui/Ceil";
import { useMembershipsStore } from "entities/memberships";
import { DeleteMembership } from "features/delete-membership";
import EditMembershipModal from "features/edit-membership/ui/EditMembershipModal";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import DeleteIcon from "shared/assets/DeleteIcon";
import EditIcon from "shared/assets/EditIcon";

export const MembershipTable = () => {
  const t = useTranslations();

  const params = useParams();
  const familyId = params.familyId as string;

  const { membershipsState, toggleMainSelect, toggleSelectedMemberships } =
    useMembershipsStore();
  const { memberships, selectedMemberships } = membershipsState;
  const renderCeilDropDownItems = useCallback<renderCeilDropDownItemsType>(
    (ceil) => {
      return [
        {
          id: `${ceil.itemId}-edit`,
          label: t("Common.edit"),
          icon: "",
          href: ``,
          renderCustomComponent(onOpen, onClose) {
            return (
              <EditMembershipModal key={`${ceil.itemId}-edit`} familyId={familyId} membershipId={ceil.itemId}>
                <DropdownMenuItem
                  onClick={onOpen}
                  className={"DropdownMenuItem"}
                >
                  <EditIcon />
                  <span>{t("Common.edit")}</span>
                </DropdownMenuItem>
              </EditMembershipModal>
            );
          },
        },
        {
          id: `${ceil.itemId}-delete`,
          label: t("Common.delete"),
          icon: "",
          href: ``,
          renderCustomComponent: (onOpen, onClose) => {
            return (
              <DeleteMembership
                key={`${ceil.itemId}-delete`}
                familyId={familyId}
                membershipId={ceil.itemId}
              >
                <DropdownMenuItem
                  onClick={onOpen}
                  className={"DropdownMenuItem"}
                >
                  <DeleteIcon />
                  <span>{t("Common.delete")}</span>
                </DropdownMenuItem>
              </DeleteMembership>
            );
          },
        },
      ];
    },
    [t]
  );

  if (!memberships.length) {
    return <div className="flex min-h-[50vh] flex-1 justify-center items-center">
      {t('Common.pleaseCreate', {name: t('Common.memberships')})}
    </div>
  }
  return (
    <UniversalTable
      tableRawData={memberships}
      selectedColumnIds={selectedMemberships}
      toggleMainSelect={toggleMainSelect}
      toggleSelectedItems={toggleSelectedMemberships}
      renderCeilDropDownItems={renderCeilDropDownItems}
    />
  );
};
