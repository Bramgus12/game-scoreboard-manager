import { AppUser } from "../models/app/User";
import { DomainUser } from "../models/domain/User";

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
