import { DomainUser } from "@/models/domain/user/user";
import { AppUser } from "@/models/app/user/user";
import { parseUuid } from "@/lib/uuid";

export function domainToAppUser(domainModel: DomainUser): AppUser {
    return {
        id: parseUuid(domainModel.id),
        firstName: domainModel.first_name,
        lastName: domainModel.last_name,
        email: domainModel.email,
        externalId: domainModel.external_id,
        createdAt: domainModel.created_at,
        updatedAt: domainModel.updated_at,
    };
}
