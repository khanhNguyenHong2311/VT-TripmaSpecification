---
artifact_type: business-use-case-specification
status: "Draft"
uc_id: UC-14
uc_name: "Cancel Booking"
source_type: repository-reference
reference_project: Tripma
---

# UC-14: Cancel Booking

> Reference basis: the Tripma payment experience explicitly presents a flight-cancellation policy. This specification completes that visibly planned function for the target system.

## Functional Use-Case Specification

### Use Case ID

UC-14

### Use Case Name

Cancel Booking

### Description

As an authenticated user, I want to cancel an eligible booking so that its travel inventory is released and an applicable refund is returned through the original payment path.

### Actor(s)

Authenticated User

### Priority

Medium

### Trigger

The authenticated user chooses to cancel an account-owned booking.

### Pre-Condition(s)

PRE-1: An authenticated Tripma session is available.
PRE-2: The booking belongs to the authenticated account.
PRE-3: The booking has cancellation terms recorded from its purchase.

### Post-Condition(s)

POST-1: On success, the booking is retained with cancelled status and a cancellation record is stored.
POST-2: Seats held by the cancelled booking are released.
POST-3: When a refund is due, it is returned through the original payment path.
POST-4: On failure, the booking remains unchanged and no duplicate refund is created.

### Basic Flow

1. The authenticated user opens an account-owned booking from the Tripma trip experience.
2. The user chooses to cancel the booking.
3. Tripma presents the recorded cancellation terms and expected refund outcome.
4. The user confirms the cancellation.
5. Tripma submits the cancellation through API-BOOKING-CANCEL.
6. The cancellation service evaluates the request according to the Business Rules.
7. The service calculates the cancellation fee and refund from the booking's recorded terms.
8. The service submits the applicable refund through the original payment path.
9. The service records the cancellation, changes the booking status, and releases its seats.
10. API-BOOKING-CANCEL returns the cancellation summary.
11. Tripma presents the cancellation confirmation.

### Alternative Flow

AF-1: Keep the booking
4a. The user does not confirm the cancellation.
4b. Tripma closes the cancellation confirmation without submitting API-BOOKING-CANCEL.
4c. The booking remains unchanged.

AF-2: No refundable amount
8a. If the recorded terms produce no refundable amount, Tripma does not submit a provider refund.
8b. The service records the refund outcome as not required.
8c. The Basic Flow resumes at step 9.

AF-3: Retry a completed cancellation request
6a. If Tripma receives the same completed cancellation request with the same idempotency key, it returns the original outcome.
6b. Tripma does not create another cancellation or refund.

### Exception Flow

EF-1: Authentication is unavailable
5a. If an authenticated session is unavailable, API-BOOKING-CANCEL returns an authentication outcome.
5b. The booking remains unchanged.

EF-2: Booking is unavailable
6a. If the booking cannot be resolved for the authenticated account, Tripma returns a not-found outcome.
6b. The booking remains unchanged.

EF-3: Booking is not cancellable
6a. If the booking is not confirmed, has already been cancelled, or has passed its recorded cancellation deadline, Tripma returns a conflict outcome.
6b. No cancellation or refund is created.

EF-4: Refund cannot be completed
8a. If an applicable refund is rejected or cannot be confirmed, Tripma returns a payment outcome.
8b. The booking remains confirmed and its seats remain assigned.

EF-5: Cancellation operation fails
9a. If Tripma cannot complete the state change, it rolls back the cancellation operation.
9b. Tripma presents a retryable error outcome.

### Related UI

Cancellation action and confirmation in the Tripma booking experience

### Related API IDs

API-BOOKING-CANCEL; API-MY-TRIPS-LIST through UC-12; API-BOOKING-CONFIRMATION-GET through UC-06

### Notes

Scope clarification: UC-14 cancels the complete booking and does not delete its historical record. Viewing trips remains assigned to UC-12, viewing confirmation details remains assigned to UC-06, and changing an itinerary is outside this use case.

## UML Model

~~~plantuml
@startuml

enum BookingStatus {
  CONFIRMED
  CANCELLED
}

enum PaymentStatus {
  COMPLETED
}

enum RefundStatus {
  COMPLETED
  NOT_REQUIRED
}

class User <<Entity>> {
  id: UUID [1]
}

class Booking <<Entity>> {
  id: UUID [1]
  userId: UUID [0..1]
  departingFlightId: UUID [1]
  returningFlightId: UUID [0..1]
  status: BookingStatus [1]
  total: Decimal [1]
  currency: String [1]
}

class Flight <<Entity>> {
  id: UUID [1]
  departureAt: DateTime [1]
}

class PassengerInfo <<Entity>> {
  id: UUID [1]
  bookingId: UUID [1]
}

class Seat <<Entity>> {
  id: UUID [1]
  flightId: UUID [1]
  available: Boolean [1]
}

class SeatAssignment <<Entity>> {
  id: UUID [1]
  passengerInfoId: UUID [1]
  flightId: UUID [1]
  seatId: UUID [1]
}

class PaymentInfo <<Entity>> {
  id: UUID [1]
  bookingId: UUID [1]
  status: PaymentStatus [1]
  providerTransactionId: String [1]
  amount: Decimal [1]
  currency: String [1]
}

class BookingCancellationTerm <<Entity>> {
  id: UUID [1]
  bookingId: UUID [1]
  policyCode: String [1]
  cancellationDeadlineAt: DateTime [1]
  refundRate: Decimal [1]
  cancellationFee: Decimal [1]
  currency: String [1]
  createdAt: DateTime [1]
}

class BookingCancellation <<Entity>> {
  id: UUID [1]
  bookingId: UUID [1]
  cancellationTermId: UUID [1]
  refundStatus: RefundStatus [1]
  cancellationFee: Decimal [1]
  refundAmount: Decimal [1]
  currency: String [1]
  providerRefundId: String [0..1]
  idempotencyKey: String [1]
  cancelledAt: DateTime [1]
}

class CancelBookingDto <<DTO>> {
  bookingId: UUID [1]
}

class BookingCancellationDto <<DTO>> {
  cancellationId: UUID [1]
  bookingId: UUID [1]
  bookingStatus: BookingStatus [1]
  cancellationFee: Decimal [1]
  refundAmount: Decimal [1]
  currency: String [1]
  refundStatus: RefundStatus [1]
  cancelledAt: DateTime [1]
}

class CancelBookingResponseDto <<DTO>> {
  success: Boolean [1]
  message: String [1]
  data: BookingCancellationDto [0..1]
}

class BookingCancellationService <<Service>> {
  cancelBooking(
    dto: CancelBookingDto,
    currentUserId: UUID,
    idempotencyKey: String
  ): CancelBookingResponseDto
}

User "1" -- "0..*" Booking : owns
Booking "1" -- "1..2" Flight : contains
Booking "1" -- "1..*" PassengerInfo : contains
PassengerInfo "1" -- "1..*" SeatAssignment : receives
Seat "1" -- "0..1" SeatAssignment : assigned through
Booking "1" -- "1" PaymentInfo : paid through
Booking "1" -- "1" BookingCancellationTerm : governed by
Booking "1" -- "0..1" BookingCancellation : cancellation
BookingCancellationTerm "1" -- "0..1" BookingCancellation : applied by

CancelBookingResponseDto "1" *-- "0..1" BookingCancellationDto : data

BookingCancellationService ..> CancelBookingDto
BookingCancellationService ..> CancelBookingResponseDto
BookingCancellationService ..> User
BookingCancellationService ..> Booking
BookingCancellationService ..> PaymentInfo
BookingCancellationService ..> BookingCancellationTerm
BookingCancellationService ..> BookingCancellation
BookingCancellationService ..> SeatAssignment
BookingCancellationService ..> Seat

@enduml
~~~

## Business Rules

The following rules are authoritative for Prompt E. OCL is preserved where applicable; provider, transaction, and non-OCL constraints remain authoritative natural-language requirements.

~~~text
BR-CANCEL-001: Authenticated account
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
pre BR_CANCEL_001_User:
  not currentUserId.oclIsUndefined() and
  User.allInstances()->exists(user | user.id = currentUserId)


BR-CANCEL-002: Request identity
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
pre BR_CANCEL_002_Identity:
  not dto.bookingId.oclIsUndefined() and
  not idempotencyKey.oclIsUndefined() and
  trim(idempotencyKey) <> ''


BR-CANCEL-003: Account-owned booking
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
pre BR_CANCEL_003_Booking:
  Booking.allInstances()->exists(booking |
    booking.id = dto.bookingId and
    booking.userId = currentUserId)


BR-CANCEL-004: Confirmed booking
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
pre BR_CANCEL_004_Status:
  Booking.allInstances()->one(booking |
    booking.id = dto.bookingId and
    booking.status = BookingStatus::CONFIRMED)


BR-CANCEL-005: Recorded cancellation terms
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
pre BR_CANCEL_005_Terms:
  BookingCancellationTerm.allInstances()->one(term |
    term.bookingId = dto.bookingId)


BR-CANCEL-006: Cancellation deadline
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
pre BR_CANCEL_006_Deadline:
  let term : BookingCancellationTerm =
    BookingCancellationTerm.allInstances()->any(item |
      item.bookingId = dto.bookingId)
  in
    now() <= term.cancellationDeadlineAt


BR-CANCEL-007: Completed original payment
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
pre BR_CANCEL_007_Payment:
  PaymentInfo.allInstances()->one(payment |
    payment.bookingId = dto.bookingId and
    payment.status = PaymentStatus::COMPLETED)


BR-CANCEL-008: Cancellation-term values
context BookingCancellationTerm
inv BR_CANCEL_008_TermValues:
  not self.policyCode.oclIsUndefined() and
  trim(self.policyCode) <> '' and
  self.refundRate >= 0 and
  self.refundRate <= 1 and
  self.cancellationFee >= 0 and
  not self.currency.oclIsUndefined() and
  trim(self.currency) <> ''


BR-CANCEL-009: Refund calculation
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
post BR_CANCEL_009_Refund:
  result.success implies
    let payment : PaymentInfo = PaymentInfo.allInstances()->any(item |
      item.bookingId = dto.bookingId),
        term : BookingCancellationTerm =
      BookingCancellationTerm.allInstances()->any(item |
        item.bookingId = dto.bookingId),
        cancellation : BookingCancellation =
      BookingCancellation.allInstances()->any(item |
        item.bookingId = dto.bookingId)
    in
      cancellation.cancellationFee = term.cancellationFee and
      cancellation.refundAmount =
        if payment.amount * term.refundRate > term.cancellationFee
        then payment.amount * term.refundRate - term.cancellationFee
        else 0
        endif


BR-CANCEL-010: Monetary consistency
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
post BR_CANCEL_010_Currency:
  result.success implies
    let payment : PaymentInfo = PaymentInfo.allInstances()->any(item |
      item.bookingId = dto.bookingId),
        term : BookingCancellationTerm =
      BookingCancellationTerm.allInstances()->any(item |
        item.bookingId = dto.bookingId),
        cancellation : BookingCancellation =
      BookingCancellation.allInstances()->any(item |
        item.bookingId = dto.bookingId)
    in
      payment.currency = term.currency and
      cancellation.currency = payment.currency


BR-CANCEL-011: Refund outcome
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
post BR_CANCEL_011_RefundStatus:
  result.success implies
    let cancellation : BookingCancellation =
      BookingCancellation.allInstances()->any(item |
        item.bookingId = dto.bookingId)
    in
      (cancellation.refundAmount > 0 implies
        cancellation.refundStatus = RefundStatus::COMPLETED and
        not cancellation.providerRefundId.oclIsUndefined()) and
      (cancellation.refundAmount = 0 implies
        cancellation.refundStatus = RefundStatus::NOT_REQUIRED and
        cancellation.providerRefundId.oclIsUndefined())


BR-CANCEL-012: Original payment path
Any positive refund shall be submitted against the provider transaction of the
booking's completed PaymentInfo. Tripma shall not request replacement payment
credentials from the user during cancellation.


BR-CANCEL-013: Booking state transition
context BookingCancellationService::cancelBooking(
  dto : CancelBookingDto,
  currentUserId : UUID,
  idempotencyKey : String
) : CancelBookingResponseDto
post BR_CANCEL_013_Status:
  result.success implies
    Booking.allInstances()->one(booking |
      booking.id = dto.bookingId and
      booking.status = BookingStatus::CANCELLED)


BR-CANCEL-014: One cancellation per booking
context BookingCancellation
inv BR_CANCEL_014_BookingUnique:
  BookingCancellation.allInstances()->isUnique(cancellation |
    cancellation.bookingId)


BR-CANCEL-015: Idempotent cancellation
context BookingCancellation
inv BR_CANCEL_015_Idempotency:
  BookingCancellation.allInstances()->isUnique(cancellation |
    cancellation.idempotencyKey)


BR-CANCEL-016: Complete-booking cancellation
Cancellation applies to the complete booking, including its departing and any
returning flight. Partial cancellation of a flight leg or passenger is not
performed by UC-14.


BR-CANCEL-017: Seat release
After a successful cancellation, every SeatAssignment belonging to the booking's
passengers shall be removed and each corresponding Seat shall become available.
No seat shall be released when cancellation fails.


BR-CANCEL-018: Atomic outcome and audit retention
Refund completion, cancellation creation, booking-status transition, and seat
release shall form one recoverable operation. The Booking, PaymentInfo, and
BookingCancellationTerm records shall be retained; UC-14 shall not delete them.


BR-CANCEL-019: Flexible 30-day policy
context BookingCancellationTerm
inv BR_CANCEL_019_FlexiblePolicy:
  self.policyCode = 'FLEXIBLE_30_DAY'
  implies
    let booking : Booking = Booking.allInstances()->any(item |
      item.id = self.bookingId),
        departure : Flight = Flight.allInstances()->any(item |
      item.id = booking.departingFlightId)
    in
      self.cancellationDeadlineAt = departure.departureAt - days(30) and
      self.refundRate = 1 and
      self.cancellationFee = 0

~~~
