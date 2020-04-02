import { VolunteerRole } from "./volunteer-role.enum";

export interface Volunteer {
  details?: {
    forename?: string;
    middleNames?: string;
    surname?: string;
    telephone?: string;
    email?: string;
    address1?: string;
    address2?: string;
    town?: string;
    county?: string;
    postCode?: string;
    socialMediaLink?: string;
  };
  volunteerGroup?: {
    name?: string;
    link?: string;
    role?: string;
  };
  checks?: {
    hasCriminalRecord?: boolean;
    dbsNumber?: string;
    disclaimerSigned?: boolean;
    gdprSigned?: boolean;
  };
  workingCounties?: string[];
  workingLocations?: string[];
  roles?: VolunteerRole;
  dateCreated?: any;
  approved?: boolean;
}
