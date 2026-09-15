---
artifact_type: api-contract
status: Draft
api_id: API-AUTH-SIGNUP
related_uc_id: UC-07
---

# API-AUTH-SIGNUP: Sign Up

## General Information

### API ID

API-AUTH-SIGNUP

### API Name

Sign Up

### Related Use Case IDs

UC-07

### Method

POST

### Path

/api/auth/signup

### Description

Processes a submitted Tripma email-and-password account request and returns its outcome.

### Authentication

Public

### Authorization

None

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-07's UML Model and Business Rules.

## Request Header(s)

### headers.Content-Type

Type: string; Format: MIME type
Required: Yes
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-AUTH-SIGNUP request.
Description: Media type of the submitted Tripma request body.
Example: application/json

### headers.Accept

Type: string; Format: MIME type
Required: No
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-AUTH-SIGNUP request.
Description: Response media type requested by the Tripma client.
Example: application/json

## Path Parameter(s)

None

## Query Parameter(s)

None

## Request Body

### email

Type: string; Format: email
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP request body.
Description: Account-email value carried by the request.
Example: "traveler@example.com"

### password

Type: string; Format: password
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP request body.
Description: Account-secret value carried by the request.
Example: "Example-account-value"

### agreeTerms

Type: boolean
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP request body.
Description: Terms-selection value carried by the request.
Example: true

### receiveDealAlerts

Type: boolean
Required: Yes
Nullable: No
Default: false
Trigger: API-AUTH-SIGNUP request body.
Description: Deal-alert selection value carried by the request.
Example: false

## Success Response — HTTP 201

### success

Type: boolean
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP response.
Description: Human-readable Tripma response detail.
Example: "Tripma account created"

### data

Type: object
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP response.
Description: Registered-account summary object.
Example: {}

### data.id

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Registered-account summary returned by the API.
Description: Account reference carried by the summary.
Example: "ad2cd4d1-507e-49ef-9d89-c27d4f1f1e34"

### data.email

Type: string; Format: email
Required: Yes
Nullable: No
Trigger: Registered-account summary returned by the API.
Description: Account-email value carried by the summary.
Example: "traveler@example.com"

### data.username

Type: string
Required: Yes
Nullable: No
Trigger: Registered-account summary returned by the API.
Description: Username value carried by the summary.
Example: "tripma-user-example"

### data.receiveDealAlerts

Type: boolean
Required: Yes
Nullable: No
Trigger: Registered-account summary returned by the API.
Description: Deal-alert preference carried by the summary.
Example: false

### data.createdAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Registered-account summary returned by the API.
Description: Account-creation timestamp carried by the summary.
Example: "2027-07-06T09:14:27Z"

## Error Response — HTTP 400

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP rejects the submitted request.
Description: Tripma account-request error detail.
Example: "Account information requires attention"

### issues

Type: array
Required: No
Nullable: No
Trigger: API-AUTH-SIGNUP error response when the field is supplied.
Description: Tripma account-issue collection.
Example: []

### issues[].field

Type: string
Required: Yes
Nullable: No
Trigger: Account-issue item returned by the API.
Description: Request-field reference carried by the item.
Example: "email"

### issues[].code

Type: string
Required: Yes
Nullable: No
Trigger: Account-issue item returned by the API.
Description: Machine-readable issue value carried by the item.
Example: "SIGNUP_INPUT"

## Error Response — HTTP 409

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP returns an account-conflict outcome.
Description: Tripma conflict-response detail.
Example: "The account could not be created"

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP cannot complete because of a technical failure.
Description: Generic Tripma service-error detail.
Example: "Tripma could not create the account"

### retryable

Type: boolean
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNUP service-error response.
Description: Retry-indicator value carried by the response.
Example: true

## Notes

Related Tripma experiences: navbar Sign up modal and the UC-05 account-creation entry point.
