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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createMahjongGameSchema,
    CreateMahjongGameFormInput,
    createMahjongScoreboardSchema,
} from "@/validation/create-mahjong-scoreboard-schema";
import { useTranslations } from "next-intl";
import { UUID } from "crypto";
import { useCreateMahjongScoreboardWithGameMutation } from "@/mutations/use-scoreboard-mutations";
import { MAHJONG_RULE_PROFILE } from "@/constants/mahjong";

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

export default function CreateMahjongScoreboardDialog(props: Props) {
    const { open, scoreboardName, onClose } = props;

    const t = useTranslations("mahjong.createGameDialog");
    const createMutation = useCreateMahjongScoreboardWithGameMutation();

    const form = useForm<CreateMahjongGameFormInput>({
        mode: "onBlur",
        resolver: zodResolver(createMahjongGameSchema),
        defaultValues: {
            players: defaultPlayers,
            handLimit: "16",
            pointsLimit: "2000",
            ruleProfile: MAHJONG_RULE_PROFILE.NTS_2002_2019_V1,
        },
    });

    function handleClose(createdScoreboardId: UUID | null) {
        form.reset({
            players: defaultPlayers,
            handLimit: "16",
            pointsLimit: "2000",
            ruleProfile: MAHJONG_RULE_PROFILE.NTS_2002_2019_V1,
        });
        onClose(createdScoreboardId);
    }

    async function handleSubmit(data: CreateMahjongGameFormInput) {
        const payload = createMahjongScoreboardSchema.parse({
            ...data,
            scoreboardName,
        });
        const createdScoreboard = await createMutation.mutateAsync(payload);

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

                        <div className="space-y-3">
                            {defaultPlayers.map((_, index) => (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={`players.${index}.playerName`}
                                    render={({ field }) => (
                                        <FormItem>
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
                            ))}
                        </div>

                        <FormField
                            control={form.control}
                            name="handLimit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("handLimitLabel")}</FormLabel>
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

                        <FormField
                            control={form.control}
                            name="pointsLimit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("pointsLimitLabel")}</FormLabel>
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

                        <DialogFooter>
                            <Button type="submit">{t("confirmButton")}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
