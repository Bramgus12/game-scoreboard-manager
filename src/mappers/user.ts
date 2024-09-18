import { DomainUser } from "../models/domain/user/User";
import { AppUser } from "../models/app/user/User";

export function DomainToAppUser(domainModel: DomainUser): AppUser {
    return {
        id: domainModel.id,
        firstName: domainModel.firstName,
        lastName: domainModel.lastName,
        email: domainModel.email,
        externalId: domainModel.externalId,
        createdAt: new Date(domainModel.createdAt),
        updatedAt: new Date(domainModel.updatedAt),
    };
}
