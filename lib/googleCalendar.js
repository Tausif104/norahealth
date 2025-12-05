import { google } from "googleapis";

const calendar = google.calendar("v3");

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

  await auth.authorize();

  const event = {
    summary,
    description,
    location,
    start: {
      dateTime: start.toISOString(),
      timeZone: "Europe/London",
    },
    end: {
      dateTime: end.toISOString(),
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
