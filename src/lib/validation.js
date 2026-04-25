import bcrypt from "bcryptjs";
import { z } from "zod";

export const airQualityPayloadSchema = z.object({
  nodeId: z.string().min(2),
  location: z.string().min(2),
  pm25: z.number().nonnegative(),
  co: z.number().nonnegative(),
  no2: z.number().nonnegative(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(8).trim(),
});

function getDemoOperator() {
  return {
    email: process.env.DEMO_LOGIN_EMAIL ?? "operator@atmosgrid.com",
    passwordHash:
      process.env.DEMO_LOGIN_PASSWORD_HASH
      ?? bcrypt.hashSync(process.env.DEMO_LOGIN_PASSWORD ?? "Operator@123", 10),
    name: "Control Room Operator",
  };
}

export async function verifyLoginCredentials({ email, password }) {
  const operator = getDemoOperator();

  if (email !== operator.email) {
    return null;
  }

  const valid = await bcrypt.compare(password, operator.passwordHash);
  if (!valid) {
    return null;
  }

  return {
    email: operator.email,
    name: operator.name,
  };
}
