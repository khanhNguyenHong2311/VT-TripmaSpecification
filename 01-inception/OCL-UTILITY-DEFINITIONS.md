Utility Function Definitions (for Business Rules):

StringNormalizer.trim(s):
- Removes leading and trailing whitespace characters from s.
- Used to sanitize user input (e.g., city names) before validation and querying.

StringNormalizer.lower(s):
- Returns the lowercase representation of s.
- Used for case-insensitive comparison, specifically to ensure fromCity and toCity are distinct.

DateTimeUtility.now():
- Returns the current date and time.
- Business Context: This must ALWAYS be evaluated against the Departure Airport's Local Time (not the server's UTC time) to accurately validate booking horizons and past dates.

DateTimeUtility.truncateToDay(dateTime):
- Returns the date portion of a DateTime object, effectively resetting the time component to 00:00:00.
- Used to establish exact day boundaries for strict date comparisons.

FlightService.isSearchInputValid(dto):
- Returns true if the SearchDto contains all required fields and passes basic structural validation.
- Used as a pre-condition gatekeeper to trigger HTTP 400 Bad Request responses before database execution.

FlightBookingState.canContinue():
- Returns true if the user has fulfilled the flight selection requirements (1 flight for one-way, 2 flights for round-trip).
- Used to control the enabled/disabled state of the 'Passenger Information' navigation button.

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
}