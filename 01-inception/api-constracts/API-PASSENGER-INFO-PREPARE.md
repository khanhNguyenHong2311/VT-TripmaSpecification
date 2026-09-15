---
artifact_type: api-contract
status: Draft
api_id: API-PASSENGER-INFO-PREPARE
related_uc_id: UC-03
---

# API-PASSENGER-INFO-PREPARE: Prepare Passenger Information

## General Information

### API ID

API-PASSENGER-INFO-PREPARE

### API Name

Prepare Passenger Information

### Related Use Case IDs

UC-03

### Method

POST

### Path

/api/passenger-information/prepare

### Description

Prepares passenger, booking-contact, and baggage information for the current Tripma booking workflow.

### Authentication

Public

### Authorization

None

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-03's UML Model and Business Rules.

## Request Header(s)

### headers.Content-Type

Type: string; Format: MIME type; Required: Yes; Nullable: No
Allowed values: application/json
Trigger: API-PASSENGER-INFO-PREPARE request.
Description: Media type of the Tripma request body.
Example: application/json

### headers.Accept

Type: string; Format: MIME type; Required: No; Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-PASSENGER-INFO-PREPARE request.
Description: Response media type requested by the Tripma client.
Example: application/json

## Query Parameter(s)

None

## Request Body

### selectionContextKey

Type: string
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Reference to the Tripma flight-selection context carried by the request.
Example: "tripma-selection-7f42"

### type

Type: boolean
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Trip-mode value carried by the request.
Example: true

### adults

Type: integer
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Adult-traveller count carried by the request.
Example: 2

### minors

Type: integer
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Minor-traveller count carried by the request.
Example: 1

### departingFlightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Outbound-flight identifier carried by the request.
Example: "884b3b95-57e2-46d9-b792-da5804907fb9"

### returningFlightId

Type: string; Format: UUID
Required: No
Nullable: No
Trigger: Tripma passenger-information submission when the field is supplied.
Description: Inbound-flight identifier carried by the request.
Example: "c97af793-47fd-43e1-a3d7-94a042f84934"

### primaryPassengerRef

Type: string
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Booking-workflow reference for the primary passenger.
Example: "traveller-a"

### passengers

Type: array
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Passenger-information collection carried by the request.
Example: []

### passengers[].passengerRef

Type: string
Required: Yes
Nullable: No
Trigger: Passenger item included in the Tripma request.
Description: Booking-workflow reference for the passenger item.
Example: "traveller-b"

### passengers[].passengerType

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: ADULT, MINOR
Trigger: Passenger item included in the Tripma request.
Description: Traveller category carried by the passenger item.
Example: "ADULT"

### passengers[].firstName

Type: string
Required: Yes
Nullable: No
Trigger: Passenger item included in the Tripma request.
Description: First-name value carried by the passenger item.
Example: "An"

### passengers[].middleName

Type: string
Required: No
Nullable: No
Trigger: Passenger item included in the Tripma request when the field is supplied.
Description: Middle-name value carried by the passenger item.
Example: "Minh"

### passengers[].lastName

Type: string
Required: Yes
Nullable: No
Trigger: Passenger item included in the Tripma request.
Description: Last-name value carried by the passenger item.
Example: "Nguyen"

### passengers[].suffix

Type: string
Required: No
Nullable: No
Trigger: Passenger item included in the Tripma request when the field is supplied.
Description: Name-suffix value carried by the passenger item.
Example: "Jr"

### passengers[].dateOfBirth

Type: string; Format: date
Required: Yes
Nullable: No
Trigger: Passenger item included in the Tripma request.
Description: Birth-date value carried by the passenger item.
Example: "1992-04-18"

### passengers[].email

Type: string; Format: email
Required: No
Nullable: No
Trigger: Passenger item included in the Tripma request when the field is supplied.
Description: Email value carried by the passenger item.
Example: "an.nguyen@example.com"

### passengers[].phone

Type: string; Format: telephone
Required: No
Nullable: No
Trigger: Passenger item included in the Tripma request when the field is supplied.
Description: Telephone value carried by the passenger item.
Example: "+84901234567"

### passengers[].redressNumber

Type: string
Required: No
Nullable: No
Trigger: Passenger item included in the Tripma request when the field is supplied.
Description: Redress reference carried by the passenger item.
Example: "RDS-48291"

### passengers[].knownTravelerNumber

Type: string
Required: No
Nullable: No
Trigger: Passenger item included in the Tripma request when the field is supplied.
Description: Known-traveller reference carried by the passenger item.
Example: "KTN-73184"

### baggage

Type: array
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Checked-baggage collection carried by the request.
Example: []

### baggage[].passengerRef

Type: string
Required: Yes
Nullable: No
Trigger: Baggage item included in the Tripma request.
Description: Booking-workflow passenger reference carried by the baggage item.
Example: "traveller-c"

### baggage[].departingCheckedBags

Type: integer
Required: Yes
Nullable: No
Trigger: Baggage item included in the Tripma request.
Description: Outbound checked-baggage count carried by the item.
Example: 1

### baggage[].returningCheckedBags

Type: integer
Required: No
Nullable: No
Trigger: Baggage item included in the Tripma request when the field is supplied.
Description: Inbound checked-baggage count carried by the item.
Example: 2

### contact

Type: object
Required: Yes
Nullable: No
Trigger: Tripma passenger-information submission.
Description: Booking-contact object carried by the request.
Example: {}

### contact.usePrimaryPassenger

Type: boolean
Required: Yes
Nullable: No
Trigger: Booking-contact object included in the Tripma request.
Description: Passenger-contact selection value carried by the contact object.
Example: false

### contact.firstName

Type: string
Required: No
Nullable: No
Trigger: Booking-contact object included in the Tripma request when the field is supplied.
Description: First-name value carried by the contact object.
Example: "Binh"

### contact.lastName

Type: string
Required: No
Nullable: No
Trigger: Booking-contact object included in the Tripma request when the field is supplied.
Description: Last-name value carried by the contact object.
Example: "Tran"

### contact.email

Type: string; Format: email
Required: No
Nullable: No
Trigger: Booking-contact object included in the Tripma request when the field is supplied.
Description: Email value carried by the contact object.
Example: "contact@example.com"

### contact.phone

Type: string; Format: telephone
Required: No
Nullable: No
Trigger: Booking-contact object included in the Tripma request when the field is supplied.
Description: Telephone value carried by the contact object.
Example: "+6581234567"

## Success Response — HTTP 200

### passengerContextKey

Type: string
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE success response.
Description: Reference to the prepared Tripma passenger-information context.
Example: "tripma-passengers-5a91"

### selectionContextKey

Type: string
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE success response.
Description: Flight-selection context reference carried by the response.
Example: "tripma-selection-b308"

### primaryPassengerRef

Type: string
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE success response.
Description: Primary-passenger reference carried by the response.
Example: "traveller-d"

### preparedAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE success response.
Description: Preparation timestamp carried by the response.
Example: "2027-03-11T09:24:18Z"

### passengers

Type: array
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE success response.
Description: Prepared Tripma passenger collection.
Example: []

### passengers[].passengerRef

Type: string
Required: Yes
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE.
Description: Booking-workflow reference carried by the prepared item.
Example: "traveller-e"

### passengers[].passengerType

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: ADULT, MINOR
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE.
Description: Traveller category carried by the prepared item.
Example: "MINOR"

### passengers[].firstName

Type: string
Required: Yes
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE.
Description: Prepared first-name value.
Example: "Lan"

### passengers[].middleName

Type: string
Required: No
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE when the field is supplied.
Description: Prepared middle-name value.
Example: "Thi"

### passengers[].lastName

Type: string
Required: Yes
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE.
Description: Prepared last-name value.
Example: "Le"

### passengers[].suffix

Type: string
Required: No
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE when the field is supplied.
Description: Prepared name-suffix value.
Example: "III"

### passengers[].dateOfBirth

Type: string; Format: date
Required: Yes
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE.
Description: Prepared birth-date value.
Example: "2014-08-22"

### passengers[].email

Type: string; Format: email
Required: No
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE when the field is supplied.
Description: Prepared email value.
Example: "lan.le@example.com"

### passengers[].phone

Type: string; Format: telephone
Required: No
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE when the field is supplied.
Description: Prepared telephone value.
Example: "+61234567890"

### passengers[].redressNumber

Type: string
Required: No
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE when the field is supplied.
Description: Prepared redress reference.
Example: "RDS-19563"

### passengers[].knownTravelerNumber

Type: string
Required: No
Nullable: No
Trigger: Prepared passenger item returned by API-PASSENGER-INFO-PREPARE when the field is supplied.
Description: Prepared known-traveller reference.
Example: "KTN-62047"

### baggage

Type: array
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE success response.
Description: Prepared checked-baggage collection.
Example: []

### baggage[].passengerRef

Type: string
Required: Yes
Nullable: No
Trigger: Prepared baggage item returned by API-PASSENGER-INFO-PREPARE.
Description: Booking-workflow passenger reference carried by the item.
Example: "traveller-f"

### baggage[].departingCheckedBags

Type: integer
Required: Yes
Nullable: No
Trigger: Prepared baggage item returned by API-PASSENGER-INFO-PREPARE.
Description: Prepared outbound checked-baggage count.
Example: 0

### baggage[].returningCheckedBags

Type: integer
Required: No
Nullable: No
Trigger: Prepared baggage item returned by API-PASSENGER-INFO-PREPARE when the field is supplied.
Description: Prepared inbound checked-baggage count.
Example: 1

### contact

Type: object
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE success response.
Description: Prepared Tripma booking-contact object.
Example: {}

### contact.usePrimaryPassenger

Type: boolean
Required: Yes
Nullable: No
Trigger: Prepared booking-contact object returned by API-PASSENGER-INFO-PREPARE.
Description: Passenger-contact selection value carried by the prepared contact object.
Example: true

### contact.firstName

Type: string
Required: Yes
Nullable: No
Trigger: Prepared booking-contact object returned by API-PASSENGER-INFO-PREPARE.
Description: Prepared contact first name.
Example: "Mai"

### contact.lastName

Type: string
Required: Yes
Nullable: No
Trigger: Prepared booking-contact object returned by API-PASSENGER-INFO-PREPARE.
Description: Prepared contact last name.
Example: "Pham"

### contact.email

Type: string; Format: email
Required: Yes
Nullable: No
Trigger: Prepared booking-contact object returned by API-PASSENGER-INFO-PREPARE.
Description: Prepared contact email.
Example: "mai.pham@example.com"

### contact.phone

Type: string; Format: telephone
Required: Yes
Nullable: No
Trigger: Prepared booking-contact object returned by API-PASSENGER-INFO-PREPARE.
Description: Prepared contact telephone number.
Example: "+442071838750"

## Error Response — HTTP 400

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE rejects the submitted request.
Description: Tripma passenger-information request error detail.
Example: "Passenger information could not be accepted"

### issues

Type: array
Required: No
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE client-error response when itemized details are supplied.
Description: Tripma request-issue collection.
Example: []

### issues[].field

Type: string
Required: Yes
Nullable: No
Trigger: Issue item returned in the Tripma client-error response.
Description: Request-field reference carried by the issue item.
Example: "passengers[0].dateOfBirth"

### issues[].code

Type: string
Required: Yes
Nullable: No
Trigger: Issue item returned in the Tripma client-error response.
Description: Machine-readable issue code carried by the item.
Example: "VALUE_NOT_ACCEPTED"

Note: The response should use the standard error envelope if configured in the global exception filter.

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-PASSENGER-INFO-PREPARE cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not prepare the passenger information"

Note: The response should use the standard error envelope if configured in the global exception filter.
