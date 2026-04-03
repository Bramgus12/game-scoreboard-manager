import { UUID } from "crypto";

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): value is UUID {
    return UUID_REGEX.test(value);
}

export function parseUuid(value: string): UUID {
    if (!isUuid(value)) {
        throw new Error("Invalid UUID");
    }

    return value;
}
