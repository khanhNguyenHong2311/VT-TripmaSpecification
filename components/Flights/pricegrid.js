import React, { useState, useEffect } from "react";
import styles from "./pricegrid.module.css";

const PriceGrid = ({ fromCity, toCity, startDate }) => {
  const [gridData, setGridData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!fromCity || !toCity || !startDate) return;

    const fetchGrid = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/price-grid?fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}&startDate=${encodeURIComponent(startDate)}`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error);

        setGridData(data);
      } catch (err) {
        console.error("Failed to fetch price grid", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrid();
  }, [fromCity, toCity, startDate]);

  const gridItems = [];

  if (gridData && gridData.headers && gridData.rows) {
    // Render top-left empty cell
    gridItems.push(<div key={`empty`} className={styles.emptyHeader}></div>);

    // Render column headers (depart dates)
    gridData.headers.forEach((header, index) => {
      gridItems.push(
        <div key={`header-col-${index}`} className={styles.headerItem}>
          {header}
        </div>
      );
    });

    // Render rows
    gridData.rows.forEach((row, rowIndex) => {
      // Row header (return dates)
      gridItems.push(
        <div key={`header-row-${rowIndex}`} className={styles.headerItem}>
          {row.label}
        </div>
      );

      // Row cells (prices)
      row.prices.forEach((price, colIndex) => {
        gridItems.push(
          <div key={`cell-${rowIndex}-${colIndex}`} className={styles.gridItem}>
            ${Math.round(price)}
          </div>
        );
      });
    });
  }

  return (
    <div className={styles.gridpricecontainer}>
      <div className={styles.pricecontainer}>
        <h4>
          Price grid <span>(flexible dates)</span>
        </h4>
      </div>
      <div className={styles.gridContainer}>
        {isLoading ? <p>Loading grid...</p> : gridItems}
      </div>
    </div>
  );
};

export default PriceGrid;
