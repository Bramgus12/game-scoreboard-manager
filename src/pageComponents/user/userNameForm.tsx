"use client";

import { Button, Grid2, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AppUser } from "@/models/app/user/User";
import { AppCreateUpdateUser } from "@/models/app/user/CreateUpdateUser";
import { useTranslations } from "next-intl";
import { updateDatabaseUser } from "@/actions/userActions";

export default function UserNameForm(props: { user: AppUser }) {
    const { user } = props;

    const form = useForm<AppCreateUpdateUser>({
        defaultValues: { firstName: user.firstName, lastName: user.lastName },
    });

    const t = useTranslations("accountSettings");

    async function onFormValid(data: AppCreateUpdateUser) {
        await updateDatabaseUser(data);

        alert("User updated");
    }

    return (
        <form onSubmit={form.handleSubmit(onFormValid)}>
            <Grid2 container spacing={2} justifyContent="flex-end">
                <Grid2 size={12}>
                    <Typography variant="subtitle1" fontWeight={700}>
                        {t("changeName.title")}
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                inputRef={field.ref}
                                label={t("changeName.firstName")}
                                required
                            />
                        )}
                        name="firstName"
                        rules={{ required: true }}
                        control={form.control}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                inputRef={field.ref}
                                label={t("changeName.lastName")}
                                required
                            />
                        )}
                        name="lastName"
                        rules={{ required: true }}
                        control={form.control}
                    />
                </Grid2>
                <Grid2>
                    <Button variant="contained" type="submit">
                        {t("changeName.saveName")}
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
}
