import { z } from "zod";
import createNumberSchema from "@/validation/create-number-schema";

export const nonNegativeNullableNumberSchema = createNumberSchema(
    z
        .number({ message: "Invalid number" })
        .nonnegative("Must be non-negative")
        .nullable(),
    "Invalid number",
);
