// src/services/instagramApi.js
const API_BASE_URL = "http://localhost:3000/api/instagram";

// Barcha rasmlarni olish
export const fetchInstagramPhotos = async (maxPhotos = 1000) => {
  const response = await fetch(`${API_BASE_URL}/photos?max=${maxPhotos}`);

  if (!response.ok) {
    throw new Error("Rasmlarni yuklashda xatolik");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "API xatosi");
  }

  return data;
};

// Barcha postlarni olish
export const fetchInstagramPosts = async (maxPosts = 1000, type = null) => {
  let url = `${API_BASE_URL}/posts?max=${maxPosts}`;

  if (type) {
    url += `&type=${type}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Postlarni yuklashda xatolik");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "API xatosi");
  }

  return data;
};

// Bitta postni olish
export const fetchInstagramPost = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/post/${postId}`);

  if (!response.ok) {
    throw new Error("Postni yuklashda xatolik");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "API xatosi");
  }

  return data;
};

// Cheklangan miqdordagi postlar
export const fetchLimitedPosts = async (limit = 25) => {
  const response = await fetch(`${API_BASE_URL}/posts/limited?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Postlarni yuklashda xatolik");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "API xatosi");
  }

  return data;
};
