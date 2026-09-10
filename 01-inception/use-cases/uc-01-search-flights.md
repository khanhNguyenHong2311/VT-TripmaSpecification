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

# UC-01: Register an Account

> Canonical source: [Tripma Specification](https://docs.google.com/spreadsheets/d/1MWKBKTHG4J6is5z-MJ8rNgbOU72Vs0C5YG8ITCSoawY/edit?usp=sharing), tab Use cases, columns A-B. This frozen repository projection is read-only; source corrections must be made in the spreadsheet and imported as a new revision.

## Functional Use-Case Specification

### Use Case ID

UC-01

### Use Case Name

Search Flights

### Description

As a visitor, I want to search for flights by entering departure city, arrival city, dates, and passenger count so that I can view available flights, the price grid, and the price history.

### Actor(s)

Visitor

### Priority

High

### Trigger

The visitor opens the homepage and enters search criteria.

### Pre-Condition(s)

PRE-1: The frontend homepage route / is accessible. 
PRE-2: Search request query parameters are built from stored search params. 

### Post-Condition(s)

POST-1: On valid input, search parameters are saved to localStorage and the user is navigated to /flights. 
POST-2: On successful fetch, departing (and arriving, if round-trip) flights, price grid, and price history data are stored in component state for display. 
POST-3: On invalid input, the frontend displays visual error messages, no search parameters are saved, and no navigation occurs. 
POST-4: If no search parameters exist when /flights loads, the application displays a user-friendly 'No search criteria provided' state.

### Basic Flow

1. The visitor opens the homepage.
2. The frontend fetches the list of available cities from the backend database (via GET /api/cities) and dynamically populates the 'from' and 'to' city dropdowns.
3. The visitor selects the departure city (fromCity).
4. The visitor selects the arrival city (toCity).
5. The visitor selects the trip type (one-way/round-trip).
6. The visitor selects the departure date (startDate) from the calendar dropdown.
7. The visitor inputs the return date (endDate) into the calendar dropdown.
8. The visitor specifies the number of adults using the increment/decrement (+/-) controls.
9. The visitor specifies the number of minors using the increment/decrement (+/-) controls.
10. The visitor clicks the 'Search' button.
11. The frontend validates the search inputs.
12. The frontend saves search parameters to localStorage as a JSON string and navigates to /flights.
13. The /flights page loads and reads search parameters from localStorage.
14. The frontend builds the query string from stored parameters.
15. The frontend sends GET /api/flights with query parameters.
16. The backend validates the query parameters.
17. The backend queries departing flights from the database.
18. The backend applies filters to the departing flights.
19. The backend queries and applies filters to returning flights.
20. The backend constructs a JSON response containing departingFlights, arrivingFlights, priceGrid, and priceHistory arrays.
21. The frontend displays the flight results, price grid, price history, and the route map on the /flights page.

### Alternative Flow

AF-1: Apply flight filters
21a. The visitor specifies filter criteria for Maximum Price, Flight Times, or Airlines.
21b. The frontend applies the corresponding logical conditions to the existing flight arrays.
21c. The frontend displays only the subset of flights that match all specified filter conditions.

AF-2: Clear flight filters
21d. The visitor requests to clear the active filters.
21e. The frontend removes the Max Price, Times, and Airlines conditions and restores the flight arrays to their original unfiltered state.

AF-3: Change search criteria
3a. The visitor provides new search criteria (Departure City, Arrival City, Dates, or Passenger Count).
3b. The frontend validates the newly provided criteria.
3c. The frontend updates the search parameters and initiates a new flight search (Basic Flow resumes from step 14).

### Exception Flow

EF-1: No flights available
17a. If no flights match the database query, the backend returns empty arrays.
17b. The frontend displays an empty flight list with a 'No flights found for your dates' message but still renders the Price Grid.

EF-2: Client-side validation failure
11a. If the input validation fails, the frontend displays field-level validation errors (e.g., red text below the input) and stops execution without calling the API.

EF-3: Invalid backend request
16a. If the API request is invalid, the backend returns an error response.
16b. The frontend catches the error and displays a general validation error.

EF-4: Network/Server error
15a. If the API request fails (HTTP 500), the backend returns { message: 'Internal Server Error' }.
15b. The frontend catches the error and displays a generic server error state.  

### Related UI

Register page; SignUpForm; route /register; AuthContext

### Related API IDs

API-AUTH-REGISTER

### Notes

Scope clarification: This use case covers email/password registration only. Google sign-up is outside scope.

## UML Model

~~~plantuml
@startuml

class Flight <<Entity>> {
  flightId: String [1]
  fromCity: String [1]
  toCity: String [1]
  type: Boolean [1]
  imgPath: String [1]
  subtotalPrice: Float [1]
  taxesAndFees: Float [1]
  baggageFees: Float [1]
  airlineName: String [1]
  duration: String [1]
  stopsNumber: Integer [1]
  stopsInfo: String [0..1]
  fromToTime: String [1]
  date: DateTime [1]
}

class Seat <<Entity>> {
  flightId: String [1]
  type: String [1]
  seatNumber: String [1]
  available: Boolean [1]
  price: Float [1]
}

class SearchDto <<DTO>> {
  fromCity: String [1]
  toCity: String [1]
  startDate: String [1]
  endDate: String [0..1]
  adults: Integer [1]
  minors: Integer [1]
  type: Boolean [1]
}

class FlightDto <<DTO>> {
  flightId: String [1]
  fromCity: String [1]
  toCity: String [1]
  type: Boolean [1]
  imgPath: String [1]
  subtotalPrice: Float [1]
  taxesAndFees: Float [1]
  airlineName: String [1]
  duration: String [1]
  fromToTime: String [1]
  date: DateTime [1]
  availableSeats: Integer [1]
  stopsNumber: Integer [1]
  stopsInfo: String [0..1]
}

class PriceGridDto <<DTO>> {
  departingDate: Date [1]
  returningDate: Date [0..1]
  minPrice: Float [1]
}

class PriceHistoryDto <<DTO>> {
  recordedDate: Date [1]
  averagePrice: Float [1]
}

class SearchResponseDto <<DTO>> {
  departingFlights: FlightDto [0..*]
  arrivingFlights: FlightDto [0..*]
  priceGrid: PriceGridDto [0..*]
  priceHistory: PriceHistoryDto [0..*]
}

class FlightService <<Service>> {
  search(dto: SearchDto): SearchResponseDto
  isSearchInputValid(dto: SearchDto): Boolean {query}
}

Flight "1" -- "0..*" Seat : has

FlightService ..> SearchDto
FlightService ..> SearchResponseDto

SearchResponseDto "1" -- "0..*" FlightDto : contains
SearchResponseDto "1" -- "0..*" PriceGridDto : contains
SearchResponseDto "1" -- "0..*" PriceHistoryDto : contains
FlightDto ..> Flight : maps from

note right of FlightDto
  availableSeats is a calculated field 
  derived from the count of related Seat 
  entities where available = true.
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
  result.departingFlights->forAll(flight |
    flight.date >= dto.startDate and
    flight.date < dto.startDate + 24_HOURS
  )
post BR_SEARCH_003_ReturningDateRange:
  not dto.endDate.oclIsUndefined() implies
    result.arrivingFlights->forAll(flight |
      flight.date >= dto.endDate and
      flight.date < dto.endDate + 24_HOURS
    )
Technical constraints:
- All date filtering boundaries (the 24-hour window) must be calculated using the Departure Airport's Local Time, not UTC.
- The 24_HOURS boundary ensures flights departing late at night on the selected date are included.


BR-SEARCH-004: Round-trip requirements
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_004_EndDateRequired:
  dto.type = true implies not dto.endDate.oclIsUndefined()
post BR_SEARCH_004_OnlyWhenRoundTrip:
  (dto.type = false or dto.endDate.oclIsUndefined()) implies
    result.arrivingFlights->isEmpty()


BR-SEARCH-005: Flight city matching
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_005_DepartingCities:
  result.departingFlights->forAll(departingFlight |
    departingFlight.fromCity = dto.fromCity and
    departingFlight.toCity = dto.toCity
  )
post BR_SEARCH_005_ReversedCities:
  result.arrivingFlights->forAll(arrivingFlight |
    arrivingFlight.fromCity = dto.toCity and
    arrivingFlight.toCity = dto.fromCity
  )


BR-SEARCH-006: Invalid search handling
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_006_ValidInput:
  self.isSearchInputValid(dto)
Technical constraint: 
- Missing required fields or violation of validation rules must result in an immediate HTTP 400 Bad Request error.


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
  dto.startDate >= DateTime.now().truncateToDay()
Technical constraints:
- The system must use the Departure Airport's Local Time to determine 'today' (DateTime.now()) when validating that a selected date is not in the past.


BR-SEARCH-009: Valid date sequence for round trips
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_009_ValidReturnDate:
  not dto.endDate.oclIsUndefined() implies
    dto.endDate >= dto.startDate


BR-SEARCH-010: Unaccompanied minor restriction
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_010_AdultRequiredForMinors:
  dto.minors > 0 implies dto.adults >= 1
Technical constraints:
- The system shall not allow searching for minors without at least one accompanying adult.


BR-SEARCH-011: Maximum passenger limit
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_011_PassengerCap:
  let totalPassengers : Integer = dto.adults + dto.minors
  in
    totalPassengers <= 9
Technical constraints:
- Standard consumer bookings are capped at 9 passengers. The frontend UI should disable the passenger increment buttons once the sum reaches 9.


BR-SEARCH-012: Advance booking horizon
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
pre BR_SEARCH_012_MaxFutureStartDate:
  dto.startDate <= DateTime.now().truncateToDay() + 330_DAYS
pre BR_SEARCH_012_MaxFutureEndDate:
  not dto.endDate.oclIsUndefined() implies
    dto.endDate <= DateTime.now().truncateToDay() + 330_DAYS
Technical constraints:
- Airline schedules are typically not published beyond 330 days in advance. 
- The frontend calendar picker must disable all dates (both for departing and returning) that fall beyond this horizon.


BR-SEARCH-013: Price grid matrix calculation
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_013_PriceGridBounds:
  result.priceGrid->forAll(gridItem | 
    gridItem.departingDate >= dto.startDate - 3_DAYS and 
    gridItem.departingDate <= dto.startDate + 3_DAYS and
    if dto.type = true then 
      (gridItem.returningDate >= dto.endDate - 3_DAYS and 
       gridItem.returningDate <= dto.endDate + 3_DAYS)
    else
      gridItem.returningDate.oclIsUndefined()
    endif
  )
Technical constraint:
- For one-way trips, calculate the lowest `subtotalPrice` for flights matching the departing date.
- For round-trips, calculate the lowest combined price (departing + returning) for every cross-section in the matrix.


BR-SEARCH-014: Price history trend generation
context FlightService::search(
  dto : SearchDto
) : SearchResponseDto
post BR_SEARCH_014_HistoryBounds:
  result.priceHistory->forAll(historyItem | 
    historyItem.recordedDate < DateTime.now() and
    historyItem.recordedDate >= DateTime.now() - 30_DAYS
  )
Technical constraints:
- The backend must aggregate the average historical price for this specific route (fromCity to toCity) over the past 30 days to populate the Price History graph.

~~~

