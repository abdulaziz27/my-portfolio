"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "IDENTIFIER_TOO_SHORT" }),
  email: z.string().email({ message: "INVALID_PROTOCOL" }),
  message: z.string().min(10, { message: "PAYLOAD_EMPTY" }),
});

export type ContactState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function sendContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Validate fields
  const validated = contactSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "VALIDATION_FAILED",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // Simulate network delay for "Terminal Effect"
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log("Transmission Received:", validated.data);
  }

  return {
    success: true,
    message: "TRANSMISSION_ESTABLISHED",
  };
}
