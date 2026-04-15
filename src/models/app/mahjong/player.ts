import { AppBaseModel } from "@/models/app/base-model";
import { UUID } from "crypto";

export type AppMahjongPlayer = AppBaseModel & {
    gameId: UUID;
    name: string;
    seatIndex: number;
};
