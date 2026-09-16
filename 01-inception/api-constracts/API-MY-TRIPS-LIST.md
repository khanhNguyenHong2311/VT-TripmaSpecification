---
artifact_type: api-contract
status: Draft
api_id: API-MY-TRIPS-LIST
related_uc_id: UC-12
---

# API-MY-TRIPS-LIST: List My Trips

## General Information

### API ID

API-MY-TRIPS-LIST

### API Name

List My Trips

### Related Use Case IDs

UC-12

### Method

GET

### Path

/api/users/me/bookings

### Description

Provides the Tripma trip-summary collection associated with the current account.

### Authentication

Required session

### Authorization

Governed by UC-12.

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-12's UML Model and Business Rules.

## Request Header(s)

### headers.Accept

Type: string; Format: MIME type
Required: No
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-MY-TRIPS-LIST request.
Description: Response media type requested by the Tripma client.
Example: application/json

## Path Parameter(s)

None

## Query Parameter(s)

None

## Request Body

None

## Success Response — HTTP 200

### success

Type: boolean
Required: Yes
Nullable: No
Trigger: API-MY-TRIPS-LIST response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-MY-TRIPS-LIST response.
Description: Human-readable Tripma response detail.
Example: "Trip collection loaded"

### data

Type: object
Required: Yes
Nullable: No
Trigger: Successful API-MY-TRIPS-LIST response.
Description: Tripma trip-collection object.
Example: {}

### data.upcomingTrips

Type: array
Required: Yes
Nullable: No
Trigger: Trip collection returned by the API.
Description: Upcoming-trip summary collection.
Example: []

### data.completedTrips

Type: array
Required: Yes
Nullable: No
Trigger: Trip collection returned by the API.
Description: Completed-trip summary collection.
Example: []

### data.cancelledTrips

Type: array
Required: Yes
Nullable: No
Trigger: Trip collection returned by the API.
Description: Cancelled-trip summary collection.
Example: []

### data.upcomingTrips[] / data.completedTrips[] / data.cancelledTrips[]

Type: object
Required: Yes
Nullable: No
Trigger: Trip-summary collection item.
Description: Trip-summary object carried by the collection.
Example: {}

### data.*Trips[].bookingId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Trip-summary item returned by the API.
Description: Booking reference carried by the item.
Example: "4cc7444a-3627-42cf-919f-1b1351511325"

### data.*Trips[].bookingStatus

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: CONFIRMED, CANCELLED
Trigger: Trip-summary item returned by the API.
Description: Booking-status value carried by the item.
Example: "CONFIRMED"

### data.*Trips[].timingStatus

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: UPCOMING, COMPLETED, CANCELLED
Trigger: Trip-summary item returned by the API.
Description: Trip-timing value carried by the item.
Example: "UPCOMING"

### data.*Trips[].departingFlight

Type: object
Required: Yes
Nullable: No
Trigger: Trip-summary item returned by the API.
Description: Departing-flight summary object.
Example: {}

### data.*Trips[].returningFlight

Type: object
Required: No
Nullable: Yes
Trigger: Trip-summary item returned by the API when the field is supplied.
Description: Returning-flight summary object.
Example: {}

### data.*Trips[].departingFlight.flightId / data.*Trips[].returningFlight.flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Flight reference carried by the summary.
Example: "a82d9474-c5ca-4238-af57-84f25df9f69e"

### data.*Trips[].departingFlight.fromCity / data.*Trips[].returningFlight.fromCity

Type: string
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Origin-city value carried by the summary.
Example: "Singapore"

### data.*Trips[].departingFlight.toCity / data.*Trips[].returningFlight.toCity

Type: string
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Destination-city value carried by the summary.
Example: "Tokyo"

### data.*Trips[].departingFlight.airlineName / data.*Trips[].returningFlight.airlineName

Type: string
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Airline-name value carried by the summary.
Example: "Tripma Air"

### data.*Trips[].departingFlight.duration / data.*Trips[].returningFlight.duration

Type: string
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Duration value carried by the summary.
Example: "7h 10m"

### data.*Trips[].departingFlight.stopsNumber / data.*Trips[].returningFlight.stopsNumber

Type: integer
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Stop-count value carried by the summary.
Example: 0

### data.*Trips[].departingFlight.fromToTime / data.*Trips[].returningFlight.fromToTime

Type: string
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Display-time value carried by the summary.
Example: "08:20 - 17:30"

### data.*Trips[].departingFlight.date / data.*Trips[].returningFlight.date

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Departure timestamp carried by the summary.
Example: "2027-10-08T08:20:00+08:00"

### data.*Trips[].departingFlight.arrivalAt / data.*Trips[].returningFlight.arrivalAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Flight-summary object returned by the API.
Description: Arrival timestamp carried by the summary.
Example: "2027-10-08T17:30:00+09:00"

### data.*Trips[].journeyEndAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Trip-summary item returned by the API.
Description: Journey-end timestamp carried by the item.
Example: "2027-10-18T20:35:00+08:00"

### data.*Trips[].passengerCount

Type: integer
Required: Yes
Nullable: No
Trigger: Trip-summary item returned by the API.
Description: Passenger-count value carried by the item.
Example: 2

### data.*Trips[].total

Type: number
Required: Yes
Nullable: No
Trigger: Trip-summary item returned by the API.
Description: Booking-total value carried by the item.
Example: 1258

### data.*Trips[].currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: Trip-summary item returned by the API.
Description: Currency value carried by the item.
Example: "USD"

### data.*Trips[].bookedAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Trip-summary item returned by the API.
Description: Booking timestamp carried by the item.
Example: "2027-08-20T04:14:29Z"

## Error Response — HTTP 401

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-MY-TRIPS-LIST returns an authentication outcome.
Description: Tripma authentication-response detail.
Example: "Authentication is required"

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-MY-TRIPS-LIST cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not load the trip collection"

### retryable

Type: boolean
Required: Yes
Nullable: No
Trigger: API-MY-TRIPS-LIST service-error response.
Description: Retry-indicator value carried by the response.
Example: true

## Notes

This contract completes the authenticated Your Trips entry already represented in the Tripma navbar and booking-confirmation experience.
