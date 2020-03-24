export interface Isolator {
  location?: {
    lat?: string;
    lng?: string;
  };
  info: {
    needsMedicine?: boolean;
    needsFood?: boolean;
    needsSomeoneToTalkTo?: boolean;
    needsSomethingElse?: boolean;
    needsSomethingElseDescription?: string;
  };
  moreInfo?: string;
  details?: {
    forename?: string;
    surname?: string;
    telephone?: string;
    email?: string;
    dontShareAddress?: boolean;
    streetName?: string;
    address1?: string;
    address2?: string;
    town?: string;
    county?: string;
    postCode?: string;
    locationType?: string;
    selectedLocation: any;
  };
  hasCompletedForm: boolean;
  resolved?: boolean;
  id?: string;
  inProgress?: boolean;
}
