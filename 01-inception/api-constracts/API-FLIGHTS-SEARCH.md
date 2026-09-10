---
artifact_type: api-contract
status: Frozen
api_id: API-FLIGHTS-SEARCH
related_uc_id: UC-01
---

# API-FLIGHTS-SEARCH: Search Flights

## General Information

### API ID

API-FLIGHTS-SEARCH

### API Name

Search Flights

### Related Use Case IDs

UC-01

### Method

GET

### Path

/api/flights

### Description

Search for flights based on departure city, arrival city, dates, and passenger count. Returns departing and returning flights (if round-trip).

### Authentication

Public

### Authorization

None

## Request Header(s)

### headers.Accept

Type: string; Format: MIME type; Required: No; Nullable: No
Default: application/json
Allowed values: application/json
Trigger: Every request.
Description: Declares the expected response format.
Example: application/json

## Query Parameter(s)

### query.fromCity
Type: string; Required: Yes; Nullable: No
Trigger: Flight search request.
Description: Departure city name.
Example: """"New York""""

### query.toCity
Type: string; Required: Yes; Nullable: No
Trigger: Flight search request.
Description: Arrival city name.
Example: ""London""

### query.startDate
Type: string; Format: date; Required: Yes; Nullable: No
Trigger: Flight search request.
Description: Departure date.
Example: ""2024-08-15""

### query.endDate
Type: string; Format: date; Required: Conditionally (Yes if type=true); Nullable: Yes
Trigger: Flight search request for round-trip.
Description: Return date.
Example: ""2024-08-20""

### query.type
Type: boolean; Required: Yes; Nullable: No
Trigger: Flight search request.
Description: Trip type (true for round-trip, false for one-way).
Example: true

### query.adults
Type: integer; Required: Yes; Nullable: No
Trigger: Flight search request.
Description: Number of adult passengers.
Example: 2

### query.minors
Type: integer; Required: Yes; Nullable: No
Trigger: Flight search request.
Description: Number of minor passengers.
Example: 0

## Request Body

None

## Success Response — HTTP 200

### departingFlights
Type: array
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Array of departing flights matching criteria.
Example: []

### departingFlights[].flightId
Type: string
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Flight identifier.
Example: ""uuid"

### departingFlights[].fromCity
Type: string
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Departure city name.
Example: ""New York""

### departingFlights[].toCity
Type: string
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Arrival city name.
Example: ""London""

### departingFlights[].type
Type: boolean
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Flight type (true for round-trip).
Example: true

### departingFlights[].imgPath
Type: string
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Path to flight image.
Example: ""/path/to/image""

### departingFlights[].subtotalPrice
Type: number
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Base price of the flight.
Example: 500

### departingFlights[].taxesAndFees
Type: number
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Taxes and fees amount.
Example: 50

### departingFlights[].airlineName
Type: string
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Name of the airline.
Example: ""Airline Name""

### departingFlights[].duration
Type: string
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Flight duration.
Example: ""7h 30m""

### departingFlights[].fromToTime
Type: string
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Departure and arrival time.
Example: ""10:00 - 17:30""

### departingFlights[].date
Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Flight date and time.
Example: ""2024-08-15T10:00:00Z""

### departingFlights[].availableSeats
Type: number
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Number of available seats.
Example: 150

### departingFlights[].stopsNumber
Type: number
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Number of stops.
Example: 0

### departingFlights[].stopsInfo
Type: string
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Stop information.
Example: ""Direct""

### arrivingFlights
Type: array
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Array of returning flights matching criteria (empty if one-way).
Example: []

### arrivingFlights[].flightId
Type: string
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Flight identifier.
Example: ""uuid""

### arrivingFlights[].fromCity
Type: string
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Departure city name.
Example: ""London""

### arrivingFlights[].toCity
Type: string
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Arrival city name.
Example: ""New York""

### arrivingFlights[].type
Type: boolean
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Flight type (true for round-trip).
Example: true

### arrivingFlights[].imgPath
Type: string
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Path to flight image.
Example: ""/path/to/image""

### arrivingFlights[].subtotalPrice
Type: number
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Base price of the flight.
Example: 500

### arrivingFlights[].taxesAndFees
Type: number
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Taxes and fees amount.
Example: 50

### arrivingFlights[].airlineName
Type: string
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Name of the airline.
Example: ""Airline Name""

### arrivingFlights[].duration
Type: string
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Flight duration.
Example: ""7h 30m""

### arrivingFlights[].fromToTime
Type: string
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Departure and arrival time.
Example: ""10:00 - 17:30""

### arrivingFlights[].date
Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Flight date and time.
Example: ""2024-08-20T10:00:00Z""

### arrivingFlights[].availableSeats
Type: number
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Number of available seats.
Example: 150

### arrivingFlights[].stopsNumber
Type: number
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Number of stops.
Example: 0

### arrivingFlights[].stopsInfo
Type: string
Required: Yes
Nullable: No
Trigger: Successful search with round-trip.
Description: Stop information.
Example: ""Direct"""

### priceGrid
Type: array
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Matrix of lowest prices for flexible dates (+/- 3 days).
Example: []

### priceGrid[].departingDate
Type: string; Format: date
Required: Yes
Nullable: No
Trigger: Successful search.
Description: The departure date in the grid matrix.
Example: "2024-08-12"

### priceGrid[].returningDate
Type: string; Format: date
Required: Conditionally (Yes if type=true)
Nullable: Yes
Trigger: Successful search for round-trip.
Description: The returning date in the grid matrix (null for one-way).
Example: "2024-08-17"

### priceGrid[].minPrice
Type: number
Required: Yes
Nullable: No
Trigger: Successful search.
Description: The lowest combined price for this specific date cross-section.
Example: 450

### priceHistory
Type: array
Required: Yes
Nullable: No
Trigger: Successful search.
Description: Array of historical average prices for the past 30 days.
Example: []

### priceHistory[].recordedDate
Type: string; Format: date
Required: Yes
Nullable: No
Trigger: Successful search.
Description: The past date when the price was recorded.
Example: "2024-07-15"

### priceHistory[].averagePrice
Type: number
Required: Yes
Nullable: No
Trigger: Successful search.
Description: The average price of the route on the recorded date.
Example: 480

## Error Response — HTTP 400

### message

Type: string | string[]
Required: Yes
Nullable: No
Trigger: Missing required parameters, identical cities, past dates, endDate < startDate, unaccompanied minor, or exceeding maximum passengers.
Description: Error description indicating which business rule validation failed.
Example: [""startDate cannot be in the past"", ""Total passengers cannot exceed 9""]
Note: The response should use standard error envelopes if configured in the global exception filter.

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: Database connection failure, timeout, or unexpected internal server error.
Description: Generic error message returned by the server.
Example: ""Internal Server Error""
Note: The response should use standard error envelopes if configured in the global exception filter.