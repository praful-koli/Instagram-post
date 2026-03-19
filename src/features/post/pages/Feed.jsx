import { useState } from "react";
import PostCard from "../components/PostCard";
import PostModal from "../components/PostModal";
import "../styles/Feed.scss";

let nextId = 4;
const INIT_POSTS = [
  {
    id: 1,
    username: "alex winters",
    location: "Patagonia",
    content: "Lost in the mountains, found myself. 🏔️",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    tags: ["travel", "nature"],
    likes: 2847,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    username: "maya shots",
    location: "Kyoto, Japan",
    content: "Golden hour in the bamboo forest. 🌿",
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80",
    tags: ["photography", "mood"],
    likes: 5134,
    createdAt: "5 hours ago",
  },
  {
    id: 3,
    username: "liam creates",
    location: "New York City",
    content: "Every city has a heartbeat. NYC's is the loudest. ⚡",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    tags: ["life", "vibes"],
    likes: 1293,
    createdAt: "1 day ago",
  },
];

const STORY_USERS = ["alex", "maya", "liam", "priya", "oscar"];
const NAV_ITEMS = [
  ["🏠", "Home"],
  ["🔍", "Search"],
  ["🧭", "Explore"],
  ["❤️", "Alerts"],
];

export default function Feed() {
  const [posts, setPosts] = useState(INIT_POSTS);
  const [showCreate, setShowCreate] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const createPost = (postData) => {
    const newPost = {
      ...postData,
      id: nextId++,
      likes: 0,
      createdAt: "just now",
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowCreate(false);
  };

  const updatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post,
      ),
    );
    setEditPost(null);
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <main className="feed">
      <aside className="feed-side">
        <div className="feed-logo">📸 Postify</div>
        <nav>
          {NAV_ITEMS.map(([icon, label]) => (
            <button
              key={label}
              className={`feed-nav ${label === "Home" ? "active" : ""}`}
            >
              {icon} <span>{label}</span>
            </button>
          ))}
        </nav>
        <button className="feed-create" onClick={() => setShowCreate(true)}>
          ＋ <span>Create</span>
        </button>
      </aside>

      <main className="feed-main">
        <div className="feed-stories">
          {STORY_USERS.map((name) => (
            <div key={name} className="feed-story">
              <div className="feed-story-ring">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}`}
                  alt={name}
                />
              </div>
              <span>{name}</span>
            </div>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="feed-empty">
            <p>No posts yet</p>
            <button onClick={() => setShowCreate(true)}>
              Create first post
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={setEditPost}
              onDelete={deletePost}
              
            />
          ))
        )}
      </main>

      {showCreate && (
        <PostModal onSave={createPost} onClose={() => setShowCreate(false)} />
      )}
      {editPost && (
        <PostModal
          post={editPost}
          onSave={updatePost}
          onClose={() => setEditPost(null)}
        />
      )}
    </main>
  );
}
