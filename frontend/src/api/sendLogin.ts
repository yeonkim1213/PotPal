import { toUrl } from "./toUrl";
import { User } from "../types/User";

type LoginResult =
  | { success: false; message: string }
  | { success: true; user: User; token: string };

export async function sendLogin(
  email: string,
  password: string,
): Promise<LoginResult> {
  const response = await fetch(toUrl("/api/users/login"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
}
