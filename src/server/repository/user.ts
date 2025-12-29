"use server";

import { AppUser } from "@/models/app/user/user";
import { currentUser } from "@clerk/nextjs/server";
import { domainToAppUser } from "@/mappers/user";
import { randomUUID } from "node:crypto";
import { AppCreateUpdateUser } from "@/models/app/user/create-update-user";
import prisma from "@/utils/prisma";

export async function getDatabaseUser(): Promise<AppUser> {
    const authUser = await currentUser();

    if (authUser == null) {
        throw new Error("Auth user is null");
    }

    const user = await prisma.user.findFirst({
        where: {
            external_id: authUser.id,
        },
    });

    if (user != null) {
        await prisma.$disconnect();

        return domainToAppUser(user);
    }

    const userBasedOnEmail = await prisma.user.findFirst({
        where: {
            email: authUser.emailAddresses[0].emailAddress,
        },
    });

    if (userBasedOnEmail != null) {
        const updatedUser = await prisma.user.update({
            where: { id: userBasedOnEmail.id },
            data: { external_id: authUser.id },
        });

        await prisma.$disconnect();

        return domainToAppUser(updatedUser);
    }

    const createdUser = await prisma.user.create({
        data: {
            id: randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            external_id: authUser.id,
            email: authUser.emailAddresses[0].emailAddress,
            first_name: authUser.firstName ?? "",
            last_name: authUser.lastName ?? "",
        },
    });

    await prisma.$disconnect();

    return domainToAppUser(createdUser);
}

export async function updateDatabaseUser(data: AppCreateUpdateUser) {
    const user = await getDatabaseUser();

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            first_name: data.firstName,
            last_name: data.lastName,
        },
    });

    await prisma.$disconnect();

    return domainToAppUser(updatedUser);
}
