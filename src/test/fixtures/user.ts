type AppUserInput = {
    id?: string;
    externalId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export function createAppUser(input: AppUserInput = {}) {
    return {
        id: input.id ?? "33333333-3333-4333-8333-333333333333",
        externalId: input.externalId ?? "clerk_user_123",
        firstName: input.firstName ?? "Bram",
        lastName: input.lastName ?? "Gussekloo",
        email: input.email ?? "bram@example.com",
        createdAt: input.createdAt ?? new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: input.updatedAt ?? new Date("2026-01-01T00:00:00.000Z"),
    };
}
