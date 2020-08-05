import { MemberModel } from './member-model';

/**
 * This class represents a connected user
 */
export class UserModel extends MemberModel {

    public lastConnectionDate;

    constructor(
        id,
        lastConnectionDate,
    ) {
        super();
        this.id = id;
        this.lastConnectionDate = lastConnectionDate;
    }
}
