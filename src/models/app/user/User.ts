import { UUID } from "crypto";
import { AppBaseModel } from "../BaseModel";

export type AppUser = AppBaseModel & {
    externalId: UUID;
    firstName: string;
    lastName: string;
    email: string;
};
