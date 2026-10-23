import { z } from "zod";

const ApiErrorSchema = z.object({
  message: z.union([z.string(), z.array(z.string())]),
});

const toText = (message: string | string[]) =>
  Array.isArray(message) ? message.join(", ") : message;

export const parseErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (typeof error === "string" && error) {
    return error;
  }

  const parsed = ApiErrorSchema.safeParse(error);

  if (parsed.success) {
    return toText(parsed.data.message);
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return defaultMessage;
};

// RTK Query оборачивает тело ответа в data, поэтому проверяем оба уровня
export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  const direct = parseErrorMessage(error, defaultMessage);
  if (direct !== defaultMessage) return direct;

  if (error && typeof error === "object" && "data" in error) {
    return parseErrorMessage((error as { data: unknown }).data, defaultMessage);
  }

  return defaultMessage;
};
