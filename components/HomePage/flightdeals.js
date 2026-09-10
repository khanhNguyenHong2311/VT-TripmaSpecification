import { useState, useEffect } from "react";
import PlaceCard from "./placecard";
import styles from "./flightdeals.module.css";
import Image from "next/image";

function NamePriceComponent({ placename, city, price }) {
  return (
    <div className={styles.locationpricecontainer}>
      <div className={styles.placeinfocontainer}>
        <h4 className={styles.country}>{`${placename}, `}</h4>
        <h4 className={styles.city}>{city}</h4>
      </div>
      {price && <h4 className={styles.price}>${price}</h4>}
    </div>
  );
}

function TextComponent({ normaltext, specialtext }) {
  return (
    <div className={styles.textonly}>
      <h4 className={styles.normaltext}>{normaltext}</h4>
      <span className={styles.specialtext}>{specialtext}</span>
    </div>
  );
}
function HotelComponent({ text }) {
  return (
    <div>
      <h4 className={styles.text}>{text}</h4>
    </div>
  );
}

export default function FlightDeals({
  showfull = true,
  Header,
  type,
  imgpath,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const endpoint = type === "FLIGHTS" ? "/api/flight-deals" : "/api/unique-places";
        const res = await fetch(endpoint);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching deals", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type]);

  const renderInnerElement = (item) => {
    if (type === "FLIGHTS") {
      return <NamePriceComponent placename={item.placeName} city={item.city} price={item.price} />;
    } else if (type === "HOTEL") {
      return <HotelComponent text={item.placeName} />;
    } else {
      return <TextComponent normaltext={item.description} specialtext={item.placeName} />;
    }
  };

  const topItems = data.slice(0, 3);
  const fullItem = data.length > 3 ? data[3] : null;

  return (
    <div className={styles.outercontainer}>
      <div className={styles.descriptioncontainer}>
        {Header && <Header />}
        <div className={styles.rightdescription}>
          <span>All</span>
          <Image
            src="./arrowRight.svg"
            alt="arrowRight"
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={styles.combinedcontainer}>
              {topItems.map((item) => (
                <PlaceCard
                  key={item.id}
                  imageSrc={item.imgPath || imgpath}
                  description={item.description}
                  width={410.67}
                  height={397}
                >
                  {renderInnerElement(item)}
                </PlaceCard>
              ))}
            </div>
            {showfull && fullItem && (
              <PlaceCard
                imageSrc="./flightdealfull.svg"
                description={fullItem.description}
                width={1312}
                height={397}
              >
                {renderInnerElement(fullItem)}
              </PlaceCard>
            )}
          </>
        )}
      </div>
    </div>
  );
}
