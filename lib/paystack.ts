const PAYSTACK_BASE_URL = "https://api.paystack.co";

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("Missing PAYSTACK_SECRET_KEY environment variable");
  return key;
}

export type InitializeTransactionParams = {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
};

export type InitializeTransactionResult = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

export async function initializeTransaction(
  params: InitializeTransactionParams
): Promise<InitializeTransactionResult> {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKobo,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Failed to initialize Paystack transaction");
  }
  return data.data;
}

export type VerifyTransactionResult = {
  status: "success" | "failed" | "abandoned" | string;
  reference: string;
  amount: number;
  paid_at: string | null;
  channel: string;
  customer: { email: string };
};

export async function verifyTransaction(reference: string): Promise<VerifyTransactionResult> {
  const res = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secretKey()}` },
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Failed to verify Paystack transaction");
  }
  return data.data;
}
