---
artifact_type: api-contract
status: Draft
api_id: API-UNIQUE-PLACES-LIST
related_uc_id: UC-11
---

# API-UNIQUE-PLACES-LIST: List Unique Places

## General Information

### API ID

API-UNIQUE-PLACES-LIST

### API Name

List Unique Places

### Related Use Case IDs

UC-11

### Method

GET

### Path

/api/unique-places

### Description

Provides the Tripma unique-place collection.

### Authentication

Public

### Authorization

None

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-11's UML Model and Business Rules.

## Request Header(s)

### headers.Accept

Type: string; Format: MIME type
Required: No
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-UNIQUE-PLACES-LIST request.
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
Trigger: API-UNIQUE-PLACES-LIST response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-UNIQUE-PLACES-LIST response.
Description: Human-readable Tripma response detail.
Example: "Unique places loaded"

### data

Type: array
Required: Yes
Nullable: No
Trigger: Successful API-UNIQUE-PLACES-LIST response.
Description: Tripma unique-place collection.
Example: []

### data[].id

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Unique-place item returned by the API.
Description: Unique-place reference carried by the item.
Example: "55d90112-5304-4282-9748-25df2a62a0cb"

### data[].placeName

Type: string
Required: Yes
Nullable: No
Trigger: Unique-place item returned by the API.
Description: Place-name value carried by the item.
Example: "Mountain Village"

### data[].city

Type: string
Required: Yes
Nullable: No
Trigger: Unique-place item returned by the API.
Description: Destination-city value carried by the item.
Example: "Marrakesh"

### data[].imagePath

Type: string
Required: Yes
Nullable: No
Trigger: Unique-place item returned by the API.
Description: Place-image reference carried by the item.
Example: "/images/places/example.svg"

### data[].price

Type: number
Required: Yes
Nullable: No
Trigger: Unique-place item returned by the API.
Description: Place-price value carried by the item.
Example: 850

### data[].currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: Unique-place item returned by the API.
Description: Currency value carried by the item.
Example: "USD"

### data[].description

Type: string
Required: Yes
Nullable: No
Trigger: Unique-place item returned by the API.
Description: Place-description value carried by the item.
Example: "Discover a distinctive Tripma destination"

### data[].motivation

Type: string
Required: Yes
Nullable: No
Trigger: Unique-place item returned by the API.
Description: Travel-motivation value carried by the item.
Example: "Adventure"

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-UNIQUE-PLACES-LIST cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not load unique places"

### retryable

Type: boolean
Required: Yes
Nullable: No
Trigger: API-UNIQUE-PLACES-LIST service-error response.
Description: Retry-indicator value carried by the response.
Example: true

## Notes

This contract completes the existing `/api/unique-places` route with the normalized Tripma response envelope used by the target specifications.
