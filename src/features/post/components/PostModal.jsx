import { useState, useRef } from "react";
import "../styles/PostModal.scss";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80",
];
const ALL_TAGS = [
  "travel",
  "nature",
  "photography",
  "life",
  "vibes",
  "explore",
  "art",
  "mood",
];

export default function PostModal({ post, onSave, onClose }) {
  const isEdit = !!post;
  const [step, setStep] = useState(isEdit ? 1 : 1);
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedImage, setSelectedImage] = useState(post?.image || null);
  const [imageUrl, setImageUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [username, setUsername] = useState(post?.username || "");
  const [location, setLocation] = useState(post?.location || "");
  const [content, setContent] = useState(post?.content || "");
  const [selectedTags, setSelectedTags] = useState(post?.tags || []);
  const fileInputRef = useRef();

  const readImageFile = (file) => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => setSelectedImage(event.target.result);
    reader.readAsDataURL(file);
  };

  const applyImageUrl = () => {
    if (!imageUrl.trim()) return setUrlError("Enter a URL");
    try {
      new URL(imageUrl);
      setSelectedImage(imageUrl.trim());
      setUrlError("");
    } catch {
      setUrlError("Invalid URL");
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSelectedImage(null);
    setImageUrl("");
    setUrlError("");
  };

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleSave = () => {
    if (!content.trim() || !username.trim()) return;
    onSave({
      ...(post || {}),
      username,
      location,
      content,
      image: selectedImage,
      tags: selectedTags,
    });
  };

  return (
    <div
      className="backdrop"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="modal"> 
        
         {/* head */}
        <div className="modal-head">
          {step === 2 && !isEdit && (
            <button className="modal-icon-btn" onClick={() => setStep(1)}>
              ‹
            </button>
          )}
          <h2>
            {isEdit ? "Edit Post" : step === 1 ? "Choose Photo" : "New Post"}
          </h2>
          <button className="modal-icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* step 1 selecting photo */}

        {step === 1 && (
          <div className="modal-body">
            <div className="modal-tabs">
              {["upload", "url", "sample"].map((tab) => (
                <button
                  key={tab}
                  className={`modal-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => switchTab(tab)}
                >
                  {tab === "upload"
                    ? "📁 From PC"
                    : tab === "url"
                      ? "🔗 URL"
                      : "🖼️ Samples"}
                </button>
              ))}
            </div>

            {activeTab === "upload" && (
              <div
                className={`modal-drop ${isDragging ? "drag" : ""} ${selectedImage ? "filled" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                  readImageFile(event.dataTransfer.files[0]);
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => readImageFile(event.target.files[0])}
                />
                {selectedImage ? (
                  <>
                    <img src={selectedImage} alt="preview" />
                    <span className="modal-drop-hint">Click to change</span>
                  </>
                ) : (
                  <>
                    <p className="modal-drop-title">
                      {isDragging ? "Drop it!" : "Click or drag & drop"}
                    </p>
                    <p className="modal-drop-sub">PNG · JPG · WEBP</p>
                  </>
                )}
              </div>
            )}

            {activeTab === "url" && (
              <div className="modal-url">
                <div className="modal-url-row">
                  <input
                    placeholder="https://example.com/photo.jpg"
                    value={imageUrl}
                    onChange={(event) => {
                      setImageUrl(event.target.value);
                      setUrlError("");
                    }}
                    onKeyDown={(event) =>
                      event.key === "Enter" && applyImageUrl()
                    }
                  />
                  <button onClick={applyImageUrl}>Apply</button>
                </div>
                {urlError && <p className="modal-err">{urlError}</p>}
                {selectedImage ? (
                  <div className="modal-url-preview">
                    <img
                      src={selectedImage}
                      alt="url preview"
                      onError={() => {
                        setUrlError("Cannot load image");
                        setSelectedImage(null);
                      }}
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setImageUrl("");
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <p className="modal-url-hint">
                    Paste a direct image link above
                  </p>
                )}
              </div>
            )}

            {activeTab === "sample" && (
              <div className="modal-grid">
                {SAMPLE_IMAGES.map((imageSource) => (
                  <button
                    key={imageSource}
                    className={`modal-sample ${selectedImage === imageSource ? "active" : ""}`}
                    onClick={() => setSelectedImage(imageSource)}
                  >
                    <img src={imageSource} alt="sample" />
                    {selectedImage === imageSource && (
                      <span className="modal-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <button
              className="modal-next"
              onClick={() => setStep(2)}
              disabled={!selectedImage}
            >
              Next →
            </button>
          </div>
        )}


         {/* step 2 add user name and caption */}
        {step === 2 && (
          <>
            <div className="modal-body">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="selected"
                  className="modal-preview"
                />
              )}
              <div className="modal-field">
                <label>Username</label>
                <input
                  placeholder="your_username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Location</label>
                <input
                  placeholder="Add location..."
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Caption</label>
                <textarea
                  placeholder="Write a caption..."
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  rows={3}
                  maxLength={300}
                />
                <span className="modal-count">{content.length}/300</span>
              </div>
              <div className="modal-field">
                <label>Tags</label>
                <div className="modal-tags">
                  {ALL_TAGS.map((tag) => (
                    <button
                      key={tag}
                      className={`modal-tag ${selectedTags.includes(tag) ? "active" : ""}`}
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="modal-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                className="modal-submit"
                onClick={handleSave}
                disabled={!content.trim() || !username.trim()}
              >
                {isEdit ? "Save" : "Share"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
