import Image from "next/image";
import styles from "./comment.module.css";
import { FaStar } from "react-icons/fa";
export default function CommentCard({ data }) {
  if (!data) return null;

  const { rate: rating, description: comment, date, User } = data;
  const name = User?.name || "Unknown User";
  const image = User?.image || "./commenter.svg";
  
  // Format date to something like "April 2023"
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const place = `Joined | ${formattedDate}`;

  return (
    <div className={styles.commentContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
        />
      </div>
      <div className={styles.textSection}>
        <div className={styles.userData}>
          <span className={styles.name}>{name}</span>
          <span className={styles.place}>{place}</span>
          <div className={styles.userRating}>
            {[...Array(5)].map((star, index) => (
              <FaStar
                key={index}
                className={
                  index < rating ? styles.starFilled : styles.starEmpty
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.preview}>
          <p className={styles.comment}>{comment}</p>
          <span>readmore...</span>
        </div>
      </div>
    </div>
  );
}
