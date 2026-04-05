import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "#/generated/prisma/client";

const createPrismaClient = () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error(
            "DATABASE_URL is not set. Provide a database URL before using Prisma-backed repositories.",
        );
    }

    const adapter = new PrismaPg({ connectionString: databaseUrl });

    return new PrismaClient({ adapter });
};

declare global {
    var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient | undefined = globalThis.prisma;

function getPrismaClient() {
    if (!prismaClient) {
        prismaClient = createPrismaClient();

        if (process.env.NODE_ENV !== "production") {
            globalThis.prisma = prismaClient;
        }
    }

    return prismaClient;
}

const proxyTarget: PrismaClient = Object.create(null);

const prisma: PrismaClient = new Proxy(proxyTarget, {
    get(_target, property) {
        const client = getPrismaClient();
        const value = Reflect.get(client, property);

        if (typeof value === "function") {
            return value.bind(client);
        }

        return value;
    },
});

export default prisma;
