import { DomainBaseModel } from "@/models/domain/base-model";

export type DomainMahjongHand = DomainBaseModel & {
    game_id: string;
    hand_number: number;
    prevailing_wind: string;
    win_type: string;
    winner_player_id: string | null;
    discarded_by_player_id: string | null;
    winner_points: number;
    is_limit_hand: boolean;
};
