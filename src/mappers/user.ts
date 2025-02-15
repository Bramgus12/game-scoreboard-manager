import { DomainUser } from "@/models/domain/user/User";
import { AppUser } from "@/models/app/user/User";
import { UUID } from "crypto";

export function domainToAppUser(domainModel: DomainUser): AppUser {
    return {
        id: domainModel.id as UUID,
        firstName: domainModel.first_name,
        lastName: domainModel.last_name,
        email: domainModel.email,
        externalId: domainModel.external_id as UUID,
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}
