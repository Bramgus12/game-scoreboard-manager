"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { coerceToNumber } from "@/page-components/scoreboard/boerenbridge/round-dialog-helpers";
import { CreateBoerenbridgeRoundFormInput } from "@/validation/create-boerenbridge-round-schema";
import { UseFormReturn } from "react-hook-form";

type Props = {
    playerName: string;
    playerIndex: number;
    step: 1 | 2;
    form: UseFormReturn<CreateBoerenbridgeRoundFormInput>;
    expectedWinsOptions: number[];
    actualWinsOptions: number[];
    expectedWinsLabel: string;
    actualWinsLabel: string;
};

export default function BoerenbridgeRoundDialogPlayerRow(props: Props) {
    const {
        playerName,
        playerIndex,
        step,
        form,
        expectedWinsOptions,
        actualWinsOptions,
        expectedWinsLabel,
        actualWinsLabel,
    } = props;

    const fieldName =
        step === 1
            ? (`entries.${playerIndex}.expectedWins` as const)
            : (`entries.${playerIndex}.actualWins` as const);

    const label = step === 1 ? expectedWinsLabel : actualWinsLabel;
    const options = step === 1 ? expectedWinsOptions : actualWinsOptions;

    return (
        <div className="grid grid-cols-12 items-center gap-2">
            <div className="col-span-12 sm:col-span-4">
                <span className="text-sm font-medium">{playerName}</span>
            </div>
            <FormField
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                    <FormItem className="col-span-12 sm:col-span-8">
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <div className="max-w-full overflow-x-auto pb-1">
                                <ButtonGroup aria-label={label} className="w-max">
                                    {options.map((option) => {
                                        const isSelected =
                                            coerceToNumber(field.value) === option;

                                        return (
                                            <Button
                                                key={option}
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                aria-pressed={isSelected}
                                                data-active={isSelected}
                                                className={
                                                    isSelected
                                                        ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground dark:border-primary dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 dark:hover:text-primary-foreground"
                                                        : undefined
                                                }
                                                onClick={() => {
                                                    field.onChange(String(option));
                                                    form.clearErrors("entries");
                                                }}
                                            >
                                                {option}
                                            </Button>
                                        );
                                    })}
                                </ButtonGroup>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
