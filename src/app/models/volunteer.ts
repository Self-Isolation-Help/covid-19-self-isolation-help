import { VolunteerRole } from './volunteer-role.enum';

export interface Volunteer {
    details: {
        forename: string;
        middleNames?: string;
        surname: string;
        telephone: string;
        email: string;
        address1: string;
        address2?: string;
        town: string;
        county: string;
        postCode: string;
    };
    volunteerGroup: {
        name: string;
        link: string;
        role: string;
    };
    checks: {
        hasCriminalRecord: boolean;
        dbsNumber: string;
        disclaimerSigned: boolean;
    };

    workingCounties: string[];
    roles?: VolunteerRole[];
}