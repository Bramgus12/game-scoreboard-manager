import { AppBaseModel } from "../base-model";

export type AppUser = AppBaseModel & {
    externalId: string;
    firstName: string;
    lastName: string;
    email: string;
};
