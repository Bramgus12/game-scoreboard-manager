import {
    Controller,
    FieldPath,
    FieldValues,
    UseControllerProps,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

export type Props<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    controller: UseControllerProps<TFieldValues, TName>;
} & TextFieldProps;

export default function FormTextField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ controller, ...restProps }: Props<TFieldValues, TName>) {
    return (
        <Controller
            {...controller}
            render={({ field, fieldState: { error, invalid } }) => {
                return (
                    <TextField
                        {...restProps}
                        {...field}
                        inputRef={field.ref}
                        error={invalid}
                        helperText={error?.message}
                    />
                );
            }}
        />
    );
}
