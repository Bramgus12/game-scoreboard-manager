import { DomainBaseModel } from "../base-model";

export type DomainUser = DomainBaseModel & {
    external_id: string;
    first_name: string;
    last_name: string;
    email: string;
};
