import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z
    .string()
    .transform(Number)
    .refine(
      (value) => Number.isInteger(value) && value > 0,
      "PORT must be a valid positive number"
    ),

  NODE_ENV: z.enum(["development", "test", "production"]),
});

class Env {
  private static instance: Env;

  public readonly PORT: number;
  public readonly NODE_ENV: string;

  private constructor() {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
      console.error("❌ Invalid environment variables");
      console.error(parsed.error.issues);
      throw new Error("Invalid environment configuration");
    }

    this.PORT = parsed.data.PORT;
    this.NODE_ENV = parsed.data.NODE_ENV;
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
