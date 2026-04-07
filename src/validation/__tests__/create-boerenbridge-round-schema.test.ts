import { describe, expect, it } from "bun:test";
import { createBoerenbridgeRoundSchema } from "@/validation/create-boerenbridge-round-schema";

describe("createBoerenbridgeRoundSchema", () => {
    it("parses numeric strings and numbers", () => {
        const result = createBoerenbridgeRoundSchema.parse({
            roundNumber: "2",
            entries: [
                {
                    playerId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
                    expectedWins: "1",
                    actualWins: 1,
                },
            ],
        });

        expect(result).toEqual({
            roundNumber: 2,
            entries: [
                {
                    playerId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
                    expectedWins: 1,
                    actualWins: 1,
                },
            ],
        });
    });

    it("rejects empty numeric text", () => {
        const result = createBoerenbridgeRoundSchema.safeParse({
            roundNumber: "",
            entries: [
                {
                    playerId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
                    expectedWins: 0,
                    actualWins: 0,
                },
            ],
        });

        expect(result.success).toBe(false);
    });

    it("rejects non numeric text", () => {
        const result = createBoerenbridgeRoundSchema.safeParse({
            roundNumber: "abc",
            entries: [
                {
                    playerId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
                    expectedWins: 0,
                    actualWins: 0,
                },
            ],
        });

        expect(result.success).toBe(false);
    });

    it("rejects invalid uuid values", () => {
        const result = createBoerenbridgeRoundSchema.safeParse({
            roundNumber: 1,
            entries: [
                {
                    playerId: "invalid-uuid",
                    expectedWins: 0,
                    actualWins: 0,
                },
            ],
        });

        expect(result.success).toBe(false);
    });
});
