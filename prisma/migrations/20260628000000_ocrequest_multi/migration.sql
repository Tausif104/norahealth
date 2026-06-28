-- Convert Booking.ocRequest from single enum to enum array (multi-select).
-- Existing rows preserved: non-null -> single-element array, null -> empty array.
ALTER TABLE "Booking"
  ALTER COLUMN "ocRequest" DROP DEFAULT,
  ALTER COLUMN "ocRequest" TYPE "OcRequest"[] USING (
    CASE WHEN "ocRequest" IS NULL THEN ARRAY[]::"OcRequest"[]
         ELSE ARRAY["ocRequest"] END
  ),
  ALTER COLUMN "ocRequest" SET DEFAULT ARRAY[]::"OcRequest"[],
  ALTER COLUMN "ocRequest" SET NOT NULL;
