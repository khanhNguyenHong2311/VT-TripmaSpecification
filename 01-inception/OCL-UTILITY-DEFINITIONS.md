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

isEmail(email):
- Alias of EmailUtility.isValid(email).

isPhone(phone):
- Alias of PhoneUtility.isValidInternational(phone).

normalizePassengers(passengers):
- Returns the supplied passenger collection with names and identifiers trimmed, emails normalized, and supported telephone numbers represented canonically; undefined optional values remain undefined.

bookingContactOf(form):
- Returns the normalized booking contact resolved from the contact choice and primary-passenger reference in the supplied passenger form.

subtotalOf(flight):
- Returns zero when flight is undefined; otherwise returns flight.subtotalPrice.

taxesAndFeesOf(flight):
- Returns zero when flight is undefined; otherwise returns flight.taxesAndFees.

flightIdOf(flight):
- Returns undefined when flight is undefined; otherwise returns flight.flightId.

flightById(flights, flightId):
- Returns undefined when flightId is undefined; otherwise returns the single flight in flights with that flightId.

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
