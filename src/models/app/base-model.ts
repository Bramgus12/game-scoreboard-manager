import { UUID } from "crypto";

export type AppBaseModel = {
    createdAt: Date;
    updatedAt: Date;
    id: UUID;
};
