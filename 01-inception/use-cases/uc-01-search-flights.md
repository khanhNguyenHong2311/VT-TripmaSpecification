---
artifact_type: business-use-case-specification
status: "Draft"
uc_id: UC-01
uc_name: "Search Flights"
source_type: google-sheets
source_spreadsheet_id: 1MWKBKTHG4J6is5z-MJ8rNgbOU72Vs0C5YG8ITCSoawY
source_sheet: "Use cases"
source_range: "A3:B34"
retrieved_at: 2026-08-27T03:49:28.570Z
---

# UC-01: Search Flights

> Source reference: [Tripma Specification](https://docs.google.com/spreadsheets/d/1MWKBKTHG4J6is5z-MJ8rNgbOU72Vs0C5YG8ITCSoawY/edit?usp=sharing), tab Use cases, columns A-B. This repository version may refine the reference behavior for the target system.

## Functional Use-Case Specification

### Use Case ID

UC-01

### Use Case Name

Search Flights

### Description

As a visitor, I want to provide my Tripma travel criteria so that I can review relevant flight options and supporting fare information.

### Actor(s)

Visitor

### Priority

High

### Trigger

The visitor starts a flight search from a Tripma search entry point.

### Pre-Condition(s)

PRE-1: A Tripma flight-search entry point is accessible.
PRE-2: The data required to render the search controls can be retrieved.

### Post-Condition(s)

POST-1: When the search is accepted, Tripma presents the corresponding flight-search experience.
POST-2: When search data is returned, Tripma makes the result set and supporting fare information available to the results interface.
POST-3: When the search cannot be accepted, Tripma informs the visitor and does not start that search.
POST-4: When the results interface has no search context, Tripma presents an informational empty state.

### Basic Flow

1. The visitor opens a Tripma flight-search entry point.
2. Tripma displays the search controls and their supporting travel data.
3. The visitor provides route information.
4. The visitor provides trip timing information.
5. The visitor provides traveller information.
6. The visitor submits the search.
7. Tripma checks the submitted search according to the Business Rules of this use case.
8. Tripma establishes the search context and opens the flight-results experience.
9. Tripma requests flight-search data through API-FLIGHTS-SEARCH.
10. The search service evaluates the request according to the Business Rules of this use case.
11. The search service obtains the relevant Tripma flight and fare data.
12. The search service returns the API-FLIGHTS-SEARCH response.
13. Tripma presents the flight options, fare information, and route context to the visitor.

### Alternative Flow

AF-1: Refine displayed flights
13a. The visitor chooses one or more refinements offered by the results interface.
13b. Tripma refreshes the displayed flight options using the selected refinements.

AF-2: Clear flight filters
13c. The visitor clears the active refinements.
13d. Tripma restores the result presentation for the current search context.

AF-3: Change search criteria
13e. The visitor edits the current travel criteria.
13f. The visitor submits the revised search.
13g. The Basic Flow resumes at step 7.

### Exception Flow

EF-1: No flights available
11a. If the search service has no flight options to return, it returns a successful response with empty flight collections.
11b. Tripma presents a contextual no-results state and any supporting fare information supplied by the response.

EF-2: Client-side validation failure
7a. If the submitted search does not satisfy the Business Rules, Tripma identifies the affected input and does not send the flight-search request.

EF-3: Invalid backend request
10a. If the request is rejected by the search service, the service returns the API-FLIGHTS-SEARCH client-error response.
10b. Tripma informs the visitor that the search needs attention.

EF-4: Network/Server error
9a. If Tripma cannot complete the request because of a technical failure, it presents a recoverable error state.

### Related UI

Homepage search; flight-results page; search controls; flight filters; route map; fare grid; fare history

### Related API IDs

API-FLIGHTS-SEARCH

### Notes

Scope clarification: This use case covers discovering flight options. Selecting a flight and creating a booking are outside scope.

## UML Model

~~~plantuml
@startuml

class Flight <<Entity>> {
  id: UUID [1]
  fromCity: String [1]
  toCity: String [1]
  imgPath: String [1]
  subtotalPrice: Decimal [1]
  taxesAndFees: Decimal [1]
  baggageFees: Decimal [1]
  currency: String [1]
  airlineName: String [1]
  duration: String [1]
  stopsNumber: Integer [1]
  stopsInfo: String [0..1]
  fromToTime: String [1]
  date: DateTime [1]
  arrivalAt: DateTime [1]
}

class Seat <<Entity>> {
  id: UUID [1]
  flightId: UUID [1]
  seatClass: SeatClass [1]
  seatNumber: String [1]
  available: Boolean [1]
  price: Decimal [1]
  currency: String [1]
}

enum SeatClass {
  ECONOMY
  BUSINESS
}

class RoutePriceHistory <<Entity>> {
  id: UUID [1]
  fromCity: String [1]
  toCity: String [1]
  recordedAt: DateTime [1]
  price: Decimal [1]
  currency: String [1]
}

class SearchDto <<DTO>> {
  fromCity: String [1]
  toCity: String [1]
  startDate: Date [1]
  endDate: Date [0..1]
  adults: Integer [1]
  minors: Integer [1]
  type: Boolean [1]
}

class FlightDto <<DTO>> {
  flightId: UUID [1]
  fromCity: String [1]
  toCity: String [1]
  type: Boolean [1]
  imgPath: String [1]
  subtotalPrice: Decimal [1]
  taxesAndFees: Decimal [1]
  airlineName: String [1]
  duration: String [1]
  fromToTime: String [1]
  date: DateTime [1]
  arrivalAt: DateTime [1]
  availableSeats: Integer [1]
  stopsNumber: Integer [1]
  stopsInfo: String [0..1]
}

class PriceGridDto <<DTO>> {
  departingDate: Date [1]
  returningDate: Date [0..1]
  minPrice: Decimal [1]
}

class PriceHistoryDto <<DTO>> {
  recordedDate: Date [1]
  averagePrice: Decimal [1]
}

enum DepartureTimeBand {
  MORNING
  AFTERNOON
  EVENING
}

class FlightFilterDto <<DTO>> {
  maxTotalPrice: Decimal [0..1]
  departureTimeBand: DepartureTimeBand [0..1]
  airlines: String [0..*]
}

class SearchResponseDto <<DTO>> {
  currency: String [1]
  departingFlights: FlightDto [0..*]
  arrivingFlights: FlightDto [0..*]
  priceGrid: PriceGridDto [0..*]
  priceHistory: PriceHistoryDto [0..*]
}

class FlightService <<Service>> {
  search(dto: SearchDto): SearchResponseDto
}

class FlightFilterService <<Service>> {
  apply(flights: FlightDto [0..*], filter: FlightFilterDto): FlightDto [0..*]
}

Flight "1" -- "0..*" Seat : has

FlightService ..> SearchDto
FlightService ..> SearchResponseDto
FlightFilterService ..> FlightFilterDto
FlightFilterService ..> FlightDto

SearchResponseDto "1" -- "0..*" FlightDto : contains
SearchResponseDto "1" -- "0..*" PriceGridDto : contains
SearchResponseDto "1" -- "0..*" PriceHistoryDto : contains
FlightDto ..> Flight : maps from
PriceHistoryDto ..> RoutePriceHistory : aggregates from

note right of FlightDto
  availableSeats is a calculated field 
  derived from the count of related Seat 
  entities where available = true.

  type is projected from SearchDto.type;
  it is not persisted on Flight.
end note

note right of SearchDto
  type = false represents one-way.
  type = true represents round-trip.
end note

note right of FlightFilterDto
  maxTotalPrice is expressed in the
  SearchResponseDto.currency of the
  currently displayed search result.
end note

@enduml
~~~

## Business Rules

The following rules are authoritative for Prompt E. OCL is preserved where supplied; technical or non-OCL constraints remain authoritative natural-language requirements.

~~~text
BR-SEARCH-001: Valid passenger count
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_001_NonNegative:
  dto.adults >= 0 and dto.minors >= 0
pre BR_SEARCH_001_TotalPassengers:
  let totalPassengers : Integer = dto.adults + dto.minors
  in
    totalPassengers > 0


BR-SEARCH-002: Sufficient seating capacity
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_002_CapacityMet:
  let totalPassengers : Integer = dto.adults + dto.minors
  in
    result.departingFlights->forAll(flight | flight.availableSeats >= totalPassengers) and
    result.arrivingFlights->forAll(flight | flight.availableSeats >= totalPassengers)


BR-SEARCH-003: Flight date boundaries
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_003_DepartingDateRange:
  let zone : TimeZone = CityTimeZoneResolver.forCity(dto.fromCity),
      dayStart : DateTime = DateTimeUtility.startOfDay(dto.startDate, zone),
      nextDayStart : DateTime = DateTimeUtility.startOfNextDay(dto.startDate, zone)
  in
    result.departingFlights->forAll(flight |
      flight.date >= dayStart and flight.date < nextDayStart
    )
post BR_SEARCH_003_ReturningDateRange:
  dto.type = true implies
    let zone : TimeZone = CityTimeZoneResolver.forCity(dto.toCity),
        dayStart : DateTime = DateTimeUtility.startOfDay(dto.endDate, zone),
        nextDayStart : DateTime = DateTimeUtility.startOfNextDay(dto.endDate, zone)
    in
      result.arrivingFlights->forAll(flight |
        flight.date >= dayStart and flight.date < nextDayStart
      )
Technical constraints:
- Tripma must resolve calendar-day boundaries through the canonical city time-zone catalogue; it must not approximate a local day with a fixed 24-hour UTC duration.


BR-SEARCH-004: Round-trip requirements
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_004_EndDateRequired:
  dto.type = true implies not dto.endDate.oclIsUndefined()
pre BR_SEARCH_004_EndDateOmittedForOneWay:
  dto.type = false implies dto.endDate.oclIsUndefined()
post BR_SEARCH_004_OnlyWhenRoundTrip:
  dto.type = false implies
    result.arrivingFlights->isEmpty()
post BR_SEARCH_004_TripTypeProjection:
  result.departingFlights->forAll(flight | flight.type = dto.type) and
  result.arrivingFlights->forAll(flight | flight.type = dto.type)


BR-SEARCH-005: Flight city matching
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_005_DepartingCities:
  result.departingFlights->forAll(departingFlight |
    lower(trim(departingFlight.fromCity)) = lower(trim(dto.fromCity)) and
    lower(trim(departingFlight.toCity)) = lower(trim(dto.toCity))
  )
post BR_SEARCH_005_ReversedCities:
  result.arrivingFlights->forAll(arrivingFlight |
    lower(trim(arrivingFlight.fromCity)) = lower(trim(dto.toCity)) and
    lower(trim(arrivingFlight.toCity)) = lower(trim(dto.fromCity))
  )
Technical constraint:
- The response must not silently omit a flight that satisfies every applicable eligibility rule for its leg.


BR-SEARCH-006: Required and well-formed search input
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_006_RequiredInput:
  not dto.fromCity.oclIsUndefined() and trim(dto.fromCity) <> '' and
  not dto.toCity.oclIsUndefined() and trim(dto.toCity) <> '' and
  not dto.startDate.oclIsUndefined() and
  not dto.adults.oclIsUndefined() and
  not dto.minors.oclIsUndefined() and
  not dto.type.oclIsUndefined()
pre BR_SEARCH_006_SupportedCities:
  CityCatalogue.includes(dto.fromCity) and
  CityCatalogue.includes(dto.toCity)
Technical constraint: 
- City membership and time-zone resolution must use the same canonical Tripma city catalogue; a rejected request maps to HTTP 400 before the search executes.


BR-SEARCH-007: Distinct origin and destination
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_007_DifferentCities:
  lower(trim(dto.fromCity)) <> lower(trim(dto.toCity))


BR-SEARCH-008: Future departure date
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_008_NoPastFlights:
  dto.startDate >= DateTimeUtility.todayIn(
    CityTimeZoneResolver.forCity(dto.fromCity)
  )
BR-SEARCH-009: Valid date sequence for round trips
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_009_ValidReturnDate:
  dto.type = true implies
    dto.endDate >= dto.startDate


BR-SEARCH-010: Unaccompanied minor restriction
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_010_AdultRequiredForMinors:
  dto.minors > 0 implies dto.adults >= 1
BR-SEARCH-011: Maximum passenger limit
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_011_PassengerCap:
  let totalPassengers : Integer = dto.adults + dto.minors
  in
    totalPassengers <= 9
Technical constraints:
- The frontend disables further passenger increments when the OCL limit has been reached.


BR-SEARCH-012: Advance booking horizon
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_012_MaxFutureStartDate:
  dto.startDate <= DateTimeUtility.todayIn(
    CityTimeZoneResolver.forCity(dto.fromCity)
  ) + 330_DAYS
pre BR_SEARCH_012_MaxFutureEndDate:
  dto.type = true implies
    dto.endDate <= DateTimeUtility.todayIn(
      CityTimeZoneResolver.forCity(dto.fromCity)
    ) + 330_DAYS
Technical constraints:
- The calendar disables dates outside the OCL booking horizon.


BR-SEARCH-013: Price grid matrix calculation
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_013_PriceGridBounds:
  let today : Date = DateTimeUtility.todayIn(
        CityTimeZoneResolver.forCity(dto.fromCity)
      ),
      horizon : Date = today + 330_DAYS
  in
    result.priceGrid->forAll(gridItem |
      gridItem.departingDate >= dto.startDate - 3_DAYS and
      gridItem.departingDate <= dto.startDate + 3_DAYS and
      gridItem.departingDate >= today and
      gridItem.departingDate <= horizon and
      if dto.type = true then
        not gridItem.returningDate.oclIsUndefined() and
        gridItem.returningDate >= dto.endDate - 3_DAYS and
        gridItem.returningDate <= dto.endDate + 3_DAYS and
        gridItem.returningDate >= gridItem.departingDate and
        gridItem.returningDate <= horizon
      else
        gridItem.returningDate.oclIsUndefined()
      endif
    )
post BR_SEARCH_013_UniqueGridCoordinates:
  result.priceGrid->isUnique(gridItem |
    Tuple {
      departingDate : Date = gridItem.departingDate,
      returningDate : Date = gridItem.returningDate
    }
  )
Technical constraints:
- A grid coordinate is present exactly once only when the required eligible flight option or pair exists.
- `minPrice` is the minimum eligible outbound subtotal for one-way searches and the minimum eligible outbound-plus-return subtotal for round-trip searches.


BR-SEARCH-014: Price history trend generation
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_014_HistoryBounds:
  let today : Date = DateTimeUtility.todayIn(
        CityTimeZoneResolver.forCity(dto.fromCity)
      )
  in
    result.priceHistory->forAll(historyItem |
      historyItem.recordedDate < today and
      historyItem.recordedDate >= today - 30_DAYS
    )
post BR_SEARCH_014_OnePointPerRecordedDate:
  result.priceHistory->isUnique(historyItem | historyItem.recordedDate)
post BR_SEARCH_014_ChronologicalOrder:
  result.priceHistory->size() <= 1 or
  Sequence{1..result.priceHistory->size()-1}->forAll(i |
    result.priceHistory->at(i).recordedDate <
    result.priceHistory->at(i + 1).recordedDate
  )
Technical constraints:
- Each represented local date contains the arithmetic mean of its stored fare observations for the normalized outbound route.
- A date without an observation is omitted rather than represented by a fabricated zero value.


BR-SEARCH-015: Monetary currency consistency
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_015_CurrencyDefined:
  not result.currency.oclIsUndefined() and trim(result.currency) <> ''
Technical constraints:
- `result.currency` must be an ISO 4217 currency code.
- Monetary values must be normalized to `result.currency` through the approved conversion and rounding policy before comparison or aggregation.


BR-SEARCH-016: Flight result filtering
context FlightFilterService::apply(
  flights : Sequence(FlightDto),
  filter : FlightFilterDto
) : Sequence(FlightDto)
pre BR_SEARCH_016_NonNegativeMaximumPrice:
  filter.maxTotalPrice.oclIsUndefined() or filter.maxTotalPrice >= 0
post BR_SEARCH_016_ResultSubset:
  result->forAll(flight | flights->includes(flight))
post BR_SEARCH_016_AllActiveFiltersMatch:
  result->forAll(flight |
    (filter.maxTotalPrice.oclIsUndefined() or
      flight.subtotalPrice + flight.taxesAndFees <= filter.maxTotalPrice) and
    (filter.departureTimeBand.oclIsUndefined() or
      DateTimeUtility.timeBandIn(
        flight.date,
        CityTimeZoneResolver.forCity(flight.fromCity)
      ) = filter.departureTimeBand) and
    (filter.airlines->isEmpty() or
      filter.airlines->exists(airline |
        lower(trim(airline)) = lower(trim(flight.airlineName))
      ))
  )
Technical constraints:
- `MORNING` covers local departure times from 00:00 inclusive to 12:00 exclusive; `AFTERNOON` covers 12:00 inclusive to 18:00 exclusive; `EVENING` covers 18:00 inclusive to the next 00:00.
- Filtering preserves the input order and does not mutate the original search response; clearing filters restores that response order.

~~~

