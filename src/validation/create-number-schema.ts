import { z, ZodNullable, ZodNumber } from "zod";
import stringToNumber from "@/utils/funcs/string-to-number";

/**
 * Create a schema that parses a number. Under the hood, it uses the {@link stringToNumber `stringToNumber`} function to convert the string to a number.
 *
 * If you want `""` to be converted to `null`, you can put `z.number().nullable()` as the output schema. Adding `.nullable()` after the function does not work.
 *
 * @example
 * ```ts
 * const schema = createNumberSchema(z.number().nullable(), "Invalid number");
 *
 * console.log(schema.parse(null)) // null
 * console.log(schema.parse("")); // null
 * console.log(schema.parse("1")); // 1
 * console.log(schema.parse("1.5")); // 1.5
 * console.log(schema.parse("abc")); // throws an error with message `"Invalid number"`
 * ```
 *
 * @param outputSchema The schema to use for the output. Defaults to {@link z.number `z.number`}. This is where you can add additional validation.
 * @param errorMessage The error message to use when the value is not a valid number..
 */
export default function createNumberSchema<T extends ZodNullable<ZodNumber>>(
    outputSchema?: T,
    errorMessage?: string,
) {
    const message = errorMessage ?? "Invalid number";
    const schema = (outputSchema ?? z.number({ message }).nullable()) as T;

    return z.preprocess((val, ctx) => {
        try {
            if (val === "" || val == null) {
                return null;
            }

            return stringToNumber(val as string);
        } catch {
            ctx.addIssue({
                message: message,
                code: "custom",
            });
        }
    }, schema);
}
