import { SorterObject } from "shared/types/sort";
import { CoordinatorApi } from "../api/types";
import { FullCoordinatorType, TableCoordinatorData } from "../model";
import { CoordinatorContextState } from "../model/providerCoordinator";


export function convertSingleCoordinatorData(
  coordinatorData: CoordinatorApi,
  token: string = ""
): CoordinatorContextState {
  const fullCoordinator: FullCoordinatorType = {
    id: Number(coordinatorData.id),
    token,
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
    families: { id: 0, title: "-" }, // families не приходит из API, подставляем заглушку
  };

  return {
    coordinator: fullCoordinator,
    coordinatorApi: coordinatorData,
  };
}

interface ReturnDataForCoordinatorsTableType {
  coordinatorsTableData: TableCoordinatorData[];
  sorterTableObject: SorterObject;
}

export function convertDataForCoordinatorsTable(
  coordinatorsData: CoordinatorApi[],
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
    city: {
      isSortAvailable: false,
      apiName: "city",
      availableSorts: ["desc", "asc"],
      sortType: "text",
    },
    boarded: {
      isSortAvailable: false,
      apiName: "boarded",
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
    boarded: coordinator.boarded,
    role: String(coordinator.role),
    first_name: coordinator.first_name,
    last_name: coordinator.last_name,
    gender: coordinator.gender,
    age: String(coordinator.age ?? ""),
    country_code: coordinator.country_code,
    country_name: coordinator.country_name,
    city: coordinator.city,
    about: coordinator.about,
  }));

  return {
    coordinatorsTableData,
    sorterTableObject: sorterObject,
  };
}
