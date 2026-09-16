---
artifact_type: api-contract
status: Draft
api_id: API-AUTH-SIGNIN
related_uc_id: UC-08
---

# API-AUTH-SIGNIN: Sign In

## General Information

### API ID

API-AUTH-SIGNIN

### API Name

Sign In

### Related Use Case IDs

UC-08

### Method

POST

### Path

/api/auth/[...nextauth]

### Description

Handles a submitted Tripma email-and-password sign-in request and returns its authentication outcome.

### Authentication

Public

### Authorization

None

### Example Isolation

Each example below is an independent Tripma field sample. Examples from different fields must not be combined to infer business behavior; applicable behavior is defined only by UC-08's UML Model and Business Rules.

## Request Header(s)

### headers.Content-Type

Type: string; Format: MIME type
Required: Yes
Nullable: No
Default: application/x-www-form-urlencoded
Allowed values: application/x-www-form-urlencoded, application/json
Trigger: API-AUTH-SIGNIN request.
Description: Media type of the submitted Tripma authentication message.
Example: application/x-www-form-urlencoded

### headers.Accept

Type: string; Format: MIME type
Required: No
Nullable: No
Default: application/json
Allowed values: application/json
Trigger: API-AUTH-SIGNIN request.
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
Trigger: API-AUTH-SIGNIN request body.
Description: Account-email value carried by the message.
Example: "traveler@example.com"

### password

Type: string; Format: password
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNIN request body.
Description: Account-secret value carried by the message.
Example: "Example-account-value"

### callbackUrl

Type: string; Format: URI
Required: No
Nullable: No
Trigger: API-AUTH-SIGNIN request body when the field is supplied.
Description: Tripma continuation reference carried by the message.
Example: "https://tripma.example/flights"

### csrfToken

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNIN request body.
Description: Authentication-exchange token carried by the message.
Example: "csrf-example-value"

## Success Response — HTTP 200

### success

Type: boolean
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNIN response.
Description: Tripma response-status value.
Example: true

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNIN response.
Description: Human-readable Tripma response detail.
Example: "Tripma sign-in completed"

### data

Type: object
Required: Yes
Nullable: No
Trigger: Successful API-AUTH-SIGNIN response.
Description: Tripma authentication-result object.
Example: {}

### data.user

Type: object
Required: Yes
Nullable: No
Trigger: Authentication result returned by the API.
Description: Authenticated-account summary object.
Example: {}

### data.user.id

Type: string; Format: UUID
Required: Yes
Nullable: No
Trigger: Authenticated-account summary returned by the API.
Description: Account reference carried by the summary.
Example: "97d05db2-6c8d-44da-bae2-67e181488c4f"

### data.user.email

Type: string; Format: email
Required: Yes
Nullable: No
Trigger: Authenticated-account summary returned by the API.
Description: Account-email value carried by the summary.
Example: "traveler@example.com"

### data.user.username

Type: string
Required: No
Nullable: Yes
Trigger: Authenticated-account summary returned by the API when the field is supplied.
Description: Username value carried by the summary.
Example: "tripma-user-example"

### data.session

Type: object
Required: Yes
Nullable: No
Trigger: Authentication result returned by the API.
Description: Tripma session-summary object.
Example: {}

### data.session.expiresAt

Type: string; Format: ISO 8601
Required: Yes
Nullable: No
Trigger: Session summary returned by the API.
Description: Session-expiration timestamp carried by the summary.
Example: "2027-08-12T10:30:00Z"

## Error Response — HTTP 400

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNIN rejects the submitted message.
Description: Tripma authentication-request error detail.
Example: "Sign-in information requires attention"

### issues

Type: array
Required: No
Nullable: No
Trigger: API-AUTH-SIGNIN error response when the field is supplied.
Description: Tripma sign-in issue collection.
Example: []

### issues[].field

Type: string
Required: Yes
Nullable: No
Trigger: Sign-in issue item returned by the API.
Description: Request-field reference carried by the item.
Example: "email"

### issues[].code

Type: string
Required: Yes
Nullable: No
Trigger: Sign-in issue item returned by the API.
Description: Machine-readable issue value carried by the item.
Example: "SIGNIN_INPUT"

## Error Response — HTTP 401

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNIN returns an authentication outcome.
Description: Tripma authentication-response detail.
Example: "The account could not be authenticated"

## Error Response — HTTP 500

### message

Type: string
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNIN cannot complete because of a technical failure.
Description: Generic Tripma authentication-service detail.
Example: "Tripma could not complete sign-in"

### retryable

Type: boolean
Required: Yes
Nullable: No
Trigger: API-AUTH-SIGNIN service-error response.
Description: Retry-indicator value carried by the response.
Example: true

## Notes

The catch-all path represents the Tripma authentication route family used by the email-and-password exchange.
