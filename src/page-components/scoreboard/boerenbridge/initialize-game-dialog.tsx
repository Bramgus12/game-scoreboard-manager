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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UUID } from "crypto";
import { useTranslations } from "next-intl";
import { useFieldArray, useForm } from "react-hook-form";
import {
    createBoerenbridgePlayersSchema,
    CreateBoerenbridgePlayersForm,
} from "@/validation/create-boerenbridge-players-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useInitializeBoerenbridgePlayersMutation } from "@/mutations/use-boerenbridge-mutations";

type Props = {
    scoreboardId: UUID;
    open: boolean;
};

export default function InitializeBoerenbridgeGameDialog(props: Props) {
    const { scoreboardId, open } = props;

    const t = useTranslations("boerenbridge.initializeDialog");
    const initializePlayersMutation = useInitializeBoerenbridgePlayersMutation();

    const form = useForm<CreateBoerenbridgePlayersForm>({
        mode: "onBlur",
        resolver: zodResolver(createBoerenbridgePlayersSchema),
        defaultValues: {
            players: [
                { playerName: "" },
                { playerName: "" },
                { playerName: "" },
                { playerName: "" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "players",
    });

    async function handleSubmit(data: CreateBoerenbridgePlayersForm) {
        await initializePlayersMutation.mutateAsync({
            scoreboardId,
            data,
        });
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-md" showCloseButton={false}>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <DialogHeader>
                            <DialogTitle>{t("title")}</DialogTitle>
                            <DialogDescription>{t("description")}</DialogDescription>
                        </DialogHeader>

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
