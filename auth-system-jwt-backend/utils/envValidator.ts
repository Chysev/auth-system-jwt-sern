import { config } from "dotenv";

if (process.env.NODE_ENV === "production") {
  config({ path: ".env.prod" });
  console.log("Loaded Production Envornment Variables");
} else if (process.env.NODE_ENV === "development") {
  config({ path: ".env.dev" });
  console.log("Loaded Development Envornment Variables");
}

export = () => {
  const requiredVariables = [
    "BACKEND_BASE_URL",
    "FRONTEND_BASE_URL",
    "DATABASE_URL",
    "BACKEND_PORT",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
  ];

  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    console.error(
      `Missing required environment variables: ${missingVariables.join(", ")}`
    );
    process.exit(1);
  }

  if (isNaN(Number(process.env.BACKEND_PORT))) {
    console.error("BACKEND_PORT must be a number");
    process.exit(1);
  }

  if (
    !process.env.ACCESS_TOKEN_SECRET ||
    process.env.ACCESS_TOKEN_SECRET.length < 32
  ) {
    console.error("ACCESS_TOKEN_SECRET must be at least 32 characters long");
    process.exit(1);
  }

  if (
    !process.env.REFRESH_TOKEN_SECRET ||
    process.env.REFRESH_TOKEN_SECRET.length < 32
  ) {
    console.error("REFRESH_TOKEN_SECRET must be at least 32 characters long");
    process.exit(1);
  }

  console.log("Environment variables are valid.");
};
