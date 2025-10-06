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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { GAME_TYPE } from "@/constants/gameType";
import { createScoreboard } from "@/actions/scoreboard-actions";
import { AppCreateScoreboard } from "@/models/app/scoreboard/create-scoreboard";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/query-key";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const createGameValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    gameType: z
        .string()
        .optional()
        .refine(
            (value) =>
                value === GAME_TYPE.BOERENBRIDGE || value === GAME_TYPE.KLAVERJAS,
            { error: "Invalid game type" },
        ),
});

type CreateGameForm = z.infer<typeof createGameValidationSchema>;

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

function toAppModel(data: CreateGameForm): AppCreateScoreboard {
    if (
        data.gameType !== GAME_TYPE.BOERENBRIDGE &&
        data.gameType !== GAME_TYPE.KLAVERJAS
    ) {
        throw new Error("Invalid game type");
    }

    return {
        scoreboardName: data.name,
        gameType: data.gameType,
    };
}

export default function CreateGameDialog(props: Props) {
    const { open, onOpenChange } = props;

    const queryClient = useQueryClient();
    const t = useTranslations("gamesTable.createGameDialog");

    const router = useRouter();

    const form = useForm<CreateGameForm>({
        defaultValues: {
            name: "",
        },
        mode: "onBlur",
        resolver: zodResolver(createGameValidationSchema),
    });

    function handleOpenChange(open: boolean) {
        if (!open) {
            form.reset();
        }
        onOpenChange(open);
    }

    async function handleSubmitNewGame(data: CreateGameForm) {
        const appModel = toAppModel(data);

        const createdScoreboard = await createScoreboard(appModel);

        void queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SCOREBOARDS_FOR_USER],
        });

        handleOpenChange(false);

        router.push(`/scoreboard/${createdScoreboard.id}`);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmitNewGame)}
                        className="flex flex-col gap-4"
                    >
                        <DialogHeader>
                            <DialogTitle>{t("title")}</DialogTitle>
                            <DialogDescription>{t("description")}</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>
                                                {t("gameNameLabel")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t(
                                                        "gameNamePlaceholder",
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                                name="name"
                            />
                            <FormField
                                control={form.control}
                                name="gameType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("gameTypeLabel")}</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        placeholder={t(
                                                            "gameTypePlaceholder",
                                                        )}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem
                                                    value={GAME_TYPE.KLAVERJAS}
                                                >
                                                    {t("klaverjas")}
                                                </SelectItem>
                                                <SelectItem
                                                    value={GAME_TYPE.BOERENBRIDGE}
                                                >
                                                    {t("boerenbridge")}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            {t("gameTypeDescription")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
