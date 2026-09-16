---
artifact_type: api-contract
status: Draft
api_id: API-BOOKING-ITINERARY-SHARE
related_uc_id: UC-09
---

# API-BOOKING-ITINERARY-SHARE: Share Booking Itinerary

## General Information

### API ID

API-BOOKING-ITINERARY-SHARE

### API Name

Share Booking Itinerary

### Related Use Case IDs

UC-09

### Method

POST

### Path

/api/bookings/[bookingId]/share

### Description

Processes a Tripma itinerary-sharing request for a referenced booking.

### Authentication

Optional session

### Authorization

Governed by UC-09.

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-09's UML Model and Business Rules.

## Request Header(s)

### headers.Content-Type

Type: string; Format: MIME type
Required: Yes
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-BOOKING-ITINERARY-SHARE request.
Description: Media type of the submitted Tripma request body.
Example: application/json

### headers.Accept

Type: string; Format: MIME type
Required: No
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-BOOKING-ITINERARY-SHARE request.
Description: Response media type requested by the Tripma client.
Example: application/json

### headers.X-Confirmation-Code

Type: string
Required: No
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE request when the field is supplied.
Description: Confirmation reference carried by the Tripma client.
Example: "7f42b38ac912"

## Path Parameter(s)

### path.bookingId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE request.
Description: Booking reference carried by the request path.
Example: "c397ec31-2be4-43dd-a006-3cc870ada565"

## Query Parameter(s)

None

## Request Body

### recipientEmails

Type: array
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE request body.
Description: Recipient-email collection carried by the request.
Example: []

### recipientEmails[]

Type: string; Format: email
Required: Yes
Nullable: No
Trigger: Recipient-email collection item.
Description: Recipient-email value carried by the item.
Example: "travel-companion@example.com"

## Success Response — HTTP 200

### success

Type: boolean
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE response.
Description: Human-readable Tripma response detail.
Example: "Itinerary sharing completed"

### data

Type: object
Required: Yes
Nullable: No
Trigger: Successful API-BOOKING-ITINERARY-SHARE response.
Description: Tripma itinerary-sharing result object.
Example: {}

### data.bookingId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Itinerary-sharing result returned by the API.
Description: Booking reference carried by the result.
Example: "c397ec31-2be4-43dd-a006-3cc870ada565"

### data.deliveries

Type: array
Required: Yes
Nullable: No
Trigger: Itinerary-sharing result returned by the API.
Description: Itinerary-delivery result collection.
Example: []

### data.deliveries[].shareId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Itinerary-delivery result item.
Description: Sharing-record reference carried by the item.
Example: "ea370bce-2a28-4b57-8397-752df57921ab"

### data.deliveries[].recipientEmail

Type: string; Format: email
Required: Yes
Nullable: No
Trigger: Itinerary-delivery result item.
Description: Recipient-email value carried by the item.
Example: "travel-companion@example.com"

### data.deliveries[].deliveryStatus

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: SENT, FAILED
Trigger: Itinerary-delivery result item.
Description: Delivery-status value carried by the item.
Example: "SENT"

### data.deliveries[].sentAt

Type: string; Format: ISO 8601
Required: No
Nullable: Yes
Trigger: Itinerary-delivery result item when the field is supplied.
Description: Delivery timestamp carried by the item.
Example: "2027-09-14T08:25:41Z"

## Error Response — HTTP 400

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE rejects the submitted request.
Description: Tripma itinerary-sharing request detail.
Example: "Sharing information requires attention"

### issues

Type: array
Required: No
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE error response when the field is supplied.
Description: Tripma sharing-issue collection.
Example: []

### issues[].field

Type: string
Required: Yes
Nullable: No
Trigger: Sharing-issue item returned by the API.
Description: Request-field reference carried by the item.
Example: "recipientEmails"

### issues[].code

Type: string
Required: Yes
Nullable: No
Trigger: Sharing-issue item returned by the API.
Description: Machine-readable issue value carried by the item.
Example: "SHARE_INPUT"

## Error Response — HTTP 403

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE returns an access outcome.
Description: Tripma access-response detail.
Example: "The itinerary is unavailable"

## Error Response — HTTP 404

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE cannot resolve the submitted reference.
Description: Tripma not-found response detail.
Example: "The booking was not found"

## Error Response — HTTP 502

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE cannot complete an external delivery.
Description: Tripma itinerary-delivery response detail.
Example: "Tripma could not deliver the itinerary"

### data

Type: object
Required: No
Nullable: No
Trigger: Delivery-error response when the field is supplied.
Description: Tripma itinerary-delivery result object.
Example: {}

### data.bookingId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Delivery-error result returned by the API.
Description: Booking reference carried by the result.
Example: "c397ec31-2be4-43dd-a006-3cc870ada565"

### data.deliveries

Type: array
Required: Yes
Nullable: No
Trigger: Delivery-error result returned by the API.
Description: Itinerary-delivery result collection.
Example: []

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not complete itinerary sharing"

### retryable

Type: boolean
Required: Yes
Nullable: No
Trigger: API-BOOKING-ITINERARY-SHARE service-error response.
Description: Retry-indicator value carried by the response.
Example: true

## Notes

This contract completes the Share Itinerary experience already represented in the Tripma booking-confirmation page and `ShareItinerary` persistence model.
