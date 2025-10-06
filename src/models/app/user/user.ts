import { UUID } from "crypto";
import { AppBaseModel } from "../base-model";

export type AppUser = AppBaseModel & {
    externalId: UUID;
    firstName: string;
    lastName: string;
    email: string;
};
