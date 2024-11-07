import { ResourcesType } from "../model";

export const getResources = async (): Promise<ResourcesType[]> => {
  const resources: ResourcesType[] = [
    {
      id: "1",
      serviceName: "Legal House",
      organization: "Law Center",
      contactPerson: "John Doe",
      termsOfService: "Consultations on all types of legal matters.",
      phone: "+1-202-555-0134",
      email: "info@lawcenter.com",
      site: "https://www.lawcenter.com",
      category: "legal_rights",
    },
    {
      id: "2",
      serviceName: "Rainbow Kindergarten",
      organization: "Childhood Education",
      contactPerson: "Jane Smith",
      termsOfService: "Full-day groups for children aged 3 to 7.",
      phone: "+1-202-555-0175",
      email: "contact@rainbowkindergarten.com",
      site: "https://www.rainbowkindergarten.com",
      category: "childcare",
    },
    {
      id: "3",
      serviceName: "Emotional Support Center",
      organization: "Help Nearby",
      contactPerson: "Alice Johnson",
      termsOfService: "Confidential consultations on psychological issues.",
      phone: "+1-202-555-0148",
      email: "support@helpisnear.com",
      site: "https://www.helpisnear.com",
      category: "emotional",
    },
    {
      id: "4",
      serviceName: "Cozy Home",
      organization: "BuildHome",
      contactPerson: "Michael Brown",
      termsOfService: "Repair and arrangement of your apartment.",
      phone: "+1-202-555-0163",
      email: "info@buildhome.com",
      site: "https://www.buildhome.com",
      category: "home",
    },
    {
      id: "5",
      serviceName: "Health Clinic",
      organization: "MedCenter",
      contactPerson: "Emily Davis",
      termsOfService: "All types of medical services and examinations.",
      phone: "+1-202-555-0110",
      email: "contact@healthclinic.com",
      site: "https://www.healthclinic.com",
      category: "medical",
    },
    {
      id: "6",
      serviceName: "Info Center",
      organization: "Global Info",
      contactPerson: "David Wilson",
      termsOfService: "Providing reference information.",
      phone: "+1-202-555-0186",
      email: "info@globalinfo.com",
      site: "https://www.globalinfo.com",
      category: "general",
    },
    {
      id: "7",
      serviceName: "Pro Lawyer",
      organization: "LawAssist",
      contactPerson: "Carol Lee",
      termsOfService: "Legal assistance in court and pre-trial cases.",
      phone: "+1-202-555-0123",
      email: "lawyer@lawassist.com",
      site: "https://www.lawassist.com",
      category: "legal_rights",
    },
    {
      id: "8",
      serviceName: "Super Nanny",
      organization: "Children's Second Home",
      contactPerson: "Sophia Martinez",
      termsOfService: "Home nanny services for preschool children.",
      phone: "+1-202-555-0152",
      email: "service@homenanny.com",
      site: "https://www.homenanny.com",
      category: "childcare",
    }
  ];

  return resources;
};



