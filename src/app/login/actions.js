"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";
import { loginSchema, verifyLoginCredentials } from "@/lib/validation";

export async function loginAction(_prevState, formData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });  


  

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors.email?.[0]
        ?? parsed.error.flatten().fieldErrors.password?.[0]
        ?? "Enter a valid email and password.",
    };
  }

  const user = await verifyLoginCredentials(parsed.data);

  if (!user) {
    return {
      error: "Invalid credentials. Please try again.",
    };
  }

  await createSession(user);
  redirect("/dashboard");
}

export async function logoutAction() {
  const { clearSession } = await import("@/lib/auth");
  await clearSession();
  redirect("/login");
}
