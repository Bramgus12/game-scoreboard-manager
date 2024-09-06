import { UUID } from "crypto";

export type DomainUser = {
    externalId: UUID;
    firstName: string;
    lastName: string;
    email: string;
    id: UUID;
};
