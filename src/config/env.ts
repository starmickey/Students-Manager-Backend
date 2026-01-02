import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z
    .string()
    .transform(Number)
    .refine(
      (value) => Number.isInteger(value) && value > 0,
      "PORT must be a valid positive number"
    ),

});

class Env {
  private static instance: Env;

  public readonly DATABASE_URL: string;
  public readonly NODE_ENV: string;
  public readonly PORT: number;

  private constructor() {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
      console.error("❌ Invalid environment variables");
      console.error(parsed.error.issues);
      throw new Error("Invalid environment configuration");
    }

    this.DATABASE_URL = parsed.data.DATABASE_URL;
    this.NODE_ENV = parsed.data.NODE_ENV;
    this.PORT = parsed.data.PORT;
  }

  public static getInstance(): Env {
    if (!Env.instance) {
      Env.instance = new Env();
    }

    return Env.instance;
  }
}

export const env = Env.getInstance();

export const loadEnv = () => Env.getInstance();
