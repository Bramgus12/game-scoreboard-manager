import { UUID } from "crypto";
import { DomainBaseModel } from "../BaseModel";

export type DomainUser = DomainBaseModel & {
    externalId: UUID;
    firstName: string;
    lastName: string;
    email: string;
};
