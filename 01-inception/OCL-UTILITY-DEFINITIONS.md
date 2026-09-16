Utility Function Definitions (for Business Rules):

Convention: Every operation defined in this file may be called directly by its operation name in OCL without its owning class prefix. Class names declare ownership only; separate alias definitions are not required.

StringNormalizer:
- `trim(s)` removes leading and trailing whitespace from `s`.
- `lower(s)` returns the lowercase representation of `s`.

DateTimeUtility:
- `now()` returns the current date and time supplied by the calling context.
- `days(count)` returns a calendar-day duration containing `count` days for date arithmetic.
- `truncateToDay(dateTime)` returns the date portion of `dateTime` at the start of that day.
- `startOfDay(date, timeZone)` returns the first valid instant of `date` in `timeZone`.
- `startOfNextDay(date, timeZone)` returns the first valid instant of the following local date in `timeZone`.
- `todayIn(timeZone)` returns the current calendar date in `timeZone`.
- `localDate(dateTime, timeZone)` returns the local calendar date of `dateTime` in `timeZone`.
- `ageOn(dateOfBirth, referenceDate)` returns the number of complete calendar years between the two dates.
- `timeBandIn(dateTime, timeZone)` returns the Tripma departure-time band containing the local time.
- `isOnLocalDate(dateTime, date, city)` returns true when `dateTime` falls on `date` in the canonical time zone for `city`.

CityTimeZoneResolver:
- `timeZoneForCity(city)` returns the canonical time zone associated with a supported city.

CityCatalogue:
- `isSupportedCity(city)` returns true when the normalized city exists in Tripma's supported city catalogue.

EmailUtility:
- `isEmail(email)` returns true when the normalized value is a syntactically valid email address accepted by Tripma.
- `normalizeEmail(email)` returns Tripma's canonical email representation.

PhoneUtility:
- `isPhone(phone)` returns true when the value is a supported international telephone number.
- `normalizePhone(phone)` returns the canonical international representation of the telephone number.

PasswordHasher:
- `hash(password, rounds)` returns a one-way password hash using the supplied work factor.
- `matches(password, hash)` returns true when `password` matches `hash`.
- `cost(hash)` returns the work factor encoded in `hash`.

FlightService:
- `priceGridMinimum(search, gridItem)` returns the minimum eligible outbound subtotal for one-way travel or outbound-plus-return subtotal for round-trip travel at the grid coordinate.
- `priceRatingFor(flights, priceHistory)` returns the current average, projected fare, percentage change, and Tripma recommendation derived from current results and chronological route-price history, or undefined when the supplied collections do not contain enough information to produce a rating.

PassengerInformationService:
- `normalizePassengers(passengers)` returns normalized passenger values while preserving undefined optional values.
- `emergencyContactOf(form)` returns the normalized emergency contact selected by the passenger form.

SeatService:
- `isSeatNumberAscending(seats)` returns true when seats follow Tripma's canonical alphanumeric seat-number ordering.

SeatSelectionService:
- `hasCompleteSeatCoverage(state)` returns true when the state contains exactly one eligible seat for every required passenger and flight leg, contains no shared seat on a flight, and has no pending upgrade decision.

MakePaymentService:
- `checkoutContextFor(seatSelectionContextKey)` returns the linked checkout context for the seat-selection reference, or undefined when it cannot be resolved.
- `hasConsistentCheckoutLineage(context)` returns true when the flight, passenger, and seat context references belong to the same Tripma checkout.
- `isPaymentCardNumber(cardNumber)` returns true when the card number has the supported shape and passes its checksum.
- `isCardSecurityCode(securityCode)` returns true when the security code has the supported shape.
- `isFutureCardExpiry(expireDate)` returns true when the card remains unexpired through the supplied expiration period.
- `isBillingAddressValid(address, context)` returns true when a usable billing address can be resolved from the selected address option and checkout context.
- `isCheckoutInventoryAvailable(context)` returns true when every selected flight and seat remains available for the current checkout.
- `baggageFeeTotal(context)` returns the combined checked-baggage charge for the required passengers and flight legs.
- `isCompleteBookingGraph(bookingId, context)` returns true when the booking owns exactly the persistence records required by the checkout context.

Utility and supporting service class declarations:

~~~plantuml
@startuml

class StringNormalizer <<Utility>> {
  trim(s: String): String
  lower(s: String): String
}

class DateTimeUtility <<Utility>> {
  now(): DateTime
  days(count: Integer): Duration
  truncateToDay(dateTime: DateTime): DateTime
  startOfDay(
    date: Date,
    timeZone: TimeZone
  ): DateTime
  startOfNextDay(
    date: Date,
    timeZone: TimeZone
  ): DateTime
  todayIn(timeZone: TimeZone): Date
  localDate(
    dateTime: DateTime,
    timeZone: TimeZone
  ): Date
  ageOn(
    dateOfBirth: Date,
    referenceDate: Date
  ): Integer
  timeBandIn(
    dateTime: DateTime,
    timeZone: TimeZone
  ): DepartureTimeBand
  isOnLocalDate(
    dateTime: DateTime,
    date: Date,
    city: String
  ): Boolean
}

class CityTimeZoneResolver <<Utility>> {
  timeZoneForCity(city: String): TimeZone
}

class CityCatalogue <<Utility>> {
  isSupportedCity(city: String): Boolean
}

class EmailUtility <<Utility>> {
  isEmail(email: String): Boolean
  normalizeEmail(email: String): String
}

class PhoneUtility <<Utility>> {
  isPhone(phone: String): Boolean
  normalizePhone(phone: String): String
}

class PasswordHasher <<Service>> {
  hash(
    password: String,
    rounds: Integer
  ): String
  matches(
    password: String,
    hash: String
  ): Boolean
  cost(hash: String): Integer
}

class FlightService <<Service>> {
  priceGridMinimum(
    search: SearchDto,
    gridItem: PriceGridDto
  ): Decimal
  priceRatingFor(
    flights: FlightDto [0..*],
    priceHistory: PriceHistoryDto [0..*]
  ): PriceRatingDto [0..1]
}

class PassengerInformationService <<Service>> {
  normalizePassengers(
    passengers: PassengerInputDto [1..*]
  ): PassengerInputDto [1..*]
  emergencyContactOf(
    form: PassengerFormDto
  ): EmergencyContactInputDto
}

class SeatService <<Service>> {
  isSeatNumberAscending(
    seats: SeatDto [0..*]
  ): Boolean
}

class SeatSelectionService <<Service>> {
  hasCompleteSeatCoverage(
    state: SeatSelectionState
  ): Boolean
}

class MakePaymentService <<Service>> {
  checkoutContextFor(
    seatSelectionContextKey: String
  ): CheckoutContextDto [0..1]
  hasConsistentCheckoutLineage(
    context: CheckoutContextDto
  ): Boolean
  isPaymentCardNumber(
    cardNumber: String
  ): Boolean
  isCardSecurityCode(
    securityCode: String
  ): Boolean
  isFutureCardExpiry(
    expireDate: Date
  ): Boolean
  isBillingAddressValid(
    address: BillingAddressInputDto,
    context: CheckoutContextDto
  ): Boolean
  isCheckoutInventoryAvailable(
    context: CheckoutContextDto
  ): Boolean
  baggageFeeTotal(
    context: CheckoutContextDto
  ): Decimal
  isCompleteBookingGraph(
    bookingId: UUID,
    context: CheckoutContextDto
  ): Boolean
}

@enduml
~~~
