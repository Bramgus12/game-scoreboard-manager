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
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createMahjongHandSchema,
    CreateMahjongHandFormInput,
} from "@/validation/create-mahjong-hand-schema";
import { UUID } from "crypto";
import { useTranslations } from "next-intl";
import { useCreateMahjongHandMutation } from "@/mutations/use-mahjong-mutations";
import useMahjongPlayersQuery from "@/queries/use-mahjong-players-query";
import { MAHJONG_WIN_TYPE } from "@/constants/mahjong";

type Props = {
    open: boolean;
    scoreboardId: UUID;
    onOpenChange: (open: boolean) => void;
};

export default function MahjongHandDialog(props: Props) {
    const { open, scoreboardId, onOpenChange } = props;
    const t = useTranslations("mahjong.handDialog");
    const createMutation = useCreateMahjongHandMutation();
    const { data: players } = useMahjongPlayersQuery(scoreboardId);

    const form = useForm<CreateMahjongHandFormInput>({
        mode: "onBlur",
        resolver: zodResolver(createMahjongHandSchema),
        defaultValues: {
            winType: MAHJONG_WIN_TYPE.SELF_DRAW,
            winnerPlayerId: null,
            discardedByPlayerId: null,
            winnerPoints: "20",
            isLimitHand: false,
        },
    });

    const winType = form.watch("winType");

    function handleClose() {
        form.reset({
            winType: MAHJONG_WIN_TYPE.SELF_DRAW,
            winnerPlayerId: null,
            discardedByPlayerId: null,
            winnerPoints: "20",
            isLimitHand: false,
        });
        onOpenChange(false);
    }

    async function handleSubmit(data: CreateMahjongHandFormInput) {
        const parsed = createMahjongHandSchema.parse(data);

        await createMutation.mutateAsync({
            scoreboardId,
            data: parsed,
        });

        handleClose();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleClose();
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
                            name="winType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("winTypeLabel")}</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);

                                            if (value === MAHJONG_WIN_TYPE.REMISE) {
                                                form.setValue(
                                                    "winnerPlayerId",
                                                    null,
                                                );
                                                form.setValue(
                                                    "discardedByPlayerId",
                                                    null,
                                                );
                                                form.setValue("winnerPoints", "0");
                                                form.setValue("isLimitHand", false);
                                            }

                                            if (
                                                value === MAHJONG_WIN_TYPE.SELF_DRAW
                                            ) {
                                                form.setValue(
                                                    "discardedByPlayerId",
                                                    null,
                                                );
                                            }

                                            if (value !== MAHJONG_WIN_TYPE.REMISE) {
                                                if (
                                                    form.getValues(
                                                        "winnerPoints",
                                                    ) === "0"
                                                ) {
                                                    form.setValue(
                                                        "winnerPoints",
                                                        "20",
                                                    );
                                                }
                                            }
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                value={MAHJONG_WIN_TYPE.SELF_DRAW}
                                            >
                                                {t("winTypeSelfDraw")}
                                            </SelectItem>
                                            <SelectItem
                                                value={MAHJONG_WIN_TYPE.DISCARD}
                                            >
                                                {t("winTypeDiscard")}
                                            </SelectItem>
                                            <SelectItem
                                                value={MAHJONG_WIN_TYPE.REMISE}
                                            >
                                                {t("winTypeRemise")}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {winType !== MAHJONG_WIN_TYPE.REMISE ? (
                            <FormField
                                control={form.control}
                                name="winnerPlayerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("winnerLabel")}</FormLabel>
                                        <Select
                                            value={field.value ?? ""}
                                            onValueChange={(value) =>
                                                field.onChange(value)
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={t(
                                                            "winnerPlaceholder",
                                                        )}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {players?.map((player) => (
                                                    <SelectItem
                                                        key={player.id}
                                                        value={player.id}
                                                    >
                                                        {player.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : null}

                        {winType === MAHJONG_WIN_TYPE.DISCARD ? (
                            <FormField
                                control={form.control}
                                name="discardedByPlayerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("discardedByLabel")}
                                        </FormLabel>
                                        <Select
                                            value={field.value ?? ""}
                                            onValueChange={(value) =>
                                                field.onChange(value)
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={t(
                                                            "discardedByPlaceholder",
                                                        )}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {players?.map((player) => (
                                                    <SelectItem
                                                        key={player.id}
                                                        value={player.id}
                                                    >
                                                        {player.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : null}

                        <FormField
                            control={form.control}
                            name="winnerPoints"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("winnerPointsLabel")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            value={field.value ?? ""}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                            disabled={
                                                winType === MAHJONG_WIN_TYPE.REMISE
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isLimitHand"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center gap-3 rounded-md border p-3">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) =>
                                                field.onChange(Boolean(checked))
                                            }
                                            disabled={
                                                winType === MAHJONG_WIN_TYPE.REMISE
                                            }
                                        />
                                    </FormControl>
                                    <FormLabel className="m-0">
                                        {t("isLimitHandLabel")}
                                    </FormLabel>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={createMutation.isPending}
                            >
                                {t("confirmButton")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
