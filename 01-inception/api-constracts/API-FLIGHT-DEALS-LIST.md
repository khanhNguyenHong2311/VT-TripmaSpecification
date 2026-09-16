---
artifact_type: api-contract
status: Draft
api_id: API-FLIGHT-DEALS-LIST
related_uc_id: UC-10
---

# API-FLIGHT-DEALS-LIST: List Flight Deals

## General Information

### API ID

API-FLIGHT-DEALS-LIST

### API Name

List Flight Deals

### Related Use Case IDs

UC-10

### Method

GET

### Path

/api/flight-deals

### Description

Provides the Tripma flight-deal collection.

### Authentication

Public

### Authorization

None

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-10's UML Model and Business Rules.

## Request Header(s)

### headers.Accept

Type: string; Format: MIME type
Required: No
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-FLIGHT-DEALS-LIST request.
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
Trigger: API-FLIGHT-DEALS-LIST response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-FLIGHT-DEALS-LIST response.
Description: Human-readable Tripma response detail.
Example: "Flight deals loaded"

### data

Type: array
Required: Yes
Nullable: No
Trigger: Successful API-FLIGHT-DEALS-LIST response.
Description: Tripma flight-deal collection.
Example: []

### data[].id

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Flight-deal item returned by the API.
Description: Deal reference carried by the item.
Example: "26147364-9f2c-4db3-a9d7-dd23dd2e98ab"

### data[].placeName

Type: string
Required: Yes
Nullable: No
Trigger: Flight-deal item returned by the API.
Description: Place-name value carried by the item.
Example: "Harbor Landmark"

### data[].city

Type: string
Required: Yes
Nullable: No
Trigger: Flight-deal item returned by the API.
Description: Destination-city value carried by the item.
Example: "Sydney"

### data[].imagePath

Type: string
Required: Yes
Nullable: No
Trigger: Flight-deal item returned by the API.
Description: Deal-image reference carried by the item.
Example: "/images/deals/example.svg"

### data[].price

Type: number
Required: Yes
Nullable: No
Trigger: Flight-deal item returned by the API.
Description: Deal-price value carried by the item.
Example: 640

### data[].currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: Flight-deal item returned by the API.
Description: Currency value carried by the item.
Example: "USD"

### data[].description

Type: string
Required: Yes
Nullable: No
Trigger: Flight-deal item returned by the API.
Description: Deal-description value carried by the item.
Example: "Discover a featured Tripma destination"

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-FLIGHT-DEALS-LIST cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not load flight deals"

### retryable

Type: boolean
Required: Yes
Nullable: No
Trigger: API-FLIGHT-DEALS-LIST service-error response.
Description: Retry-indicator value carried by the response.
Example: true

## Notes

This contract completes the existing `/api/flight-deals` route with the normalized Tripma response envelope used by the target specifications.
