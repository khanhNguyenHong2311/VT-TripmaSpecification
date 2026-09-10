import { useState, useEffect } from "react";
import CommentCard from "./comment";
import styles from "./commentsection.module.css";
export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch("/api/comments");
        if (res.ok) {
          const json = await res.json();
          setComments(json);
        }
      } catch (error) {
        console.error("Error fetching comments", error);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);

  return (
    <div className={styles.outercontainer}>
      <div className={styles.textconatiner}>
        <h3>
          What <span>Tripma</span> users are saying
        </h3>
      </div>
      <div className={styles.combinedcontainer}>
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} data={comment} />
          ))
        )}
      </div>
    </div>
  );
}
