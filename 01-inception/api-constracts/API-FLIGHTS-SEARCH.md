---
artifact_type: api-contract
status: Draft
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

Provides Tripma flight-search data for a submitted travel-search request.

### Authentication

Public

### Authorization

None

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-01's UML Model and Business Rules.

## Request Header(s)

### headers.Accept

Type: string; Format: MIME type; Required: No; Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-FLIGHTS-SEARCH request.
Description: Response media type requested by the Tripma client.
Example: application/json

## Query Parameter(s)

### query.fromCity
Type: string; Required: Yes; Nullable: No
Trigger: Tripma flight-search submission.
Description: Tripma origin-city input.
Example: "Ho Chi Minh City"

### query.toCity
Type: string; Required: Yes; Nullable: No
Trigger: Tripma flight-search submission.
Description: Tripma destination-city input.
Example: "Singapore"

### query.startDate
Type: string; Format: date; Required: Yes; Nullable: No
Trigger: Tripma flight-search submission.
Description: Tripma departure-date input.
Example: "2027-02-15"

### query.endDate
Type: string; Format: date; Required: No; Nullable: No
Trigger: Tripma flight-search submission when the field is supplied.
Description: Tripma return-date input.
Example: "2027-02-20"

### query.type
Type: boolean; Required: Yes; Nullable: No
Trigger: Tripma flight-search submission.
Description: Tripma trip-mode input.
Example: true

### query.adults
Type: integer; Required: Yes; Nullable: No
Trigger: Tripma flight-search submission.
Description: Adult-traveller count input.
Example: 1

### query.minors
Type: integer; Required: Yes; Nullable: No
Trigger: Tripma flight-search submission.
Description: Minor-traveller count input.
Example: 1

## Request Body

None

## Success Response — HTTP 200

### currency
Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: API-FLIGHTS-SEARCH success response.
Description: Tripma response currency code.
Example: "VND"

### departingFlights
Type: array
Required: Yes
Nullable: No
Trigger: API-FLIGHTS-SEARCH success response.
Description: Tripma outbound-flight collection.
Example: []

### departingFlights[].flightId
Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Tripma flight identifier.
Example: "7a2bc3ca-6edd-4b15-ae4a-7d5078abdb5f"

### departingFlights[].fromCity
Type: string
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Origin city of the flight item.
Example: "Hanoi"

### departingFlights[].toCity
Type: string
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Destination city of the flight item.
Example: "Da Nang"

### departingFlights[].type
Type: boolean
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Tripma trip-mode value carried by the flight item.
Example: true

### departingFlights[].imgPath
Type: string
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Tripma image reference for the flight item.
Example: "/images/flights/vietnam-airlines.png"

### departingFlights[].subtotalPrice
Type: number
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Subtotal fare carried by the flight item.
Example: 2450000

### departingFlights[].taxesAndFees
Type: number
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Taxes-and-fees amount carried by the flight item.
Example: 320000

### departingFlights[].airlineName
Type: string
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Airline display name for the flight item.
Example: "Vietnam Airlines"

### departingFlights[].duration
Type: string
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Display duration for the flight item.
Example: "1h 25m"

### departingFlights[].fromToTime
Type: string
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Display time range for the flight item.
Example: "08:30 - 09:55"

### departingFlights[].date
Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Scheduled date-time carried by the flight item.
Example: "2027-05-09T08:30:00+07:00"

### departingFlights[].arrivalAt
Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Scheduled arrival date-time carried by the flight item.
Example: "2027-05-09T09:55:00+07:00"

### departingFlights[].availableSeats
Type: integer
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Seat-availability value carried by the flight item.
Example: 24

### departingFlights[].stopsNumber
Type: integer
Required: Yes
Nullable: No
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Stop-count value carried by the flight item.
Example: 0

### departingFlights[].stopsInfo
Type: string
Required: Yes
Nullable: Yes
Trigger: Outbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Stop-information display value for the flight item.
Example: "Non-stop"

### arrivingFlights
Type: array
Required: Yes
Nullable: No
Trigger: API-FLIGHTS-SEARCH success response.
Description: Tripma inbound-flight collection.
Example: []

### arrivingFlights[].flightId
Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Tripma flight identifier.
Example: "c47b6056-87b9-4437-9e64-4468f13d9cf8"

### arrivingFlights[].fromCity
Type: string
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Origin city of the flight item.
Example: "Hue"

### arrivingFlights[].toCity
Type: string
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Destination city of the flight item.
Example: "Nha Trang"

### arrivingFlights[].type
Type: boolean
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Tripma trip-mode value carried by the flight item.
Example: true

### arrivingFlights[].imgPath
Type: string
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Tripma image reference for the flight item.
Example: "/images/flights/vietnam-airlines.png"

### arrivingFlights[].subtotalPrice
Type: number
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Subtotal fare carried by the flight item.
Example: 2310000

### arrivingFlights[].taxesAndFees
Type: number
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Taxes-and-fees amount carried by the flight item.
Example: 305000

### arrivingFlights[].airlineName
Type: string
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Airline display name for the flight item.
Example: "Vietnam Airlines"

### arrivingFlights[].duration
Type: string
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Display duration for the flight item.
Example: "1h 25m"

### arrivingFlights[].fromToTime
Type: string
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Display time range for the flight item.
Example: "18:10 - 19:35"

### arrivingFlights[].date
Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Scheduled date-time carried by the flight item.
Example: "2027-06-12T18:10:00+07:00"

### arrivingFlights[].arrivalAt
Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Scheduled arrival date-time carried by the flight item.
Example: "2027-06-12T19:35:00+07:00"

### arrivingFlights[].availableSeats
Type: integer
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Seat-availability value carried by the flight item.
Example: 18

### arrivingFlights[].stopsNumber
Type: integer
Required: Yes
Nullable: No
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Stop-count value carried by the flight item.
Example: 0

### arrivingFlights[].stopsInfo
Type: string
Required: Yes
Nullable: Yes
Trigger: Inbound-flight item returned by API-FLIGHTS-SEARCH.
Description: Stop-information display value for the flight item.
Example: "Non-stop"

### priceGrid
Type: array
Required: Yes
Nullable: No
Trigger: API-FLIGHTS-SEARCH success response.
Description: Tripma flexible-date fare collection.
Example: []

### priceGrid[].departingDate
Type: string; Format: date
Required: Yes
Nullable: No
Trigger: Fare-grid item returned by API-FLIGHTS-SEARCH.
Description: Departure-date value carried by the grid item.
Example: "2027-07-04"

### priceGrid[].returningDate
Type: string; Format: date
Required: No
Nullable: No
Trigger: Fare-grid item returned by API-FLIGHTS-SEARCH when the field is supplied.
Description: Return-date value carried by the grid item.
Example: "2027-07-09"

### priceGrid[].minPrice
Type: number
Required: Yes
Nullable: No
Trigger: Fare-grid item returned by API-FLIGHTS-SEARCH.
Description: Fare amount carried by the grid item.
Example: 4760000

### priceHistory
Type: array
Required: Yes
Nullable: No
Trigger: API-FLIGHTS-SEARCH success response.
Description: Tripma fare-history collection.
Example: []

### priceHistory[].recordedDate
Type: string; Format: date
Required: Yes
Nullable: No
Trigger: Fare-history item returned by API-FLIGHTS-SEARCH.
Description: Recorded-date value carried by the history item.
Example: "2026-09-01"

### priceHistory[].averagePrice
Type: number
Required: Yes
Nullable: No
Trigger: Fare-history item returned by API-FLIGHTS-SEARCH.
Description: Fare amount carried by the history item.
Example: 2380000

## Error Response — HTTP 400

### message

Type: string | string[]
Required: Yes
Nullable: No
Trigger: API-FLIGHTS-SEARCH rejects the submitted request.
Description: Tripma search-request error detail.
Example: ["Search request could not be accepted"]
Note: The response should use standard error envelopes if configured in the global exception filter.

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-FLIGHTS-SEARCH cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not complete the flight search"
Note: The response should use standard error envelopes if configured in the global exception filter.
