---
artifact_type: business-use-case-specification
status: "Draft"
uc_id: UC-03
uc_name: "Enter Passenger Information"
source_type: google-sheets
source_spreadsheet_id: 1MWKBKTHG4J6is5z-MJ8rNgbOU72Vs0C5YG8ITCSoawY
source_sheet: "Use cases"
source_range: "A66:B81"
retrieved_at: 2026-09-10T15:49:24.0389327+07:00
---

# UC-03: Enter Passenger Information

> Source reference: [Tripma Specification](https://docs.google.com/spreadsheets/d/1MWKBKTHG4J6is5z-MJ8rNgbOU72Vs0C5YG8ITCSoawY/edit?usp=sharing), tab Use cases, columns A-B. This repository version may refine the reference behavior for the target system.

## Functional Use-Case Specification

### Use Case ID

UC-03

### Use Case Name

Enter Passenger Information

### Description

As a visitor, I want to provide passenger and booking-contact information for my selected Tripma itinerary so that I can continue to seat selection.

### Actor(s)

Visitor

### Priority

High

### Trigger

The visitor enters the Tripma passenger-information experience from a completed flight selection.

### Pre-Condition(s)

PRE-1: A completed Tripma flight-selection context is available.
PRE-2: The passenger-information experience can access that context.

### Post-Condition(s)

POST-1: When the submitted information is accepted, Tripma makes a passenger-information context available to the seat-selection experience.
POST-2: Tripma preserves the current flight-selection context throughout this use case.
POST-3: When the submitted information cannot be accepted, Tripma keeps the visitor in the passenger-information experience and reports the outcome.

### Basic Flow

1. Tripma opens the passenger-information experience for the current flight selection.
2. Tripma presents the passenger, booking-contact, and baggage controls required for the current trip.
3. The visitor provides passenger information.
4. The visitor provides booking-contact information.
5. The visitor provides baggage information.
6. Tripma evaluates the current form according to the Business Rules of this use case.
7. Tripma makes the seat-selection action available when the form is ready to continue.
8. The visitor chooses to continue to seat selection.
9. Tripma submits the current information through API-PASSENGER-INFO-PREPARE.
10. The passenger-information service evaluates and normalizes the request according to the Business Rules of this use case.
11. The service returns the prepared passenger-information context.
12. Tripma stores the returned context for the current booking workflow.
13. Tripma opens the seat-selection experience.

### Alternative Flow

AF-1: Use a passenger as the booking contact
4a. The visitor chooses the offered passenger-contact option.
4b. Tripma updates the contact portion of the form according to the Business Rules.
4c. The Basic Flow resumes at step 5.

AF-2: Provide a separate booking contact
4d. The visitor chooses to provide separate booking-contact information.
4e. Tripma presents the corresponding contact controls.
4f. The visitor provides the contact information.
4g. The Basic Flow resumes at step 5.

AF-3: Leave optional information empty
3a. The visitor omits one or more optional inputs.
3b. Tripma retains the omitted state.
3c. The Basic Flow resumes at step 4.

AF-4: Save and close the in-progress form
7a. The visitor chooses Save and Close.
7b. Tripma processes the current form according to the Business Rules.
7c. The use case ends without entering the seat-selection experience.

AF-5: Resume an in-progress form
1a. Tripma finds a previously saved passenger form.
1b. Tripma evaluates and restores it according to the Business Rules.
1c. The Basic Flow resumes at step 2.

AF-6: Correct submitted information
10a. The service identifies information that needs attention.
10b. Tripma associates the returned outcome with the affected form control.
10c. The visitor updates the information.
10d. The Basic Flow resumes at step 6.

### Exception Flow

EF-1: Passenger form is not ready to continue
6a. If the current form does not satisfy the Business Rules, Tripma keeps the visitor in the passenger-information experience and identifies the affected input.
6b. The seat-selection action remains unavailable.

EF-2: Passenger-information request is rejected
10e. If the service rejects the request, it returns the API-PASSENGER-INFO-PREPARE client-error response.
10f. Tripma preserves the visitor's current form and presents a recoverable outcome.

EF-3: Passenger-information service is unavailable
9a. If Tripma cannot complete the request because of a technical failure, it preserves the visitor's current form and presents a retryable error state.
9b. Tripma does not open the seat-selection experience.

EF-4: In-progress form cannot be saved or restored
7d. If Tripma cannot process an in-progress form, it preserves the current usable state and presents a recoverable outcome.

### Related UI

Passenger-information step of the booking page (`/booking`); passenger form; booking-contact form; baggage controls; Save and Close action; seat-selection action

### Related API IDs

API-PASSENGER-INFO-PREPARE

### Notes

Scope clarification: This use case prepares information for the next booking step. It does not create a booking, assign a seat, take payment, or commit passenger records. Those actions belong to later use cases.

## UML Model

~~~plantuml
@startuml

enum PassengerType {
  ADULT
  MINOR
}

class Booking <<Entity>> {
  id: UUID [1]
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

class BookingContact <<Entity>> {
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
}

class SelectedFlightContextDto <<DTO>> {
  selectionContextKey: String [1]
  type: Boolean [1]
  currency: String [1]
  departingFlight: FlightDto [1]
  returningFlight: FlightDto [0..1]
}

class SearchDto <<DTO>> {
  fromCity: String [1]
  toCity: String [1]
  startDate: Date [1]
  endDate: Date [0..1]
  adults: Integer [1]
  minors: Integer [1]
  type: Boolean [1]
}

class FlightDto <<DTO>> {
  flightId: UUID [1]
  fromCity: String [1]
  toCity: String [1]
  type: Boolean [1]
  imgPath: String [1]
  subtotalPrice: Decimal [1]
  taxesAndFees: Decimal [1]
  airlineName: String [1]
  duration: String [1]
  fromToTime: String [1]
  date: DateTime [1]
  arrivalAt: DateTime [1]
  availableSeats: Integer [1]
  stopsNumber: Integer [1]
  stopsInfo: String [0..1]
}

class PassengerTripContextDto <<DTO>> {
  selectedFlights: SelectedFlightContextDto [1]
  searchParams: SearchDto [1]
  departingMaxCheckedBagsPerPassenger: Integer [1]
  returningMaxCheckedBagsPerPassenger: Integer [0..1]
}

class PassengerInputDto <<DTO>> {
  passengerRef: String [1]
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

class PassengerBaggageInputDto <<DTO>> {
  passengerRef: String [1]
  departingCheckedBags: Integer [1]
  returningCheckedBags: Integer [0..1]
}

class BookingContactInputDto <<DTO>> {
  usePrimaryPassenger: Boolean [1]
  firstName: String [0..1]
  lastName: String [0..1]
  email: String [0..1]
  phone: String [0..1]
}

class PassengerFormDto <<DTO>> {
  selectionContextKey: String [1]
  primaryPassengerRef: String [1]
  passengers: PassengerInputDto [1..*]
  baggage: PassengerBaggageInputDto [1..*]
  contact: BookingContactInputDto [1]
}

class PreparedPassengerContextDto <<DTO>> {
  passengerContextKey: String [1]
  selectionContextKey: String [1]
  primaryPassengerRef: String [1]
  passengers: PassengerInputDto [1..*]
  baggage: PassengerBaggageInputDto [1..*]
  contact: BookingContactInputDto [1]
  preparedAt: DateTime [1]
}

class SavedPassengerFormDto <<DTO>> {
  selectionContextKey: String [1]
  form: PassengerFormDto [1]
  savedAt: DateTime [1]
}

class PassengerInformationState <<State>> {
  tripContext: PassengerTripContextDto [1]
  form: PassengerFormDto [1]
  preparedContext: PreparedPassengerContextDto [0..1]
}

class PassengerInformationService <<Service>> {
  canContinue(tripContext: PassengerTripContextDto, form: PassengerFormDto): Boolean
  isPassengerInputValid(tripContext: PassengerTripContextDto, form: PassengerFormDto): Boolean {query}
  prepare(tripContext: PassengerTripContextDto, form: PassengerFormDto): PreparedPassengerContextDto
  saveForm(tripContext: PassengerTripContextDto, form: PassengerFormDto): SavedPassengerFormDto
  restoreForm(tripContext: PassengerTripContextDto, saved: SavedPassengerFormDto): PassengerFormDto
}

Booking "1" -- "1..*" PassengerInfo : contains
Booking "1" -- "1" BookingContact : uses
PassengerInfo "1" -- "1..*" PassengerBaggage : has

SelectedFlightContextDto "1" *-- "1" FlightDto : departing
SelectedFlightContextDto "1" *-- "0..1" FlightDto : returning
PassengerTripContextDto "1" *-- "1" SelectedFlightContextDto : selected flights
PassengerTripContextDto "1" *-- "1" SearchDto : search parameters
PassengerFormDto "1" *-- "1..*" PassengerInputDto : passengers
PassengerFormDto "1" *-- "1..*" PassengerBaggageInputDto : baggage
PassengerFormDto "1" *-- "1" BookingContactInputDto : contact
PreparedPassengerContextDto "1" *-- "1..*" PassengerInputDto : passengers
PreparedPassengerContextDto "1" *-- "1..*" PassengerBaggageInputDto : baggage
PreparedPassengerContextDto "1" *-- "1" BookingContactInputDto : contact
PassengerInformationState "1" *-- "1" PassengerTripContextDto : current trip
PassengerInformationState "1" *-- "1" PassengerFormDto : current form
PassengerInformationState "1" *-- "0..1" PreparedPassengerContextDto : prepared result

PassengerInformationService ..> PassengerTripContextDto
PassengerInformationService ..> PassengerFormDto
PassengerInformationService ..> PreparedPassengerContextDto
PassengerInformationService ..> SavedPassengerFormDto

PassengerInfo ..> PassengerInputDto : later maps from
BookingContact ..> BookingContactInputDto : later maps from
PassengerBaggage ..> PassengerBaggageInputDto : later maps from

note right of SelectedFlightContextDto
  type = false represents one-way.
  type = true represents round-trip.

  This DTO and FlightDto are shared with UC-02.
  SearchDto is shared with UC-01 and UC-02.
end note

note right of PassengerFormDto
  passengerRef is a booking-workflow reference,
  not a persisted passenger identifier.
end note

note bottom of PreparedPassengerContextDto
  This is a transient booking-workflow context.
  API-PASSENGER-INFO-PREPARE does not persist
  the entity classes shown in this model.
end note

note bottom of Booking
  The entity classes describe the target persistence
  vocabulary used by the later booking-creation use case.
  Physical table names, column names, database types,
  constraints, and migrations require the separate
  DATABASE-SCHEMA.md approval workflow.
end note

@enduml
~~~

## Business Rules

The following rules are authoritative for Prompt E. OCL is preserved where applicable; technical or non-OCL constraints remain authoritative natural-language requirements.

~~~text
BR-PASS-001: Passenger coverage and primary passenger
context PassengerInformationService::prepare(
  tripContext : PassengerTripContextDto,
  form : PassengerFormDto
) : PreparedPassengerContextDto
pre BR_PASS_001_CurrentSelection:
  form.selectionContextKey =
    tripContext.selectedFlights.selectionContextKey

pre BR_PASS_001_TripTypeConsistent:
  tripContext.searchParams.type = tripContext.selectedFlights.type and
  form.passengers->size() =
    tripContext.searchParams.adults + tripContext.searchParams.minors

pre BR_PASS_001_PassengerTypesMatchSearch:
  form.passengers->select(p |
    p.passengerType = PassengerType::ADULT)->size() =
      tripContext.searchParams.adults and
  form.passengers->select(p |
    p.passengerType = PassengerType::MINOR)->size() =
      tripContext.searchParams.minors

pre BR_PASS_001_UniqueReferences:
  form.passengers->isUnique(p | p.passengerRef)

pre BR_PASS_001_PrimaryPassenger:
  form.passengers->one(passenger |
    passenger.passengerRef = form.primaryPassengerRef and
    passenger.passengerType = PassengerType::ADULT)


BR-PASS-002: Required passenger information
context PassengerInformationService::prepare(
  tripContext : PassengerTripContextDto,
  form : PassengerFormDto
) : PreparedPassengerContextDto
pre BR_PASS_002_RequiredValues:
  form.passengers->forAll(passenger |
    not passenger.passengerRef.oclIsUndefined() and
    trim(passenger.passengerRef).size() > 0 and
    not passenger.firstName.oclIsUndefined() and
    trim(passenger.firstName).size() > 0 and
    not passenger.lastName.oclIsUndefined() and
    trim(passenger.lastName).size() > 0 and
    not passenger.dateOfBirth.oclIsUndefined()
  )


BR-PASS-003: Passenger type and date of birth
context PassengerInformationService::prepare(
  tripContext : PassengerTripContextDto,
  form : PassengerFormDto
) : PreparedPassengerContextDto
pre BR_PASS_003_BirthDatesPrecedeDeparture:
  let departureDate : Date = localDate(
        tripContext.selectedFlights.departingFlight.date,
        timeZoneForCity(
          tripContext.selectedFlights.departingFlight.fromCity
        )
      )
  in
    form.passengers->forAll(passenger |
      passenger.dateOfBirth < departureDate)

pre BR_PASS_003_PassengerTypesMatchAgeOnDeparture:
  let departureDate : Date = localDate(
        tripContext.selectedFlights.departingFlight.date,
        timeZoneForCity(
          tripContext.selectedFlights.departingFlight.fromCity
        )
      )
  in
    form.passengers->forAll(passenger |
      let age : Integer = ageOn(passenger.dateOfBirth, departureDate)
      in
      (passenger.passengerType = PassengerType::ADULT implies age >= 18) and
      (passenger.passengerType = PassengerType::MINOR implies age < 18)
    )


BR-PASS-004: Passenger and booking-contact information
context PassengerInformationService::prepare(
  tripContext : PassengerTripContextDto,
  form : PassengerFormDto
) : PreparedPassengerContextDto
pre BR_PASS_004_PassengerChannelsWhenPresent:
  form.passengers->forAll(passenger |
    (passenger.email.oclIsUndefined() or
      isEmail(lower(trim(passenger.email)))) and
    (passenger.phone.oclIsUndefined() or
      isPhone(trim(passenger.phone)))
  )

pre BR_PASS_004_ContactSource:
  let primary : PassengerInputDto = form.passengers->any(passenger |
        passenger.passengerRef = form.primaryPassengerRef)
  in
    if form.contact.usePrimaryPassenger then
      not primary.email.oclIsUndefined() and
      isEmail(lower(trim(primary.email))) and
      not primary.phone.oclIsUndefined() and
      isPhone(trim(primary.phone))
    else
      not form.contact.firstName.oclIsUndefined() and
      trim(form.contact.firstName).size() > 0 and
      not form.contact.lastName.oclIsUndefined() and
      trim(form.contact.lastName).size() > 0 and
      not form.contact.email.oclIsUndefined() and
      isEmail(lower(trim(form.contact.email))) and
      not form.contact.phone.oclIsUndefined() and
      isPhone(trim(form.contact.phone))
    endif


BR-PASS-005: Baggage coverage and limits
context PassengerInformationService::prepare(
  tripContext : PassengerTripContextDto,
  form : PassengerFormDto
) : PreparedPassengerContextDto
pre BR_PASS_005_OneEntryPerPassenger:
  form.baggage->size() = form.passengers->size() and
  form.baggage->isUnique(item | item.passengerRef) and
  form.baggage->forAll(item |
    form.passengers->exists(passenger |
      passenger.passengerRef = item.passengerRef))
pre BR_PASS_005_DepartingRange:
  form.baggage->forAll(item |
    item.departingCheckedBags >= 0 and
    item.departingCheckedBags <=
      tripContext.departingMaxCheckedBagsPerPassenger)
pre BR_PASS_005_ReturningRange:
  if tripContext.selectedFlights.type = true then
    not tripContext.selectedFlights.returningFlight.oclIsUndefined() and
    not tripContext.returningMaxCheckedBagsPerPassenger.oclIsUndefined() and
    form.baggage->forAll(item |
      not item.returningCheckedBags.oclIsUndefined() and
      item.returningCheckedBags >= 0 and
      item.returningCheckedBags <=
        tripContext.returningMaxCheckedBagsPerPassenger)
  else
    tripContext.selectedFlights.returningFlight.oclIsUndefined() and
    tripContext.returningMaxCheckedBagsPerPassenger.oclIsUndefined() and
    form.baggage->forAll(item |
      item.returningCheckedBags.oclIsUndefined())
  endif
Technical constraint:
- The service obtains baggage limits from the authoritative selected-flight data addressed by the request; it does not accept a client-supplied baggage limit as authoritative.


BR-PASS-006: Prepared passenger context
context PassengerInformationService::prepare(
  tripContext : PassengerTripContextDto,
  form : PassengerFormDto
) : PreparedPassengerContextDto
post BR_PASS_006_ContextIdentity:
  not result.passengerContextKey.oclIsUndefined() and
  trim(result.passengerContextKey).size() > 0 and
  result.selectionContextKey = tripContext.selectedFlights.selectionContextKey and
  result.primaryPassengerRef = form.primaryPassengerRef and
  not result.preparedAt.oclIsUndefined()

post BR_PASS_006_ContextData:
  result.passengers = normalizePassengers(form.passengers) and
  result.baggage = form.baggage and
  result.contact = bookingContactOf(form)


BR-PASS-007: Completion readiness
context PassengerInformationService::canContinue(
  tripContext : PassengerTripContextDto,
  form : PassengerFormDto
) : Boolean
post BR_PASS_007_Result:
  result = self.isPassengerInputValid(tripContext, form)


BR-PASS-008: Save and restore the current passenger form
context PassengerInformationService::saveForm(
  tripContext : PassengerTripContextDto,
  form : PassengerFormDto
) : SavedPassengerFormDto
pre BR_PASS_008_CurrentContextToSave:
  form.selectionContextKey = tripContext.selectedFlights.selectionContextKey
post BR_PASS_008_SavedForm:
  result.selectionContextKey = tripContext.selectedFlights.selectionContextKey and
  result.form = form and
  not result.savedAt.oclIsUndefined()

context PassengerInformationService::restoreForm(
  tripContext : PassengerTripContextDto,
  saved : SavedPassengerFormDto
) : PassengerFormDto
pre BR_PASS_008_SameSelectionContext:
  saved.selectionContextKey = tripContext.selectedFlights.selectionContextKey and
  saved.form.selectionContextKey = tripContext.selectedFlights.selectionContextKey
post BR_PASS_008_RestoredForm:
  result = saved.form
Technical constraints:
- Saved passenger data must use protected, time-limited storage. It must be removed when the flight selection changes, the booking finishes, the visitor discards the form, or the retention period expires.
- A saved form that cannot be read safely or no longer belongs to the current selection is ignored without replacing the current usable form.


BR-PASS-009: Preparation has no persistence side effects
API-PASSENGER-INFO-PREPARE shall not create, update, or delete Booking,
PassengerInfo, BookingContact, PassengerBaggage, Flight, or Seat records.
Technical constraint:
- Passenger information is sent only in an HTTPS request body. Query strings, URLs, analytics payloads, and application logs must not contain raw passenger or contact values.

~~~
