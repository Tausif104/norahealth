import { google } from "googleapis";

const calendar = google.calendar("v3");

/**
 * Format a Date's UTC fields as a naive (offset-less) datetime string.
 * Bookings are stored so that the Date's UTC wall-clock equals the UK
 * wall-clock the user picked (e.g. 09:00 -> "...T09:00:00.000Z").
 * Emitting the naive string + timeZone "Europe/London" makes Google apply
 * the London zone to that wall-clock, so the event shows the picked time
 * (DST-correct) instead of double-applying the offset.
 */
function toNaiveDateTime(date) {
  const d = new Date(date);
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
  const da = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${y}-${mo}-${da}T${hh}:${mm}:${ss}`;
}

function getJwtClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!email) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL not set");
  }

  if (!key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY not set");
  }

  // If the key has literal "\n", turn them into real newlines
  if (key.includes("\\n")) {
    key = key.replace(/\\n/g, "\n");
  }

  // Optional sanity check
  if (!key.includes("BEGIN PRIVATE KEY")) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY looks malformed");
  }

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}
/**
 * Create event on Google Calendar
 * @param {Object} params
 * @param {string} params.calendarId
 * @param {Date} params.start
 * @param {Date} params.end
 * @param {string} params.summary
 * @param {string} params.description
 * @param {string} params.location
 * @param {string} params.email
 * @param {string} params.name
 */
export async function createCalendarEvent({
  calendarId,
  start,
  end,
  summary,
  description,
  location,
  email,
  name,
}) {
  const auth = getJwtClient();
  console.log("auth calander", auth);
  

  await auth.authorize();

  const event = {
    summary,
    description,
    location,
    start: {
      dateTime: toNaiveDateTime(start),
      timeZone: "Europe/London",
    },
    end: {
      dateTime: toNaiveDateTime(end),
      timeZone: "Europe/London",
    },
    // no attendees – service account for personal Gmail can't invite people
  };

  const res = await calendar.events.insert({
    auth,
    calendarId,
    requestBody: event,
  });

  return res.data;
}
