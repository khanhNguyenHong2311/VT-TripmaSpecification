---
artifact_type: business-use-case-specification
status: "Draft"
uc_id: UC-13
uc_name: "Save Payment Method"
source_type: repository-reference
reference_project: Tripma
---

# UC-13: Save Payment Method

> Reference basis: the Tripma payment experience exposes a save-card option and the reference schema includes saved payment methods. This specification completes that existing function for the target system.

## Functional Use-Case Specification

### Use Case ID

UC-13

### Use Case Name

Save Payment Method

### Description

As an authenticated user, I want to save the card used for a successful booking so that it can be available for a later Tripma checkout.

### Actor(s)

Authenticated User

### Priority

Medium

### Trigger

The authenticated user chooses to save the card used in the Tripma payment experience.

### Pre-Condition(s)

PRE-1: An authenticated Tripma session is available.
PRE-2: UC-05 — Make Payment has completed a booking with a reusable card payment source.

### Post-Condition(s)

POST-1: On success, a saved payment method is associated with the authenticated account.
POST-2: The booking and its completed payment remain unchanged.
POST-3: On failure, no partial saved-payment-method record remains.

### Basic Flow

1. The authenticated user selects the save-card option during the payment experience.
2. UC-05 — Make Payment completes the booking and makes its booking reference available.
3. Tripma submits the booking reference and default-method preference through API-PAYMENT-METHOD-SAVE.
4. The saved-payment-method service evaluates the request according to the Business Rules.
5. The service obtains the reusable card reference and display metadata from the completed booking payment.
6. The service creates the saved payment method for the authenticated account.
7. API-PAYMENT-METHOD-SAVE returns the masked saved-payment-method summary.
8. Tripma confirms that the payment method was saved.

### Alternative Flow

AF-1: Save the account's first payment method
6a. If the account has no saved payment method, Tripma records the new method as the default method.
6b. The Basic Flow resumes at step 7.

AF-2: Make the new method the default
6a. If the authenticated user requested a new default method, Tripma makes the new method the account's only default saved payment method.
6b. The Basic Flow resumes at step 7.

AF-3: Retry the same save request
4a. If Tripma receives a completed request again with the same idempotency key, it returns the original outcome without creating another record.
4b. The Basic Flow resumes at step 7.

### Exception Flow

EF-1: Authentication is unavailable
3a. If an authenticated session is unavailable, API-PAYMENT-METHOD-SAVE returns an authentication outcome.
3b. No payment method is saved.

EF-2: Booking payment is unavailable
5a. If the referenced booking or its completed payment cannot be resolved for the current account, Tripma returns a not-found outcome.
5b. No payment method is saved.

EF-3: Payment source cannot be saved
5a. If the completed payment does not provide a reusable card reference, Tripma returns a conflict outcome.
5b. No payment method is saved.

EF-4: Save operation fails
6a. If the operation cannot be completed because of a technical failure, Tripma returns a retryable error outcome.
6b. Tripma rolls back the save operation.

### Related UI

Save-card option in the Tripma payment experience

### Related API IDs

API-PAYMENT-METHOD-SAVE; API-BOOKING-CREATE through UC-05

### Notes

Scope clarification: UC-13 saves a reusable card reference after successful payment. Payment authorization and booking creation remain assigned to UC-05. Selecting, listing, updating, or deleting saved methods is outside this use case.

## UML Model

~~~plantuml
@startuml

enum PaymentMethod {
  CREDIT_CARD
}

enum PaymentStatus {
  COMPLETED
}

class User <<Entity>> {
  id: UUID [1]
}

class Booking <<Entity>> {
  id: UUID [1]
  userId: UUID [0..1]
}

class PaymentInfo <<Entity>> {
  id: UUID [1]
  bookingId: UUID [1]
  paymentMethod: PaymentMethod [1]
  status: PaymentStatus [1]
  paymentTokenEncrypted: Binary [0..1]
  nameOnCard: String [0..1]
  cardLastFour: String [0..1]
  expireDate: Date [0..1]
}

class SavedPaymentMethod <<Entity>> {
  id: UUID [1]
  userId: UUID [1]
  sourcePaymentInfoId: UUID [1]
  paymentMethod: PaymentMethod [1]
  providerInstrumentRefEncrypted: Binary [1]
  nameOnCard: String [1]
  cardLastFour: String [1]
  expireDate: Date [1]
  isDefault: Boolean [1]
  idempotencyKey: String [1]
  createdAt: DateTime [1]
  updatedAt: DateTime [1]
}

class SavePaymentMethodDto <<DTO>> {
  bookingId: UUID [1]
  makeDefault: Boolean [1]
}

class SavedPaymentMethodDto <<DTO>> {
  id: UUID [1]
  paymentMethod: PaymentMethod [1]
  displayName: String [1]
  cardLastFour: String [1]
  expireDate: Date [1]
  isDefault: Boolean [1]
  createdAt: DateTime [1]
}

class SavePaymentMethodResponseDto <<DTO>> {
  success: Boolean [1]
  message: String [1]
  data: SavedPaymentMethodDto [0..1]
}

class SavedPaymentMethodService <<Service>> {
  savePaymentMethod(
    dto: SavePaymentMethodDto,
    currentUserId: UUID,
    idempotencyKey: String
  ): SavePaymentMethodResponseDto
}

User "1" -- "0..*" Booking : owns
User "1" -- "0..*" SavedPaymentMethod : owns
Booking "1" -- "1" PaymentInfo : paid by
PaymentInfo "1" -- "0..1" SavedPaymentMethod : source

SavePaymentMethodResponseDto "1" *-- "0..1" SavedPaymentMethodDto : data

SavedPaymentMethodService ..> SavePaymentMethodDto
SavedPaymentMethodService ..> SavePaymentMethodResponseDto
SavedPaymentMethodService ..> User
SavedPaymentMethodService ..> Booking
SavedPaymentMethodService ..> PaymentInfo
SavedPaymentMethodService ..> SavedPaymentMethod

@enduml
~~~

## Business Rules

The following rules are authoritative for Prompt E. OCL is preserved where applicable; security, transaction, and non-OCL constraints remain authoritative natural-language requirements.

~~~text
BR-SAVE-PAY-001: Authenticated account
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
pre BR_SAVE_PAY_001_User:
  not currentUserId.oclIsUndefined() and
  User.allInstances()->exists(user | user.id = currentUserId)


BR-SAVE-PAY-002: Request identity
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
pre BR_SAVE_PAY_002_Identity:
  not dto.bookingId.oclIsUndefined() and
  not idempotencyKey.oclIsUndefined() and
  trim(idempotencyKey) <> ''


BR-SAVE-PAY-003: Account-owned booking
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
pre BR_SAVE_PAY_003_Booking:
  Booking.allInstances()->exists(booking |
    booking.id = dto.bookingId and
    booking.userId = currentUserId)


BR-SAVE-PAY-004: Completed card-payment source
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
pre BR_SAVE_PAY_004_Source:
  PaymentInfo.allInstances()->one(payment |
    payment.bookingId = dto.bookingId and
    payment.paymentMethod = PaymentMethod::CREDIT_CARD and
    payment.status = PaymentStatus::COMPLETED)


BR-SAVE-PAY-005: Reusable card metadata
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
pre BR_SAVE_PAY_005_Metadata:
  let payment : PaymentInfo = PaymentInfo.allInstances()->any(item |
    item.bookingId = dto.bookingId and
    item.status = PaymentStatus::COMPLETED)
  in
    not payment.paymentTokenEncrypted.oclIsUndefined() and
    not payment.nameOnCard.oclIsUndefined() and
    trim(payment.nameOnCard) <> '' and
    not payment.cardLastFour.oclIsUndefined() and
    payment.cardLastFour.size() = 4 and
    not payment.expireDate.oclIsUndefined() and
    isFutureCardExpiry(payment.expireDate)


BR-SAVE-PAY-006: Saved-method ownership
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
post BR_SAVE_PAY_006_Owner:
  result.success implies
    SavedPaymentMethod.allInstances()->one(method |
      method.id = result.data.id and
      method.userId = currentUserId)


BR-SAVE-PAY-007: Source projection
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
post BR_SAVE_PAY_007_Projection:
  result.success implies
    let source : PaymentInfo = PaymentInfo.allInstances()->any(payment |
      payment.bookingId = dto.bookingId and
      payment.status = PaymentStatus::COMPLETED),
        saved : SavedPaymentMethod = SavedPaymentMethod.allInstances()->any(method |
      method.id = result.data.id)
    in
      saved.sourcePaymentInfoId = source.id and
      saved.paymentMethod = source.paymentMethod and
      saved.nameOnCard = source.nameOnCard and
      saved.cardLastFour = source.cardLastFour and
      saved.expireDate = source.expireDate


BR-SAVE-PAY-008: One saved record per source payment
context SavedPaymentMethod
inv BR_SAVE_PAY_008_SourceUnique:
  SavedPaymentMethod.allInstances()->isUnique(method |
    method.sourcePaymentInfoId)


BR-SAVE-PAY-009: First method becomes default
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
post BR_SAVE_PAY_009_FirstDefault:
  SavedPaymentMethod.allInstances()->select(method |
    method.userId = currentUserId)->size() = 1
  implies
    SavedPaymentMethod.allInstances()->any(method |
      method.userId = currentUserId).isDefault


BR-SAVE-PAY-010: Requested default method
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
post BR_SAVE_PAY_010_RequestedDefault:
  result.success and dto.makeDefault implies
    SavedPaymentMethod.allInstances()->any(method |
      method.id = result.data.id).isDefault


BR-SAVE-PAY-011: At most one default method
context User
inv BR_SAVE_PAY_011_DefaultUnique:
  SavedPaymentMethod.allInstances()->select(method |
    method.userId = self.id and method.isDefault)->size() <= 1


BR-SAVE-PAY-012: Idempotent creation
context SavedPaymentMethod
inv BR_SAVE_PAY_012_Idempotency:
  SavedPaymentMethod.allInstances()->isUnique(method |
    Tuple { userId = method.userId, key = method.idempotencyKey })


BR-SAVE-PAY-013: Masked response
context SavedPaymentMethodService::savePaymentMethod(
  dto : SavePaymentMethodDto,
  currentUserId : UUID,
  idempotencyKey : String
) : SavePaymentMethodResponseDto
post BR_SAVE_PAY_013_Response:
  result.success implies
    result.data.cardLastFour.size() = 4 and
    result.data.displayName = 'Card ending in ' + result.data.cardLastFour


BR-SAVE-PAY-014: Protected payment credentials
Raw card numbers, security codes, plaintext provider references, and encrypted
provider references shall not appear in API responses, application logs,
analytics, URLs, or query strings. The reusable provider reference shall remain
encrypted at rest.


BR-SAVE-PAY-015: Atomic save operation
Creating the saved method and changing the account's default-method designation
shall be one transaction. A failure shall leave no partial saved method and shall
not modify the source Booking or PaymentInfo record.

~~~
