Utility Function Definitions (for Business Rules):

Business Rules may call the following functions without a utility-class prefix.

trim(s):
- Alias of StringNormalizer.trim(s).

lower(s):
- Alias of StringNormalizer.lower(s).

localDate(dateTime, timeZone):
- Alias of DateTimeUtility.localDate(dateTime, timeZone).

ageOn(dateOfBirth, referenceDate):
- Alias of DateTimeUtility.ageOn(dateOfBirth, referenceDate).

startOfDay(date, timeZone):
- Alias of DateTimeUtility.startOfDay(date, timeZone).

startOfNextDay(date, timeZone):
- Alias of DateTimeUtility.startOfNextDay(date, timeZone).

todayIn(timeZone):
- Alias of DateTimeUtility.todayIn(timeZone).

timeBandIn(dateTime, timeZone):
- Alias of DateTimeUtility.timeBandIn(dateTime, timeZone).

timeZoneForCity(city):
- Alias of CityTimeZoneResolver.forCity(city).

isSupportedCity(city):
- Alias of CityCatalogue.includes(city).

isOnLocalDate(dateTime, date, city):
- Returns true when dateTime falls within the supplied calendar date in the canonical time zone for city.

isStrictlyAscending(values):
- Returns true when the sequence has at most one item or every item is less than the next item.

isPriceGridDateEligible(search, gridItem):
- Returns true when the grid dates fall within three days of the requested dates and within the booking horizon; a round trip also requires a return date on or after its departure date, while a one-way item has no return date.

isEmail(email):
- Alias of EmailUtility.isValid(email).

isPhone(phone):
- Alias of PhoneUtility.isValidInternational(phone).

normalizePassengers(passengers):
- Returns the supplied passenger collection with names and identifiers trimmed, emails normalized, and supported telephone numbers represented canonically; undefined optional values remain undefined.

emergencyContactOf(form):
- Returns the normalized emergency contact resolved from the contact choice and primary-passenger reference in the supplied passenger form.

isEmergencyContactValid(form):
- Returns true when the selected primary passenger supplies valid contact channels, or when the separately supplied emergency contact has non-empty names and valid contact channels.

subtotalOf(flight):
- Returns zero when flight is undefined; otherwise returns flight.subtotalPrice.

taxesAndFeesOf(flight):
- Returns zero when flight is undefined; otherwise returns flight.taxesAndFees.

flightIdOf(flight):
- Returns undefined when flight is undefined; otherwise returns flight.flightId.

flightById(flights, flightId):
- Returns undefined when flightId is undefined; otherwise returns the single flight in flights with that flightId.

priceGridMinimum(search, gridItem):
- Returns the minimum eligible outbound subtotal for a one-way grid coordinate or the minimum eligible outbound-plus-return subtotal for a round-trip grid coordinate.

routePriceAverage(search, recordedDate):
- Returns the arithmetic mean of stored fare observations for the normalized outbound route on recordedDate.

priceRatingFor(flights, priceHistory):
- Returns undefined when no current flight fare can be evaluated. Otherwise, averagePrice is the arithmetic mean of current flight totals, projectedPrice is the non-negative fourteen-day projection produced from the chronological price-history trend, and projectedChangePercent is the percentage change from averagePrice. recommendation is BUY_SOON when the projection is higher than averagePrice and WAIT otherwise.

isSeatNumberAscending(seats):
- Returns true when the seat collection is ordered by its canonical seat-number ordering.

requiresUpgradeConfirmation(state, passengerRef, seat):
- Returns true only when the passenger currently has an Economy seat for the same flight and requests a different Business seat.

businessUpgradeAmount(state, passengerRef, seat):
- Returns the non-negative difference between the requested Business-seat price and the price of passengerRef's current Economy seat for the same flight.

seatFor(choices, passengerRef, flightId):
- Returns the single seat choice for passengerRef and flightId.

hasCompleteSeatCoverage(state):
- Returns true when there is exactly one choice for every passenger and required flight combination, no seat is shared on a flight, and no upgrade decision is pending.

isSeatAvailable(seatLists, seat):
- Returns true when the current seat-list response for seat.flightId contains the same seat identifier as available.

totalUpgradeAmount(choices):
- Returns the sum of upgradeAmount across the supplied choices in their common currency.

isSeatEligibleFor(state, passengerRef, flightLeg, seat):
- Returns true when passengerRef belongs to the current passenger context and seat appears in the current seat-list response for the flight represented by flightLeg.

StringNormalizer.trim(s):
- Removes leading and trailing whitespace characters from s.

StringNormalizer.lower(s):
- Returns the lowercase representation of s.

DateTimeUtility.now():
- Returns the current date and time supplied by the calling context.

DateTimeUtility.truncateToDay(dateTime):
- Returns the date portion of a DateTime object, effectively resetting the time component to 00:00:00.

DateTimeUtility.startOfDay(date, timeZone):
- Returns the first valid instant of the supplied local calendar date in the supplied time zone.

DateTimeUtility.startOfNextDay(date, timeZone):
- Returns the first valid instant of the local calendar date immediately following `date` in the supplied time zone.

DateTimeUtility.todayIn(timeZone):
- Returns the current local calendar date in the supplied time zone.

DateTimeUtility.localDate(dateTime, timeZone):
- Returns the local calendar date of the supplied instant in the supplied time zone.

DateTimeUtility.ageOn(dateOfBirth, referenceDate):
- Returns the number of complete calendar years between dateOfBirth and referenceDate.

DateTimeUtility.timeBandIn(dateTime, timeZone):
- Returns MORNING for local times from 00:00 inclusive to 12:00 exclusive, AFTERNOON from 12:00 inclusive to 18:00 exclusive, and EVENING from 18:00 inclusive to the next 00:00.

CityTimeZoneResolver.forCity(city):
- Returns the canonical time zone associated with a city in the caller's city catalogue.

CityCatalogue.includes(city):
- Returns true when the normalized city value exists in the caller's canonical city catalogue.

EmailUtility.isValid(email):
- Returns true when the trimmed value is a syntactically valid email address accepted by the target system.

EmailUtility.normalize(email):
- Returns the target system's canonical email representation after trimming and domain normalization.

PhoneUtility.isValidInternational(phone):
- Returns true when the value can be normalized to a supported international telephone number with 8 through 15 digits.

PhoneUtility.normalizeInternational(phone):
- Returns the canonical E.164 representation of a supported international telephone number.

' =========================
' Utility Classes
' =========================

class StringNormalizer <<Utility>> {
  +trim(s: String): String
  +lower(s: String): String
}

class DateTimeUtility <<Utility>> {
  +now(): DateTime
  +truncateToDay(dateTime: DateTime): DateTime
  +startOfDay(date: Date, timeZone: TimeZone): DateTime
  +startOfNextDay(date: Date, timeZone: TimeZone): DateTime
  +todayIn(timeZone: TimeZone): Date
  +localDate(dateTime: DateTime, timeZone: TimeZone): Date
  +ageOn(dateOfBirth: Date, referenceDate: Date): Integer
  +timeBandIn(dateTime: DateTime, timeZone: TimeZone): DepartureTimeBand
}

class CityTimeZoneResolver <<Utility>> {
  +forCity(city: String): TimeZone
}

class CityCatalogue <<Utility>> {
  +includes(city: String): Boolean
}

class EmailUtility <<Utility>> {
  +isValid(email: String): Boolean
  +normalize(email: String): String
}

class PhoneUtility <<Utility>> {
  +isValidInternational(phone: String): Boolean
  +normalizeInternational(phone: String): String
}
