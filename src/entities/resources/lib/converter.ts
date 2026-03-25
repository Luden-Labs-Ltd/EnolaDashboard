import { ResourcesTypeApi } from "../api/types";
import { ResourcesType } from "../model";


export type ConvertedResourcesState = {
  allTasks: ResourcesType[],
  resourcesCountByCategories: Record<string, number>
}

export const convertResourcesData = (
    resourcesApiData: ResourcesTypeApi[]
): ResourcesType[]=> {
  const mappedResources = resourcesApiData.map((resourceApi): ResourcesType => {
    const convertedResource: ResourcesType = {
        id: resourceApi.id,
        serviceName: resourceApi.name ?? "",
        organization: resourceApi.provider ?? "",
        contactPerson: resourceApi.contact_name ?? "",
        termsOfService: resourceApi.terms_of_service ?? "",
        accessRequirements: resourceApi.access_requirements ?? "",
        phone: resourceApi.formatted_phone_number ?? resourceApi.phone_number ?? "",
        email: resourceApi.email ?? "",
        site: resourceApi.link ?? "",
        address: resourceApi.address ?? "",
        category: resourceApi.category_id,
    };
    return convertedResource;
  });

  return mappedResources
};
