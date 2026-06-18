// Royal Mail Click & Drop API integration.
// Docs: https://api.parcel.royalmail.com/  (Business Integration / Click & Drop API)
//
// Required env:
//   ROYAL_MAIL_CLICK_DROP_API_KEY  -> API key from Click & Drop account (Settings > Integrations > API)
// Optional env:
//   ROYAL_MAIL_API_BASE            -> default "https://api.parcel.royalmail.com/api/v1"
//                                     (point at a test/sandbox Click & Drop account key for sandbox)
//   ROYAL_MAIL_SERVICE_CODE        -> RM service code to assign (needed for a trackable number, e.g. "TPN24")
//   ROYAL_MAIL_PACKAGE_FORMAT      -> "smallParcel" | "mediumParcel" | "largeLetter" | "letter" (default "smallParcel")
//   ROYAL_MAIL_WEIGHT_GRAMS        -> default package weight in grams (default 100)

const API_BASE =
  process.env.ROYAL_MAIL_API_BASE || "https://api.parcel.royalmail.com/api/v1";

const isConfigured = () => !!process.env.ROYAL_MAIL_CLICK_DROP_API_KEY;

/**
 * Create a Click & Drop order for a posted order and return its tracking number.
 *
 * @param {Object} args
 * @param {Object} args.order     - prisma Order ({ id, medicineName, ... })
 * @param {Object} args.customer  - { email, account: { firstName, lastName, phoneNumber, address, deliveryAddress, zipCode } }
 * @returns {Promise<{ trackingNumber: string|null, orderIdentifier: number|null }>}
 * @throws {Error} on missing config or API failure
 */
export async function createRoyalMailOrder({ order, customer }) {
  if (!isConfigured()) {
    throw new Error("Royal Mail API key not configured (ROYAL_MAIL_CLICK_DROP_API_KEY).");
  }

  const account = customer?.account || {};
  const fullName =
    `${account.firstName || ""} ${account.lastName || ""}`.trim() ||
    customer?.email ||
    "Customer";

  // "use what exists": freeform deliveryAddress -> addressLine1, zipCode -> postcode.
  // RM still requires a non-empty city; fall back so the request isn't rejected outright.
  const addressLine1 = account.deliveryAddress || account.address || "";
  const postcode = account.zipCode || "";

  const weightInGrams = Number(process.env.ROYAL_MAIL_WEIGHT_GRAMS) || 100;
  const packageFormatIdentifier =
    process.env.ROYAL_MAIL_PACKAGE_FORMAT || "smallParcel";
  const serviceCode = process.env.ROYAL_MAIL_SERVICE_CODE; // optional

  const item = {
    orderReference: `ORDER-${order.id}`,
    recipient: {
      address: {
        fullName,
        addressLine1,
        city: account.city || "N/A",
        postcode,
        countryCode: "GB",
      },
      phoneNumber: account.phoneNumber || undefined,
      emailAddress: customer?.email || undefined,
    },
    packages: [
      {
        weightInGrams,
        packageFormatIdentifier,
        contents: [
          {
            name: order.medicineName || "Medication",
            quantity: 1,
            unitValue: 0,
            unitWeightInGrams: weightInGrams,
          },
        ],
      },
    ],
    orderDate: new Date().toISOString(),
    subtotal: 0,
    shippingCostCharged: 0,
    total: 0,
    currencyCode: "GBP",
    postageDetails: {
      sendNotificationsTo: "sender",
      ...(serviceCode ? { serviceCode } : {}),
    },
  };

  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      // Click & Drop expects the raw API key in Authorization (no "Bearer ")
      Authorization: process.env.ROYAL_MAIL_CLICK_DROP_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ items: [item] }),
  });

  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }

  if (!res.ok) {
    throw new Error(
      `Royal Mail API ${res.status}: ${JSON.stringify(body).slice(0, 500)}`
    );
  }

  const failed = body?.failedOrders?.[0];
  if (failed) {
    throw new Error(
      `Royal Mail rejected order: ${failed.errorCode || ""} ${
        failed.errorMessage || JSON.stringify(failed)
      }`
    );
  }

  const created = body?.createdOrders?.[0];
  return {
    trackingNumber: created?.trackingNumber || null,
    orderIdentifier: created?.orderIdentifier ?? null,
  };
}

export { isConfigured as isRoyalMailConfigured };
