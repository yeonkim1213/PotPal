import { toUrl } from "./toUrl";
import { User } from "../types/User";

type SignupResult =
  | { success: false; message: string }
  | { success: true; user: User; token: string };

export async function sendSignup(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<SignupResult> {
  const { name, email, password } = payload;
  const response = await fetch(toUrl("/api/users/register/"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  return await response.json();
}
