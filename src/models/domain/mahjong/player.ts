import { DomainBaseModel } from "@/models/domain/base-model";

export type DomainMahjongPlayer = DomainBaseModel & {
    game_id: string;
    name: string;
    seat_index: number;
};
