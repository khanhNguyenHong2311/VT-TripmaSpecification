---
artifact_type: business-use-case-specification
status: "Draft"
uc_id: UC-05
uc_name: "Make Payment"
source_type: repository-reference
reference_project: Tripma
---

# UC-05: Make Payment

> Reference basis: the Tripma application source and its implemented or visibly planned functionality. This specification may complete that functionality for the target system.

## Functional Use-Case Specification

### Use Case ID

UC-05

### Use Case Name

Make Payment

### Description

As a visitor, I want to provide payment information and confirm my Tripma checkout so that my booking can be completed.

### Actor(s)

Visitor; Authenticated User

### Priority

High

### Trigger

The visitor continues from the Tripma seat-selection experience to payment.

### Pre-Condition(s)

PRE-1: The current Tripma checkout context is available.
PRE-2: The payment experience can access the context prepared by the preceding booking steps.

### Post-Condition(s)

POST-1: When checkout succeeds, Tripma makes a booking-confirmation context available to the success experience.
POST-2: Tripma associates the completed checkout with the applicable visitor context.
POST-3: When checkout cannot be completed, Tripma keeps the visitor in the payment experience and reports the outcome.

### Basic Flow

1. Tripma opens the payment experience for the current checkout.
2. Tripma presents the available payment and supporting checkout controls.
3. The visitor chooses a payment path and supplies the requested information.
4. The visitor completes any account, saved-payment, or billing-address option offered by the experience.
5. Tripma evaluates the current checkout form according to the Business Rules of this use case.
6. The visitor chooses Confirm and pay.
7. Tripma presents the processing state.
8. Tripma prepares any selected account step for checkout.
9. Tripma submits the checkout request through API-BOOKING-CREATE.
10. The checkout service evaluates the request, account option, and current booking contexts according to the Business Rules.
11. The checkout service processes the selected payment path.
12. The booking service completes the booking operation.
13. API-BOOKING-CREATE returns the booking-confirmation response.
14. Tripma makes the confirmation context available to the current workflow.
15. Tripma opens the booking-success experience.

### Alternative Flow

AF-1: Return to seat selection
6a. The visitor chooses Back to seat select.
6b. Tripma returns to the existing seat-selection context.

AF-2: Continue as a guest
4a. The visitor continues without selecting an account option.
4b. The Basic Flow resumes at step 5.

AF-3: Create an account during checkout
4c. The visitor chooses the account option and supplies the requested information.
4d. Tripma processes the option according to the Business Rules.
4e. The Basic Flow resumes at step 5.

AF-4: Save the payment method
4f. The visitor chooses the saved-payment option.
4g. Tripma processes the option according to the Business Rules.
4h. The Basic Flow resumes at step 5.

AF-5: Use another payment path
3a. The visitor chooses another payment path offered by Tripma.
3b. Tripma presents the corresponding controls.
3c. The Basic Flow resumes at step 3.

AF-6: Use the primary-passenger billing address
4i. The visitor chooses the corresponding billing-address option.
4j. Tripma updates the checkout form according to the Business Rules.
4k. The Basic Flow resumes at step 5.

### Exception Flow

EF-1: Checkout information requires attention
5a. If the checkout form does not satisfy the Business Rules, Tripma identifies the affected input and does not submit the booking request.

EF-2: Account step cannot be completed
8a. If the selected account step fails, Tripma preserves the usable checkout state and presents a recoverable outcome.
8b. Tripma does not submit API-BOOKING-CREATE.

EF-3: Payment is not accepted
11a. If payment processing does not succeed, API-BOOKING-CREATE returns the corresponding payment outcome.
11b. Tripma preserves the usable checkout state and does not open the success experience.

EF-4: Booking context changed
10a. If the current booking contexts can no longer be accepted, API-BOOKING-CREATE returns a conflict outcome.
10b. Tripma directs the visitor to the affected booking step.

EF-5: Booking operation fails
12a. If the booking operation cannot be completed, Tripma presents a recoverable outcome.
12b. No success experience is opened.

EF-6: Request cannot be completed
9a. If Tripma cannot complete the request because of a technical failure, it preserves the checkout form and presents a retryable error state.

### Related UI

Payment step of the booking page (`/booking`); payment-method selector; credit-card form; billing-address option; account-creation area; saved-payment option; cancellation-policy information; processing popup; Confirm and pay action; booking-success page

### Related API IDs

API-BOOKING-CREATE; supporting account endpoint `POST /api/auth/signup`

### Notes

Scope clarification: This use case covers the Tripma checkout operation that begins on the payment step and produces the confirmation context consumed by the success experience.

## UML Model

~~~plantuml
@startuml

enum PaymentMethod {
  CREDIT_CARD
  GOOGLE_PAY
  APPLE_PAY
  PAYPAL
  CRYPTO
}

enum PaymentStatus {
  PENDING
  AUTHORIZED
  DECLINED
  COMPLETED
  FAILED
}

enum BookingStatus {
  CONFIRMED
}

enum SeatClass {
  ECONOMY
  BUSINESS
}

class User <<Entity>> {
  id: UUID [1]
  email: String [1]
  passwordHash: String [1]
}

class Flight <<Entity>> {
  id: UUID [1]
  fromCity: String [1]
  toCity: String [1]
  imgPath: String [1]
  subtotalPrice: Decimal [1]
  taxesAndFees: Decimal [1]
  baggageFees: Decimal [1]
  currency: String [1]
  airlineName: String [1]
  duration: String [1]
  stopsNumber: Integer [1]
  stopsInfo: String [0..1]
  fromToTime: String [1]
  date: DateTime [1]
  arrivalAt: DateTime [1]
}

class Seat <<Entity>> {
  id: UUID [1]
  flightId: UUID [1]
  seatClass: SeatClass [1]
  seatNumber: String [1]
  available: Boolean [1]
  price: Decimal [1]
  currency: String [1]
}

class Booking <<Entity>> {
  id: UUID [1]
  userId: UUID [0..1]
  departingFlightId: UUID [1]
  returningFlightId: UUID [0..1]
  status: BookingStatus [1]
  confirmationCode: String [1]
  flightSubtotal: Decimal [1]
  taxesAndFees: Decimal [1]
  baggageFees: Decimal [1]
  upgradeFees: Decimal [1]
  total: Decimal [1]
  currency: String [1]
  createdAt: DateTime [1]
}

class PassengerInfo <<Entity>> {
  id: UUID [1]
  bookingId: UUID [1]
  passengerType: PassengerType [1]
  firstName: String [1]
  middleName: String [0..1]
  lastName: String [1]
  suffix: String [0..1]
  dateOfBirth: Date [1]
  email: String [0..1]
  phone: String [0..1]
  redressNumber: String [0..1]
  knownTravelerNumber: String [0..1]
}

enum PassengerType {
  ADULT
  MINOR
}

class EmergencyContact <<Entity>> {
  id: UUID [1]
  bookingId: UUID [1]
  firstName: String [1]
  lastName: String [1]
  email: String [1]
  phone: String [1]
}

class PassengerBaggage <<Entity>> {
  id: UUID [1]
  passengerInfoId: UUID [1]
  flightId: UUID [1]
  checkedBags: Integer [1]
  fee: Decimal [1]
  currency: String [1]
}

class SeatAssignment <<Entity>> {
  id: UUID [1]
  passengerInfoId: UUID [1]
  flightId: UUID [1]
  seatId: UUID [1]
  upgradeAmount: Decimal [1]
  currency: String [1]
}

class PaymentInfo <<Entity>> {
  id: UUID [1]
  bookingId: UUID [1]
  paymentMethod: PaymentMethod [1]
  status: PaymentStatus [1]
  providerTransactionId: String [1]
  paymentToken: String [0..1]
  nameOnCard: String [0..1]
  cardLastFour: String [0..1]
  expireDate: Date [0..1]
  amount: Decimal [1]
  currency: String [1]
  createdAt: DateTime [1]
}

class SavedPaymentMethod <<Entity>> {
  id: UUID [1]
  userId: UUID [1]
  paymentMethod: PaymentMethod [1]
  paymentToken: String [1]
  nameOnCard: String [0..1]
  cardLastFour: String [0..1]
  expireDate: Date [0..1]
  createdAt: DateTime [1]
}

class BillingAddressInputDto <<DTO>> {
  sameAsPrimaryPassenger: Boolean [1]
  addressLine1: String [0..1]
  addressLine2: String [0..1]
  city: String [0..1]
  region: String [0..1]
  postalCode: String [0..1]
  country: String [0..1]
}

class PaymentInputDto <<DTO>> {
  paymentMethod: PaymentMethod [1]
  nameOnCard: String [0..1]
  cardNumber: String [0..1]
  securityCode: String [0..1]
  expireDate: Date [0..1]
  providerToken: String [0..1]
}

class AccountOptionDto <<DTO>> {
  createAccount: Boolean [1]
  email: String [0..1]
  password: String [0..1]
  savePaymentMethod: Boolean [1]
}

class MakePaymentDto <<DTO>> {
  seatSelectionContextKey: String [1]
  payment: PaymentInputDto [1]
  billingAddress: BillingAddressInputDto [1]
  accountOption: AccountOptionDto [1]
}

class CheckoutContextDto <<DTO>> {
  seatSelectionContextKey: String [1]
  passengerContextKey: String [1]
  selectionContextKey: String [1]
  totalUpgradeAmount: Decimal [1]
  currency: String [1]
}

class FlightConfirmationDto <<DTO>> {
  flightId: UUID [1]
  fromCity: String [1]
  toCity: String [1]
  airlineName: String [1]
  date: DateTime [1]
  arrivalAt: DateTime [1]
}

class PassengerConfirmationDto <<DTO>> {
  passengerRef: String [1]
  firstName: String [1]
  lastName: String [1]
}

class SeatAssignmentConfirmationDto <<DTO>> {
  passengerRef: String [1]
  flightId: UUID [1]
  seatNumber: String [1]
  seatClass: SeatClass [1]
}

class BookingConfirmationDto <<DTO>> {
  bookingId: UUID [1]
  confirmationCode: String [1]
  status: BookingStatus [1]
  userId: UUID [0..1]
  paymentMethod: PaymentMethod [1]
  paymentStatus: PaymentStatus [1]
  paymentAccountDisplay: String [0..1]
  departingFlight: FlightConfirmationDto [1]
  returningFlight: FlightConfirmationDto [0..1]
  passengers: PassengerConfirmationDto [1..*]
  seatAssignments: SeatAssignmentConfirmationDto [1..*]
  flightSubtotal: Decimal [1]
  taxesAndFees: Decimal [1]
  baggageFees: Decimal [1]
  upgradeFees: Decimal [1]
  total: Decimal [1]
  currency: String [1]
  createdAt: DateTime [1]
}

class MakePaymentResponseDto <<DTO>> {
  success: Boolean [1]
  message: String [1]
  data: BookingConfirmationDto [0..1]
}

class MakePaymentService <<Service>> {
  canSubmit(dto: MakePaymentDto, currentUserId: UUID [0..1]): Boolean
  makePayment(dto: MakePaymentDto, currentUserId: UUID [0..1], idempotencyKey: String): MakePaymentResponseDto
  checkoutContextFor(seatSelectionContextKey: String): CheckoutContextDto [0..1] {query}
  hasConsistentCheckoutLineage(context: CheckoutContextDto): Boolean {query}
  isPaymentCardNumber(cardNumber: String): Boolean {query}
  isCardSecurityCode(securityCode: String): Boolean {query}
  isFutureCardExpiry(expireDate: Date): Boolean {query}
  isBillingAddressValid(address: BillingAddressInputDto, context: CheckoutContextDto): Boolean {query}
  isCheckoutInventoryAvailable(context: CheckoutContextDto): Boolean {query}
  baggageFeeTotal(context: CheckoutContextDto): Decimal {query}
  isCompleteBookingGraph(bookingId: UUID, context: CheckoutContextDto): Boolean {query}
}

class AccountService <<Service>> {
  createAccount(email: String, password: String): User
  isAccountInputValid(email: String, password: String): Boolean {query}
}

class PasswordHasher <<Service>> {
  hash(password: String, rounds: Integer): String
  matches(password: String, hash: String): Boolean {query}
  cost(hash: String): Integer {query}
}

User "1" -- "0..*" Booking : places
User "1" -- "0..*" SavedPaymentMethod : saves
Flight "1" -- "0..*" Seat : has
Flight "1" -- "0..*" Booking : departing flight
Flight "1" -- "0..*" Booking : returning flight
Booking "1" -- "1..*" PassengerInfo : contains
Booking "1" -- "1" EmergencyContact : uses
PassengerInfo "1" -- "1..*" PassengerBaggage : has
PassengerInfo "1" -- "1..*" SeatAssignment : receives
Seat "1" -- "0..*" SeatAssignment : assigned through
Flight "1" -- "0..*" PassengerBaggage : applies to
Flight "1" -- "0..*" SeatAssignment : applies to
Booking "1" -- "1" PaymentInfo : paid through

MakePaymentDto "1" *-- "1" PaymentInputDto : payment
MakePaymentDto "1" *-- "1" BillingAddressInputDto : billing address
MakePaymentDto "1" *-- "1" AccountOptionDto : account option
MakePaymentDto ..> CheckoutContextDto : resolves
BookingConfirmationDto "1" *-- "1" FlightConfirmationDto : departing flight
BookingConfirmationDto "1" *-- "0..1" FlightConfirmationDto : returning flight
BookingConfirmationDto "1" *-- "1..*" PassengerConfirmationDto : passengers
BookingConfirmationDto "1" *-- "1..*" SeatAssignmentConfirmationDto : seats
MakePaymentResponseDto "1" *-- "0..1" BookingConfirmationDto : data
MakePaymentService ..> MakePaymentDto
MakePaymentService ..> MakePaymentResponseDto
MakePaymentService ..> CheckoutContextDto
MakePaymentService ..> AccountService
AccountService ..> User
AccountService ..> PasswordHasher

@enduml
~~~

## Business Rules

The following rules are authoritative for Prompt E. OCL is preserved where applicable; technical or non-OCL constraints remain authoritative natural-language requirements.

~~~text
BR-PAY-001: Current checkout context
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_001_ContextAvailable:
  not dto.seatSelectionContextKey.oclIsUndefined() and
  trim(dto.seatSelectionContextKey) <> '' and
  not checkoutContextFor(dto.seatSelectionContextKey).oclIsUndefined()
pre BR_PAY_001_ContextLineage:
  hasConsistentCheckoutLineage(
    checkoutContextFor(dto.seatSelectionContextKey)
  )


BR-PAY-002: Guest or authenticated checkout
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_002_CurrentUser:
  currentUserId.oclIsUndefined() or
  User.allInstances()->exists(user | user.id = currentUserId)


BR-PAY-003: Supported payment method
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_003_Method:
  PaymentMethod::allInstances()->includes(dto.payment.paymentMethod)


BR-PAY-004: Credit-card information
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_004_CardFields:
  dto.payment.paymentMethod = PaymentMethod::CREDIT_CARD implies
    not dto.payment.nameOnCard.oclIsUndefined() and
    trim(dto.payment.nameOnCard) <> '' and
    not dto.payment.cardNumber.oclIsUndefined() and
    not dto.payment.securityCode.oclIsUndefined() and
    not dto.payment.expireDate.oclIsUndefined()


BR-PAY-005: Credit-card number
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_005_CardNumber:
  dto.payment.paymentMethod = PaymentMethod::CREDIT_CARD implies
    isPaymentCardNumber(dto.payment.cardNumber)


BR-PAY-006: Credit-card security code
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_006_SecurityCode:
  dto.payment.paymentMethod = PaymentMethod::CREDIT_CARD implies
    isCardSecurityCode(dto.payment.securityCode)


BR-PAY-007: Credit-card expiration
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_007_Expiration:
  dto.payment.paymentMethod = PaymentMethod::CREDIT_CARD implies
    isFutureCardExpiry(dto.payment.expireDate)


BR-PAY-008: Provider payment information
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_008_ProviderToken:
  dto.payment.paymentMethod <> PaymentMethod::CREDIT_CARD implies
    not dto.payment.providerToken.oclIsUndefined() and
    trim(dto.payment.providerToken) <> ''


BR-PAY-009: Billing address
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_009_Address:
  isBillingAddressValid(
    dto.billingAddress,
    checkoutContextFor(dto.seatSelectionContextKey)
  )


BR-PAY-010: Checkout readiness
context MakePaymentService::canSubmit(
  dto : MakePaymentDto,
  currentUserId : UUID
) : Boolean
post BR_PAY_010_Result:
  result =
    not dto.seatSelectionContextKey.oclIsUndefined() and
    trim(dto.seatSelectionContextKey) <> '' and
    not checkoutContextFor(dto.seatSelectionContextKey).oclIsUndefined() and
    hasConsistentCheckoutLineage(
      checkoutContextFor(dto.seatSelectionContextKey)) and
    (currentUserId.oclIsUndefined() or
      User.allInstances()->exists(user | user.id = currentUserId)) and
    PaymentMethod::allInstances()->includes(dto.payment.paymentMethod) and
    (if dto.payment.paymentMethod = PaymentMethod::CREDIT_CARD then
       not dto.payment.nameOnCard.oclIsUndefined() and
       trim(dto.payment.nameOnCard) <> '' and
       isPaymentCardNumber(dto.payment.cardNumber) and
       isCardSecurityCode(dto.payment.securityCode) and
       isFutureCardExpiry(dto.payment.expireDate)
     else
       not dto.payment.providerToken.oclIsUndefined() and
       trim(dto.payment.providerToken) <> ''
     endif) and
    isBillingAddressValid(
      dto.billingAddress,
      checkoutContextFor(dto.seatSelectionContextKey)) and
    (not dto.accountOption.createAccount or
      (currentUserId.oclIsUndefined() and
       isAccountInputValid(
         dto.accountOption.email,
         dto.accountOption.password))) and
    (not dto.accountOption.savePaymentMethod or
      not currentUserId.oclIsUndefined() or
      dto.accountOption.createAccount)


BR-PAY-011: Optional account creation
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_011_AccountInput:
  dto.accountOption.createAccount implies
    currentUserId.oclIsUndefined() and
    isAccountInputValid(dto.accountOption.email, dto.accountOption.password)
post BR_PAY_011_BookingOwner:
  result.success and dto.accountOption.createAccount implies
    not result.data.userId.oclIsUndefined()


BR-PAY-012: Save payment method
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_012_SaveOwner:
  dto.accountOption.savePaymentMethod implies
    (not currentUserId.oclIsUndefined() or
      dto.accountOption.createAccount)
post BR_PAY_012_SavedMethod:
  result.success and dto.accountOption.savePaymentMethod implies
    SavedPaymentMethod.allInstances()->one(method |
      method.userId = result.data.userId and
      method.paymentMethod = result.data.paymentMethod and
      not method.paymentToken.oclIsUndefined() and
      trim(method.paymentToken) <> '')


BR-PAY-013: Payment authorization
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
post BR_PAY_013_AuthorizedBeforeConfirmation:
  result.success implies
    result.data.paymentStatus = PaymentStatus::COMPLETED and
    PaymentInfo.allInstances()->one(payment |
      payment.bookingId = result.data.bookingId and
      payment.status = PaymentStatus::COMPLETED and
      payment.amount = result.data.total and
      payment.currency = result.data.currency and
      not payment.providerTransactionId.oclIsUndefined() and
      trim(payment.providerTransactionId) <> '')


BR-PAY-014: Current flight and seat inventory
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_014_Inventory:
  isCheckoutInventoryAvailable(
    checkoutContextFor(dto.seatSelectionContextKey)
  )


BR-PAY-015: Baggage fee total
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
post BR_PAY_015_BaggageFees:
  result.success implies
    result.data.baggageFees = baggageFeeTotal(
      checkoutContextFor(dto.seatSelectionContextKey)
    )


BR-PAY-016: Upgrade fee total
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
post BR_PAY_016_UpgradeFees:
  result.success implies
    result.data.upgradeFees =
      checkoutContextFor(dto.seatSelectionContextKey).totalUpgradeAmount


BR-PAY-017: Booking total
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
post BR_PAY_017_Total:
  result.success implies
    result.data.total = result.data.flightSubtotal +
      result.data.taxesAndFees +
      result.data.baggageFees +
      result.data.upgradeFees


BR-PAY-018: Atomic and idempotent booking creation
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
pre BR_PAY_018_IdempotencyKey:
  not idempotencyKey.oclIsUndefined() and trim(idempotencyKey) <> ''
post BR_PAY_018_BookingGraph:
  result.success implies
    isCompleteBookingGraph(
      result.data.bookingId,
      checkoutContextFor(dto.seatSelectionContextKey)
    )
Technical constraints:
- Booking, passenger, emergency-contact, baggage, seat-assignment and payment writes, together with the seat-availability update, must commit in one database transaction.
- Repeating a request with the same idempotency key returns the original outcome and must not create another charge or booking.


BR-PAY-019: Booking confirmation
context MakePaymentService::makePayment(
  dto : MakePaymentDto,
  currentUserId : UUID,
  idempotencyKey : String
) : MakePaymentResponseDto
post BR_PAY_019_Confirmation:
  result.success implies
    result.data.status = BookingStatus::CONFIRMED and
    result.data.confirmationCode.size() = 12 and
    Booking.allInstances()->one(booking |
      booking.id = result.data.bookingId and
      lower(trim(booking.confirmationCode)) =
        lower(trim(result.data.confirmationCode))) and
    not result.data.createdAt.oclIsUndefined()


BR-PAY-020: Sensitive payment-data handling
Raw card numbers and security codes shall not be stored in Booking,
PaymentInfo, or SavedPaymentMethod records and shall not be returned by
API-BOOKING-CREATE.
Technical constraints:
- Raw card data and security codes must not be written to application logs, analytics, URLs or query strings.
- Provider tokens must be encrypted at rest and excluded from default ORM selection and API responses.
- A security code is used only for the immediate authorization attempt and is discarded afterward.
- Account passwords must be hashed by the account service and must not be logged or persisted in plaintext.

~~~
