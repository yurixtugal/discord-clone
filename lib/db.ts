import { PrismaClient } from "@prisma/client";
import { ArrowBigUpDash } from "lucide-react";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;