import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(__dirname, "../.env")});

export interface Config {
    port: number;
    debugLogging: boolean;
    jwtSecret: string;
    databaseUrl: string;
}

const isDevMode = process.env.NODE_ENV == "development";

const config: Config = {
    port: +(process.env.PORT || 5000),
    debugLogging: isDevMode,
    jwtSecret: process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET",
    databaseUrl: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/apidb",
};

export {config};
