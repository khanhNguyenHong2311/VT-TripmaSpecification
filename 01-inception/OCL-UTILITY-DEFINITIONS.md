Utility Function Definitions (for Business Rules):

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

DateTimeUtility.timeBandIn(dateTime, timeZone):
- Returns the configured departure-time band containing the supplied instant when interpreted in the supplied time zone.

CityTimeZoneResolver.forCity(city):
- Returns the canonical time zone associated with a city in the caller's city catalogue.

CityCatalogue.includes(city):
- Returns true when the normalized city value exists in the caller's canonical city catalogue.

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
  +timeBandIn(dateTime: DateTime, timeZone: TimeZone): DepartureTimeBand
}

class CityTimeZoneResolver <<Utility>> {
  +forCity(city: String): TimeZone
}

class CityCatalogue <<Utility>> {
  +includes(city: String): Boolean
}
