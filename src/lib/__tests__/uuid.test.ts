import { describe, expect, it } from "bun:test";
import { isUuid, parseUuid } from "@/lib/uuid";

describe("uuid utilities", () => {
    it("returns true for valid uuids", () => {
        expect(isUuid("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa")).toBe(true);
    });

    it("returns false for invalid uuids", () => {
        expect(isUuid("not-a-uuid")).toBe(false);
    });

    it("returns the uuid when parse succeeds", () => {
        const uuid = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

        expect(parseUuid(uuid)).toBe(uuid);
    });

    it("throws when parse fails", () => {
        expect(() => parseUuid("invalid")).toThrow("Invalid UUID");
    });
});
