/**
 * Represents every other fenes member
 */
export class MemberModel {
    // Programming informations
    id;
    // Personal informations
    lastName: string;
    firstName: string;
    username: string;
    phoneNumber: string;
    quarter: string;
    birthDate?: string;
    // Professionall informations
    job: string;
    enterprise: string;
    biography: string;
    // Social, Contacts
    email: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    website: string;
    // The password of the member
    password?: string;
    // Others
    competencies: Array<string>;
    interests: Array<string>;
    // Visual image of the member
    image?: string;

    constructor() {
        this.competencies = new Array<string>();
        this.interests = new Array<string>();
    }

}
