"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createBoerenbridgeScoreboardSchema,
    CreateBoerenbridgeScoreboardForm,
    CreateBoerenbridgeScoreboardFormInput,
} from "@/validation/create-boerenbridge-scoreboard-schema";
import { useTranslations } from "next-intl";
import { Plus, Trash } from "lucide-react";
import { useCreateBoerenbridgeScoreboardWithGameMutation } from "@/mutations/use-scoreboard-mutations";
import { UUID } from "crypto";

type Props = {
    open: boolean;
    scoreboardName: string;
    onClose: (createdScoreboardId: UUID | null) => void;
};

const defaultPlayers = [
    { playerName: "" },
    { playerName: "" },
    { playerName: "" },
    { playerName: "" },
];

export default function CreateBoerenbridgeScoreboardDialog(props: Props) {
    const { open, scoreboardName, onClose } = props;

    const t = useTranslations("boerenbridge.createGameDialog");
    const createMutation = useCreateBoerenbridgeScoreboardWithGameMutation();

    const form = useForm<CreateBoerenbridgeScoreboardFormInput>({
        mode: "onBlur",
        resolver: zodResolver(createBoerenbridgeScoreboardSchema, undefined, {
            raw: true,
        }),
        defaultValues: {
            scoreboardName: "",
            pointsPerCorrectGuess: "2",
            players: defaultPlayers,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "players",
    });

    function handleClose(createdScoreboardId: UUID | null) {
        form.reset({
            scoreboardName: "",
            pointsPerCorrectGuess: "2",
            players: defaultPlayers,
        });
        onClose(createdScoreboardId);
    }

    async function handleSubmit(data: CreateBoerenbridgeScoreboardFormInput) {
        const parsedData: CreateBoerenbridgeScoreboardForm =
            createBoerenbridgeScoreboardSchema.parse({
                ...data,
                scoreboardName,
            });
        const createdScoreboard = await createMutation.mutateAsync(parsedData);

        handleClose(createdScoreboard.id);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleClose(null);
                }
            }}
        >
            <DialogContent className="sm:max-w-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <DialogHeader>
                            <DialogTitle>{t("title")}</DialogTitle>
                            <DialogDescription>{t("description")}</DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="pointsPerCorrectGuess"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("pointsPerCorrectGuessLabel")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            value={field.value ?? ""}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-3">
                            {fields.map((playerField, index) => (
                                <div
                                    key={playerField.id}
                                    className="flex items-end gap-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`players.${index}.playerName`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>
                                                    {t("playerLabel", {
                                                        index: index + 1,
                                                    })}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={t(
                                                            "playerPlaceholder",
                                                            {
                                                                index: index + 1,
                                                            },
                                                        )}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        disabled={fields.length <= 1}
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({ playerName: "" })}
                                disabled={fields.length >= 52}
                            >
                                <Plus size={16} />
                                {t("addPlayerButton")}
                            </Button>
                        </div>

                        <DialogFooter>
                            <Button type="submit">{t("confirmButton")}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
