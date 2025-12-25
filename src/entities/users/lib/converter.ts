import { SorterObject } from "shared/types/sort";
import { CoordinatorApi } from "../api/types";
import { CoordinatorType, TableCoordinatorData } from "../model";
import { CoordinatorContextState } from "../model/providerCoordinator";
import { Program } from "entities/auth/api/types";
import { useTranslations } from "next-intl";

export function convertSingleCoordinatorData(
  coordinatorData: CoordinatorApi
): CoordinatorContextState {
  const coordinator: CoordinatorType = {
    id: String(coordinatorData.id),
    full_name: coordinatorData.full_name,
    phone_number: coordinatorData.phone_number,
    formatted_phone_number: coordinatorData.formatted_phone_number,
    boarded: coordinatorData.boarded,
    role: String(coordinatorData.role),
    first_name: coordinatorData.first_name,
    last_name: coordinatorData.last_name,
    gender: coordinatorData.gender,
    age: String(coordinatorData.age ?? ""),
    country_code: coordinatorData.country_code,
    country_name: coordinatorData.country_name,
    city: coordinatorData.city,
    about: coordinatorData.about,
    program_ids: coordinatorData.program_ids,
    lastSeen: new Date(coordinatorData.last_seen_at).toLocaleDateString(),
    dashboardAccess: coordinatorData.dashboard_access,
  };

  return {
    coordinator,
    coordinatorApi: coordinatorData,
  };
}

interface ReturnDataForCoordinatorsTableType {
  coordinatorsTableData: TableCoordinatorData[];
  sorterTableObject: SorterObject;
}

export function convertDataForCoordinatorsTable(
  coordinatorsData: CoordinatorApi[],
  programs: Program[],
  t: TFunction,
): ReturnDataForCoordinatorsTableType {
  const sorterObject: SorterObject = {
    id: {
      isSortAvailable: false,
      apiName: "id",
      availableSorts: ["desc", "asc"],
      sortType: "number",
    },
    full_name: {
      isSortAvailable: false,
      apiName: "full_name",
      availableSorts: ["desc", "asc"],
      sortType: "text",
    },
    phone_number: {
      isSortAvailable: false,
      apiName: "phone_number",
      availableSorts: ["desc", "asc"],
      sortType: "text",
    },
    role: {
      isSortAvailable: false,
      apiName: "role",
      availableSorts: ["desc", "asc"],
      sortType: "text",
    },
  };

  const coordinatorsTableData: TableCoordinatorData[] = coordinatorsData.map((coordinator) => ({
    id: String(coordinator.id),
    full_name: coordinator.full_name,
    phone_number: coordinator.formatted_phone_number,
    dashboardAccess: coordinator.dashboard_access ? t("Common.yes") : t("Common.no"),
    role: String(coordinator.role),
    programs: programs.filter((program) => coordinator.program_ids.includes(program.id)).map((program) => program.name).join(", "),
    lastSeen: coordinator.last_seen_at ? new Date(coordinator.last_seen_at).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : t("Common.never"),
  }));

  return {
    coordinatorsTableData,
    sorterTableObject: sorterObject,
  };
}
