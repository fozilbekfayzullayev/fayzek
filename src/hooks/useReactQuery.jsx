// src/hooks/useInstagram.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchInstagramPhotos,
  fetchInstagramPosts,
  fetchInstagramPost,
  fetchLimitedPosts,
} from "../services/InstagramApi";

// 1. Rasmlarni olish
export const useInstagramPhotos = (maxPhotos = 1000, options = {}) => {
  return useQuery({
    queryKey: ["instagram", "photos", maxPhotos],
    queryFn: () => fetchInstagramPhotos(maxPhotos),
    ...options,
  });
};

// 2. Barcha postlarni olish
export const useInstagramPosts = (
  maxPosts = 1000,
  type = null,
  options = {}
) => {
  return useQuery({
    queryKey: ["instagram", "posts", maxPosts, type],
    queryFn: () => fetchInstagramPosts(maxPosts, type),
    ...options,
  });
};

// 3. Bitta postni olish
export const useInstagramPost = (postId, options = {}) => {
  return useQuery({
    queryKey: ["instagram", "post", postId],
    queryFn: () => fetchInstagramPost(postId),
    enabled: !!postId, // postId bo'lsa faqat query ishga tushadi
    ...options,
  });
};

// 4. Cheklangan postlar
export const useLimitedPosts = (limit = 25, options = {}) => {
  return useQuery({
    queryKey: ["instagram", "limited", limit],
    queryFn: () => fetchLimitedPosts(limit),
    ...options,
  });
};

// 5. Manual refetch uchun hook (masalan, "Yangilash" tugmasi)
export const useRefetchPhotos = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["instagram", "photos"] });
  };
};
