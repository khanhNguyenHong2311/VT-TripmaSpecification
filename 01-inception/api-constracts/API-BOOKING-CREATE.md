---
artifact_type: api-contract
status: Draft
api_id: API-BOOKING-CREATE
related_uc_id: UC-05
---

# API-BOOKING-CREATE: Create Booking

## General Information

### API ID

API-BOOKING-CREATE

### API Name

Create Booking

### Related Use Case IDs

UC-05

### Method

POST

### Path

/api/booking

### Description

Processes a submitted Tripma checkout and returns its booking outcome.

### Authentication

Optional session

### Authorization

The current session is used when the checkout is associated with an authenticated Tripma user.

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-05's UML Model and Business Rules.

## Request Header(s)

### headers.Content-Type

Type: string; Format: MIME type
Required: Yes
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-BOOKING-CREATE request.
Description: Media type of the submitted Tripma request body.
Example: application/json

### headers.Accept

Type: string; Format: MIME type
Required: No
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-BOOKING-CREATE request.
Description: Response media type requested by the Tripma client.
Example: application/json

### headers.Idempotency-Key

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE request.
Description: Checkout-attempt reference supplied by the Tripma client.
Example: "checkout-3ce79ee8-88fd-4f45-aeed-70e2df41c75b"

## Path Parameter(s)

None

## Query Parameter(s)

None

## Request Body

### seatSelectionContextKey

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE request body.
Description: Seat-selection context reference carried by the checkout.
Example: "seat-context-71f60666"

### payment

Type: object
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE request body.
Description: Tripma payment input object.
Example: {}

### payment.paymentMethod

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: CREDIT_CARD, GOOGLE_PAY, APPLE_PAY, PAYPAL, CRYPTO
Trigger: Payment object included in the request.
Description: Payment-method value carried by the checkout.
Example: "CREDIT_CARD"

### payment.nameOnCard

Type: string
Required: No
Nullable: Yes
Trigger: Payment object included in the request when the field is supplied.
Description: Cardholder-name value carried by the payment object.
Example: "Alex Morgan"

### payment.cardNumber

Type: string
Required: No
Nullable: Yes
Trigger: Payment object included in the request when the field is supplied.
Description: Card-account value carried by the payment object.
Example: "4111111111111111"

### payment.securityCode

Type: string
Required: No
Nullable: Yes
Trigger: Payment object included in the request when the field is supplied.
Description: Card-security value carried by the payment object.
Example: "737"

### payment.expireDate

Type: string; Format: date
Required: No
Nullable: Yes
Trigger: Payment object included in the request when the field is supplied.
Description: Card-expiration value carried by the payment object.
Example: "2028-11-30"

### payment.providerToken

Type: string; Format: opaque token
Required: No
Nullable: Yes
Trigger: Payment object included in the request when the field is supplied.
Description: Payment-provider reference carried by the payment object.
Example: "provider-token-example-42"

### billingAddress

Type: object
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE request body.
Description: Tripma billing-address input object.
Example: {}

### billingAddress.sameAsPrimaryPassenger

Type: boolean
Required: Yes
Nullable: No
Trigger: Billing-address object included in the request.
Description: Address-source selection value carried by the checkout.
Example: true

### billingAddress.addressLine1

Type: string
Required: No
Nullable: Yes
Trigger: Billing-address object included in the request when the field is supplied.
Description: First address-line value carried by the checkout.
Example: "88 Market Street"

### billingAddress.addressLine2

Type: string
Required: No
Nullable: Yes
Trigger: Billing-address object included in the request when the field is supplied.
Description: Second address-line value carried by the checkout.
Example: "Unit 12"

### billingAddress.city

Type: string
Required: No
Nullable: Yes
Trigger: Billing-address object included in the request when the field is supplied.
Description: City value carried by the billing-address object.
Example: "Singapore"

### billingAddress.region

Type: string
Required: No
Nullable: Yes
Trigger: Billing-address object included in the request when the field is supplied.
Description: Region value carried by the billing-address object.
Example: "Central Region"

### billingAddress.postalCode

Type: string
Required: No
Nullable: Yes
Trigger: Billing-address object included in the request when the field is supplied.
Description: Postal-code value carried by the billing-address object.
Example: "048948"

### billingAddress.country

Type: string
Required: No
Nullable: Yes
Trigger: Billing-address object included in the request when the field is supplied.
Description: Country value carried by the billing-address object.
Example: "Singapore"

### accountOption

Type: object
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE request body.
Description: Tripma checkout-account option object.
Example: {}

### accountOption.createAccount

Type: boolean
Required: Yes
Nullable: No
Default: false
Trigger: Account-option object included in the request.
Description: Account-creation selection value carried by the checkout.
Example: false

### accountOption.email

Type: string; Format: email
Required: No
Nullable: Yes
Trigger: Account-option object included in the request when the field is supplied.
Description: Account-email value carried by the checkout.
Example: "traveler@example.com"

### accountOption.password

Type: string; Format: password
Required: No
Nullable: Yes
Trigger: Account-option object included in the request when the field is supplied.
Description: Account-password value carried by the checkout.
Example: "Example-password-27"

### accountOption.savePaymentMethod

Type: boolean
Required: Yes
Nullable: No
Default: false
Trigger: Account-option object included in the request.
Description: Saved-payment selection value carried by the checkout.
Example: true

## Success Response — HTTP 201

### success

Type: boolean
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response.
Description: Human-readable Tripma response detail.
Example: "Tripma checkout completed"

### data.bookingId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Booking reference carried by the response.
Example: "d924d350-ab21-4880-8d56-56e266ec880f"

### data.confirmationCode

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Confirmation reference carried by the response.
Example: "A7C4E2D91F6B"

### data.status

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: CONFIRMED
Trigger: API-BOOKING-CREATE response data.
Description: Booking-status value carried by the response.
Example: "CONFIRMED"

### data.userId

Type: string; Format: UUID
Required: No
Nullable: Yes
Trigger: API-BOOKING-CREATE response data when the field is supplied.
Description: Tripma user reference carried by the response.
Example: "cb35ac41-86d5-4ec8-ab8f-c4e7776f3eb8"

### data.paymentMethod

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: CREDIT_CARD, GOOGLE_PAY, APPLE_PAY, PAYPAL, CRYPTO
Trigger: API-BOOKING-CREATE response data.
Description: Payment-method value carried by the response.
Example: "PAYPAL"

### data.paymentStatus

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: PENDING, AUTHORIZED, DECLINED, COMPLETED, FAILED
Trigger: API-BOOKING-CREATE response data.
Description: Payment-status value carried by the response.
Example: "COMPLETED"

### data.paymentAccountDisplay

Type: string
Required: No
Nullable: Yes
Trigger: API-BOOKING-CREATE response data when the field is supplied.
Description: Payment-account display value carried by the response.
Example: "•••• 4242"

### data.departingFlight

Type: object
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Departing-flight summary object.
Example: {}

### data.departingFlight.flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by API-BOOKING-CREATE.
Description: Flight reference carried by the summary.
Example: "67ac40fe-5097-4123-b694-aa6567d12249"

### data.departingFlight.fromCity

Type: string
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by API-BOOKING-CREATE.
Description: Origin-city value carried by the summary.
Example: "Hanoi"

### data.departingFlight.toCity

Type: string
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by API-BOOKING-CREATE.
Description: Destination-city value carried by the summary.
Example: "Bangkok"

### data.departingFlight.airlineName

Type: string
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by API-BOOKING-CREATE.
Description: Airline-name value carried by the summary.
Example: "Tripma Air"

### data.departingFlight.date

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by API-BOOKING-CREATE.
Description: Departure date-time carried by the summary.
Example: "2027-04-08T09:20:00+07:00"

### data.departingFlight.arrivalAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Departing-flight summary returned by API-BOOKING-CREATE.
Description: Arrival date-time carried by the summary.
Example: "2027-04-08T11:05:00+07:00"

### data.returningFlight

Type: object
Required: No
Nullable: Yes
Trigger: API-BOOKING-CREATE response data when the field is supplied.
Description: Returning-flight summary object.
Example: {}

### data.returningFlight.flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by API-BOOKING-CREATE.
Description: Flight reference carried by the summary.
Example: "64289de1-2982-46f0-98fd-4717c2de2fb4"

### data.returningFlight.fromCity

Type: string
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by API-BOOKING-CREATE.
Description: Origin-city value carried by the summary.
Example: "Bangkok"

### data.returningFlight.toCity

Type: string
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by API-BOOKING-CREATE.
Description: Destination-city value carried by the summary.
Example: "Hanoi"

### data.returningFlight.airlineName

Type: string
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by API-BOOKING-CREATE.
Description: Airline-name value carried by the summary.
Example: "Tripma Air"

### data.returningFlight.date

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by API-BOOKING-CREATE.
Description: Departure date-time carried by the summary.
Example: "2027-04-15T18:10:00+07:00"

### data.returningFlight.arrivalAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Returning-flight summary returned by API-BOOKING-CREATE.
Description: Arrival date-time carried by the summary.
Example: "2027-04-15T19:55:00+07:00"

### data.passengers

Type: array
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Passenger-summary collection.
Example: []

### data.passengers[].passengerRef

Type: string
Required: Yes
Nullable: No
Trigger: Passenger summary returned by API-BOOKING-CREATE.
Description: Workflow passenger reference carried by the summary.
Example: "passenger-1"

### data.passengers[].firstName

Type: string
Required: Yes
Nullable: No
Trigger: Passenger summary returned by API-BOOKING-CREATE.
Description: First-name value carried by the summary.
Example: "Mai"

### data.passengers[].lastName

Type: string
Required: Yes
Nullable: No
Trigger: Passenger summary returned by API-BOOKING-CREATE.
Description: Last-name value carried by the summary.
Example: "Nguyen"

### data.seatAssignments

Type: array
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Seat-assignment summary collection.
Example: []

### data.seatAssignments[].passengerRef

Type: string
Required: Yes
Nullable: No
Trigger: Seat-assignment summary returned by API-BOOKING-CREATE.
Description: Workflow passenger reference carried by the summary.
Example: "passenger-2"

### data.seatAssignments[].flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Seat-assignment summary returned by API-BOOKING-CREATE.
Description: Flight reference carried by the summary.
Example: "035f71b2-3280-4521-a593-c9df24db0c80"

### data.seatAssignments[].seatNumber

Type: string
Required: Yes
Nullable: No
Trigger: Seat-assignment summary returned by API-BOOKING-CREATE.
Description: Seat-number value carried by the summary.
Example: "18C"

### data.seatAssignments[].seatClass

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: ECONOMY, BUSINESS
Trigger: Seat-assignment summary returned by API-BOOKING-CREATE.
Description: Seat-class value carried by the summary.
Example: "ECONOMY"

### data.flightSubtotal

Type: number
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Flight-subtotal amount carried by the response.
Example: 2800000

### data.taxesAndFees

Type: number
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Taxes-and-fees amount carried by the response.
Example: 310000

### data.baggageFees

Type: number
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Baggage-fee amount carried by the response.
Example: 150000

### data.upgradeFees

Type: number
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Seat-upgrade amount carried by the response.
Example: 620000

### data.total

Type: number
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Checkout-total amount carried by the response.
Example: 3880000

### data.currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Currency code carried by the response.
Example: "VND"

### data.createdAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE response data.
Description: Booking-creation timestamp carried by the response.
Example: "2027-01-19T03:42:17Z"

## Error Response — HTTP 400

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE rejects the submitted checkout.
Description: Tripma checkout-request error detail.
Example: "Checkout information requires attention"

### issues

Type: array
Required: No
Nullable: No
Trigger: API-BOOKING-CREATE error response when the field is supplied.
Description: Tripma checkout-issue collection.
Example: []

### issues[].field

Type: string
Required: Yes
Nullable: No
Trigger: Checkout-issue item returned by API-BOOKING-CREATE.
Description: Request-field reference carried by the issue.
Example: "payment.cardNumber"

### issues[].code

Type: string
Required: Yes
Nullable: No
Trigger: Checkout-issue item returned by API-BOOKING-CREATE.
Description: Machine-readable issue value.
Example: "CHECKOUT_INPUT"

## Error Response — HTTP 402

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE receives a payment-processing outcome.
Description: Tripma payment outcome detail.
Example: "The payment could not be completed"

## Error Response — HTTP 409

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE detects a checkout-context conflict.
Description: Tripma checkout-conflict detail.
Example: "The checkout context has changed"

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not complete the checkout"

### retryable

Type: boolean
Required: Yes
Nullable: No
Trigger: API-BOOKING-CREATE service-error response.
Description: Retry-indicator value carried by the response.
Example: true

## Notes

API-BOOKING-CREATE consumes the context chain prepared by UC-02, UC-03 and UC-04. Account creation may use the existing Tripma signup capability as part of the UC-05 checkout orchestration.
