import { VolunteerRole } from './volunteer-role.enum';

export interface Volunteer {
    details: {
        forename: string;
        middleNames?: string;
        surname: string;
        telephone: string;
        email: string;
        streetName: string;
        address1: string;
        address2?: string;
        town: string;
        county: string;
        postCode: string;
    };
    volunteerGroup: {
        volunteerGroupName: string;
        volunteerGroupLink: string;
        volunteerRole: string;
    };
    checks: {
        hasCriminalRecord: boolean;
        dbsNumber: string;
        disclaimerSigned: boolean;
    };

    workingCounties: string[];
    roles?: VolunteerRole[];
}
