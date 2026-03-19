import { useState } from "react";
import "../styles/PostCard.scss";
import { EllipsisVertical, X } from "lucide-react";

export default function PostCard({ post, onEdit, onDelete }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <main className="card">
      <div className="card-head">
        <div className="card-user">
          <div className="card-ring">
            <img
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${post.id}`}
              alt={post.username}
            />
          </div>
          <div>
            <p className="card-name">{post.username}</p>
            <p className="card-loc">{post.location}</p>
          </div>
        </div>
        <div className="card-menu-wrap">
          <button
            className="card-dots"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <EllipsisVertical />
          </button>
          {menuOpen && (
            <div className="card-dropdown">
              <button
                onClick={() => {
                  onEdit(post);
                  setMenuOpen(false);
                }}
              >
                ✏️ Edit
              </button>
              <button
                className="del"
                onClick={() => {
                  onDelete(post.id);
                  setMenuOpen(false);
                }}
              >
                🗑️ Delete
              </button>
              <button
                className="cal"
                onClick={() => {
                 ;
                  setMenuOpen(false);
                }}
              >
                <X width={19}/> Cancle
              </button>
            </div>
          )}
        </div>
      </div>

      {post.image && <img src={post.image} alt="post" className="card-img" />}

      <div className="card-actions">
        <div className="card-left">
          <button
            className={`card-btn ${liked ? "liked" : ""}`}
            onClick={toggleLike}
          >
            <svg
              viewBox="0 0 24 24"
              fill={liked ? "red" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="card-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
        <button
          className={`card-btn ${saved ? "saved" : ""}`}
          onClick={() => setSaved((prev) => !prev)}
        >
          <svg
            viewBox="0 0 24 24"
            fill={saved ? "white" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <div className="card-body">
        <p className="card-likes">{likeCount.toLocaleString()} likes</p>
        <p className="card-caption">
          <span>{post.username}</span> {post.content}
        </p>
        {post.tags.length > 0 && (
          <p className="card-tags">
            {post.tags.map((tag) => `#${tag}`).join(" ")}
          </p>
        )}
        <p className="card-time">{post.createdAt}</p>
      </div>
    </main>
  );
}
