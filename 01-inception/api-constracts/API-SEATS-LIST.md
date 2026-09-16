---
artifact_type: api-contract
status: Draft
api_id: API-SEATS-LIST
related_uc_id: UC-04
---

# API-SEATS-LIST: Get Available Seats

## General Information

### API ID

API-SEATS-LIST

### API Name

Get Available Seats

### Related Use Case IDs

UC-04

### Method

GET

### Path

/api/seats/[flightId]

### Description

Provides Tripma seat data for a submitted flight reference.

### Authentication

Public

### Authorization

None

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-04's UML Model and Business Rules.

## Request Header(s)

### headers.Accept

Type: string; Format: MIME type; Required: No; Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-SEATS-LIST request.
Description: Response media type requested by the Tripma client.
Example: application/json

## Path Parameter(s)

### path.flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Tripma seat-list request.
Description: Flight reference carried by the request path.
Example: "76161e2e-0f42-4be3-b64c-22f74b213bb5"

## Query Parameter(s)

None

## Request Body

None

## Success Response — HTTP 200

### success

Type: boolean
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST response.
Description: Human-readable Tripma response detail.
Example: "Tripma seat information is ready"

### data

Type: object
Required: Yes
Nullable: No
Trigger: Successful API-SEATS-LIST response.
Description: Tripma seat-list data object.
Example: {}

### data.flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST response data.
Description: Flight reference carried by the response.
Example: "16012cad-64df-4702-b82e-03acbf8a05b9"

### data.currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST response data.
Description: Tripma response currency code.
Example: "VND"

### data.businessSeats

Type: array
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST response data.
Description: Tripma business-seat collection.
Example: []

### data.businessSeats[].id

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Business-seat item returned by API-SEATS-LIST.
Description: Tripma seat identifier.
Example: "147106e1-5a33-48b3-ae30-ed71aa9fca7a"

### data.businessSeats[].flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Business-seat item returned by API-SEATS-LIST.
Description: Flight reference carried by the seat item.
Example: "58e04c24-a554-40de-b6f4-018f192c0dcc"

### data.businessSeats[].seatNumber

Type: string
Required: Yes
Nullable: No
Trigger: Business-seat item returned by API-SEATS-LIST.
Description: Display number carried by the seat item.
Example: "4C"

### data.businessSeats[].seatClass

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: ECONOMY, BUSINESS
Trigger: Business-seat item returned by API-SEATS-LIST.
Description: Seat-class value carried by the item.
Example: "BUSINESS"

### data.businessSeats[].available

Type: boolean
Required: Yes
Nullable: No
Trigger: Business-seat item returned by API-SEATS-LIST.
Description: Availability value carried by the seat item.
Example: true

### data.businessSeats[].price

Type: number
Required: Yes
Nullable: No
Trigger: Business-seat item returned by API-SEATS-LIST.
Description: Monetary amount carried by the seat item.
Example: 780000

### data.businessSeats[].currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: Business-seat item returned by API-SEATS-LIST.
Description: Currency code carried by the seat item.
Example: "SGD"

### data.economySeats

Type: array
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST response data.
Description: Tripma economy-seat collection.
Example: []

### data.economySeats[].id

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Economy-seat item returned by API-SEATS-LIST.
Description: Tripma seat identifier.
Example: "589228b8-6aa5-4343-8d98-25279e7ac5f9"

### data.economySeats[].flightId

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Economy-seat item returned by API-SEATS-LIST.
Description: Flight reference carried by the seat item.
Example: "12ea1da8-9301-4b7f-8f2d-ac59f001ab34"

### data.economySeats[].seatNumber

Type: string
Required: Yes
Nullable: No
Trigger: Economy-seat item returned by API-SEATS-LIST.
Description: Display number carried by the seat item.
Example: "22F"

### data.economySeats[].seatClass

Type: string; Format: enum
Required: Yes
Nullable: No
Allowed values: ECONOMY, BUSINESS
Trigger: Economy-seat item returned by API-SEATS-LIST.
Description: Seat-class value carried by the item.
Example: "ECONOMY"

### data.economySeats[].available

Type: boolean
Required: Yes
Nullable: No
Trigger: Economy-seat item returned by API-SEATS-LIST.
Description: Availability value carried by the seat item.
Example: true

### data.economySeats[].price

Type: number
Required: Yes
Nullable: No
Trigger: Economy-seat item returned by API-SEATS-LIST.
Description: Monetary amount carried by the seat item.
Example: 240000

### data.economySeats[].currency

Type: string; Format: ISO 4217 currency code
Required: Yes
Nullable: No
Trigger: Economy-seat item returned by API-SEATS-LIST.
Description: Currency code carried by the seat item.
Example: "USD"

## Error Response — HTTP 400

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST rejects the submitted request.
Description: Tripma seat-list request error detail.
Example: "Seat information could not be requested"

## Error Response — HTTP 404

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST cannot resolve the requested resource.
Description: Tripma seat-list resource outcome.
Example: "Seat information was not found"

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-SEATS-LIST cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not retrieve the seat information"

Note: Error responses should use the standard error envelope if configured in the global exception filter.
