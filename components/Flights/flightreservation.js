import React, { useState } from "react";
import FlightContainer from "@/components/Flights/flightscontainer";
import PriceChart from "@/components/Flights/pricechart";
import PriceGrid from "@/components/Flights/pricegrid";
import PriceRating from "@/components/Flights/pricerating";
import Reservation from "@/components/Flights/reservation";
import Image from "next/image";
import styles from "./flightreservation.module.css";

export default function FlightReservation({
  action,
  selectedFlights,
  handleSelectFlight,
  phase,
  arrivingFlights,
  departingFlights,
  type,
  searchParams,
}) {
  console.log(selectedFlights);
  
  const fromCity = searchParams?.fromCity;
  const toCity = searchParams?.toCity;
  const startDate = searchParams?.startDate;

  return (
    <div className={styles.flightpricesinfo}>
      <div className={styles.flightsinfo}>
        <FlightContainer
          onSelectFlight={handleSelectFlight}
          phase={phase}
          arrivingFlights={arrivingFlights}
          departingFlights={departingFlights}
          
        />
        <div className={styles.imagecontainer}>
          <Image src="./Map.svg" alt="Map" width={872} height={171} />
        </div>
      </div>
      <div className={styles.pricesinfo}>
        {selectedFlights.length === 0 ? (
          <>
            <PriceGrid fromCity={fromCity} toCity={toCity} startDate={startDate} />
            <PriceChart fromCity={fromCity} toCity={toCity} />
            <PriceRating />
          </>
        ) : (
          <Reservation
            flights={selectedFlights}
            action={action}
            FlightType={type}
          />
        )}
      </div>
    </div>
  );
}
