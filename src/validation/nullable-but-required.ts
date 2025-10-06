import { z } from "zod";

/**
 * This utility function allows a zod schema to accept `null` values for initial form states
 * while still requiring non-null values during form submission validation.
 *
 * It's particularly useful when working with `react-hook-form` where we need to support
 * nullable initial values but enforce required fields on submit.
 *
 * @example
 * ```ts
 * const schema = nullableButRequired(z.string(), "Field is required");
 *
 * // Type will be `string | null`
 * type SchemaType = z.infer<typeof schema>;
 *
 * schema.parse("valid"); // Passes validation
 * schema.parse(null); // Throws error with message "Field is required"
 * ```
 *
 * @param zodValue - The zod schema to make nullable but required during validation
 * @param message - The error message to display when value is null
 */
export default function nullableButRequired<T extends z.ZodTypeAny>(
    zodValue: T,
    message: string,
) {
    return zodValue.nullable().refine((value): boolean => value != null, message);
}
