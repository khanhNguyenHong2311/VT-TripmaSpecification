---
artifact_type: api-contract
status: Draft
api_id: API-BOOKING-CONFIRMATION-GET
related_uc_id: UC-06
---

# API-BOOKING-CONFIRMATION-GET: Get Booking Confirmation

## General Information

### API ID

API-BOOKING-CONFIRMATION-GET

### API Name

Get Booking Confirmation

### Related Use Case IDs

UC-06

### Method

GET

### Path

/api/bookings/[bookingId]/confirmation

### Description

Provides the Tripma confirmation view associated with a submitted booking reference.

### Authentication

Optional session

### Authorization

Governed by UC-06.

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-06's UML Model and Business Rules.

## Request Header(s)

### headers.Accept

Type: string; Format: MIME type
Required: No
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-BOOKING-CONFIRMATION-GET request.
Description: Response media type requested by the Tripma client.
Example: application/json

### headers.X-Confirmation-Code

Type: string
Required: No
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET request when the field is supplied.
Description: Confirmation reference carried by the Tripma client.
Example: "7f42b38ac912"

## Path Parameter(s)

### path.bookingId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET request.
Description: Booking reference carried by the request path.
Example: "c397ec31-2be4-43dd-a006-3cc870ada565"

## Query Parameter(s)

None

## Request Body

None

## Success Response — HTTP 200

### success

Type: boolean
Required: Yes
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET response.
Description: Human-readable response detail.
Example: "Booking confirmation loaded"

### data

Type: object
Required: Yes
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET response.
Description: Tripma booking-confirmation view object.
Example: {}

### data.bookingId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Booking reference carried by the view.
Example: "c397ec31-2be4-43dd-a006-3cc870ada565"

### data.confirmationCode

Type: string
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Confirmation-code value carried by the view.
Example: "7f42b38ac912"

### data.status

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: CONFIRMED
Trigger: Confirmation view returned by the API.
Description: Booking-status value carried by the view.
Example: "CONFIRMED"

### data.createdAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Booking timestamp carried by the view.
Example: "2027-05-18T04:21:09Z"

### data.departingFlight

Type: object
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Departing-flight summary object.
Example: {}

### data.departingFlight.flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Flight reference carried by the summary.
Example: "65d46784-76a4-4628-a3bb-bebca32ddd81"

### data.departingFlight.fromCity

Type: string
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Origin-city value carried by the summary.
Example: "Singapore"

### data.departingFlight.toCity

Type: string
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Destination-city value carried by the summary.
Example: "Tokyo"

### data.departingFlight.airlineName

Type: string
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Airline-name value carried by the summary.
Example: "Tripma Air"

### data.departingFlight.duration

Type: string
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Duration value carried by the summary.
Example: "7h 10m"

### data.departingFlight.stopsNumber

Type: integer
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Stop-count value carried by the summary.
Example: 0

### data.departingFlight.fromToTime

Type: string
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Display-time value carried by the summary.
Example: "08:20 - 17:30"

### data.departingFlight.date

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Departure timestamp carried by the summary.
Example: "2027-06-08T08:20:00+08:00"

### data.departingFlight.arrivalAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Arrival timestamp carried by the summary.
Example: "2027-06-08T17:30:00+09:00"

### data.departingFlight.subtotalPrice

Type: number
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Flight-subtotal value carried by the summary.
Example: 540

### data.departingFlight.taxesAndFees

Type: number
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Taxes-and-fees value carried by the summary.
Example: 76

### data.departingFlight.currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by the API.
Description: Currency value carried by the summary.
Example: "USD"

### data.returningFlight

Type: object
Required: No
Nullable: Yes
Trigger: Confirmation view returned by the API when the field is supplied.
Description: Returning-flight summary object.
Example: {}

### data.returningFlight.flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Flight reference carried by the summary.
Example: "9bccdb09-80b8-459d-9204-ea2e11dfdb43"

### data.returningFlight.fromCity

Type: string
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Origin-city value carried by the summary.
Example: "Tokyo"

### data.returningFlight.toCity

Type: string
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Destination-city value carried by the summary.
Example: "Singapore"

### data.returningFlight.airlineName

Type: string
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Airline-name value carried by the summary.
Example: "Tripma Air"

### data.returningFlight.duration

Type: string
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Duration value carried by the summary.
Example: "7h 25m"

### data.returningFlight.stopsNumber

Type: integer
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Stop-count value carried by the summary.
Example: 1

### data.returningFlight.fromToTime

Type: string
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Display-time value carried by the summary.
Example: "14:10 - 20:35"

### data.returningFlight.date

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Departure timestamp carried by the summary.
Example: "2027-06-18T14:10:00+09:00"

### data.returningFlight.arrivalAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Arrival timestamp carried by the summary.
Example: "2027-06-18T20:35:00+08:00"

### data.returningFlight.subtotalPrice

Type: number
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Flight-subtotal value carried by the summary.
Example: 510

### data.returningFlight.taxesAndFees

Type: number
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Taxes-and-fees value carried by the summary.
Example: 72

### data.returningFlight.currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by the API.
Description: Currency value carried by the summary.
Example: "USD"

### data.passengers

Type: array
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Passenger-summary collection.
Example: []

### data.passengers[].passengerId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Passenger summary returned by the API.
Description: Passenger reference carried by the summary.
Example: "1724cc42-e664-48ce-b584-f2510d8d89ea"

### data.passengers[].firstName

Type: string
Required: Yes
Nullable: No
Trigger: Passenger summary returned by the API.
Description: First-name value carried by the summary.
Example: "Minh"

### data.passengers[].lastName

Type: string
Required: Yes
Nullable: No
Trigger: Passenger summary returned by the API.
Description: Last-name value carried by the summary.
Example: "Tran"

### data.seatAssignments

Type: array
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Seat-summary collection.
Example: []

### data.seatAssignments[].passengerId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Seat summary returned by the API.
Description: Passenger reference carried by the summary.
Example: "1724cc42-e664-48ce-b584-f2510d8d89ea"

### data.seatAssignments[].flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Seat summary returned by the API.
Description: Flight reference carried by the summary.
Example: "65d46784-76a4-4628-a3bb-bebca32ddd81"

### data.seatAssignments[].seatNumber

Type: string
Required: Yes
Nullable: No
Trigger: Seat summary returned by the API.
Description: Seat-number value carried by the summary.
Example: "18A"

### data.seatAssignments[].seatClass

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: ECONOMY, BUSINESS
Trigger: Seat summary returned by the API.
Description: Seat-class value carried by the summary.
Example: "ECONOMY"

### data.baggage

Type: array
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Baggage-summary collection.
Example: []

### data.baggage[].passengerId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Baggage summary returned by the API.
Description: Passenger reference carried by the summary.
Example: "1724cc42-e664-48ce-b584-f2510d8d89ea"

### data.baggage[].flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Baggage summary returned by the API.
Description: Flight reference carried by the summary.
Example: "65d46784-76a4-4628-a3bb-bebca32ddd81"

### data.baggage[].checkedBags

Type: integer
Required: Yes
Nullable: No
Trigger: Baggage summary returned by the API.
Description: Checked-bag count carried by the summary.
Example: 1

### data.payment

Type: object
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Payment-summary object.
Example: {}

### data.payment.paymentMethod

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: CREDIT_CARD, GOOGLE_PAY, APPLE_PAY, PAYPAL, CRYPTO
Trigger: Payment summary returned by the API.
Description: Payment-method value carried by the summary.
Example: "CREDIT_CARD"

### data.payment.status

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: COMPLETED
Trigger: Payment summary returned by the API.
Description: Payment-status value carried by the summary.
Example: "COMPLETED"

### data.payment.nameOnCard

Type: string
Required: No
Nullable: Yes
Trigger: Payment summary returned by the API when the field is supplied.
Description: Cardholder-name value carried by the summary.
Example: "Minh Tran"

### data.payment.cardLastFour

Type: string
Required: No
Nullable: Yes
Trigger: Payment summary returned by the API when the field is supplied.
Description: Card-account display value carried by the summary.
Example: "1111"

### data.payment.expireDate

Type: string; Format: date
Required: No
Nullable: Yes
Trigger: Payment summary returned by the API when the field is supplied.
Description: Card-expiration value carried by the summary.
Example: "2029-08-31"

### data.priceBreakdown

Type: object
Required: Yes
Nullable: No
Trigger: Confirmation view returned by the API.
Description: Price-summary object.
Example: {}

### data.priceBreakdown.flightSubtotal

Type: number
Required: Yes
Nullable: No
Trigger: Price summary returned by the API.
Description: Flight-subtotal value carried by the summary.
Example: 1050

### data.priceBreakdown.taxesAndFees

Type: number
Required: Yes
Nullable: No
Trigger: Price summary returned by the API.
Description: Taxes-and-fees value carried by the summary.
Example: 148

### data.priceBreakdown.baggageFees

Type: number
Required: Yes
Nullable: No
Trigger: Price summary returned by the API.
Description: Baggage-fee value carried by the summary.
Example: 60

### data.priceBreakdown.upgradeFees

Type: number
Required: Yes
Nullable: No
Trigger: Price summary returned by the API.
Description: Seat-upgrade value carried by the summary.
Example: 0

### data.priceBreakdown.total

Type: number
Required: Yes
Nullable: No
Trigger: Price summary returned by the API.
Description: Paid-total value carried by the summary.
Example: 1258

### data.priceBreakdown.currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: Price summary returned by the API.
Description: Currency value carried by the summary.
Example: "USD"

## Error Response — HTTP 403

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET returns an access outcome.
Description: Tripma access-response detail.
Example: "Booking confirmation is unavailable"

## Error Response — HTTP 404

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET cannot resolve the submitted reference.
Description: Tripma not-found response detail.
Example: "Booking confirmation was not found"

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not load the confirmation"

### retryable

Type: boolean
Required: Yes
Nullable: No
Trigger: API-BOOKING-CONFIRMATION-GET service-error response.
Description: Retry-indicator value carried by the response.
Example: true

## Notes

Related Tripma experience: booking-success page (`/successbooking`).
