import { UUID } from "crypto";

export type DomainBaseModel = {
    createdAt: string;
    updatedAt: string;
    id: UUID;
};
