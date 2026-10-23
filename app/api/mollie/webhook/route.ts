// Mollie calls this when a payment changes status. Only the payment id is sent;
// we fetch the real status from Mollie ourselves, so the request can't be spoofed.
export async function POST(req: Request) {
  const id = new URLSearchParams(await req.text()).get("id");
  const key = process.env.MOLLIE_API_KEY;
  if (!id || !key) return new Response(null, { status: 200 });

  const res = await fetch(`https://api.mollie.com/v2/payments/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) return new Response(null, { status: 502 }); // Mollie retries on non-200
  const payment = await res.json();

  if (payment.status === "paid") {
    // TODO: fulfilment. Email the order (payment.metadata) to the shop and a confirmation to the customer.
    console.log("PAID", payment.metadata?.orderId, payment.amount);
  }
  return new Response(null, { status: 200 });
}
