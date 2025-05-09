"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/store/slices/postSlice";
import { RootState } from "@/store";
import PostCard from "@/components/postCard"; // Adjust the path if needed

export default function Blog() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts); // Access Redux posts
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/post", {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    const response = await res.json();
    dispatch(setPosts(response.result));
    setLoading(false);
  };

  const handleAddPost = async () => {
    const newPost = {
      title: "New Post12445",
      metaTitle: "Meta Title1",
      metaDescription: "Meta Description1",
      description: "This is a new post1.",
    };
    setLoading(true);
    try {
      const res = await api.post("/post", newPost);
      dispatch(setPosts([...posts, res.data.result])); // Add to Redux
    } catch (error) {

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/post/${id}`);
      dispatch(setPosts(posts.filter((post) => post.id !== id))); // Remove from Redux
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="p-4 sm:ml-64">
        <h1>Blog Posts</h1>

        <div className="mb-4">
          <button
              onClick={handleAddPost}
              className="bg-blue-500 text-white p-2 rounded"
          >
            Add New Post
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Author</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Created At</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Updated At</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
          </tr>
          </thead>
          <tbody>
          {posts.map((post) => (
              <tr key={post.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {post.title}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {post.author}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {post.status}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(post.createdAt).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(post.updatedAt).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <div>
          {posts.map((post) => (
              <PostCard post={post} key={post.id} />

              ))}
        </div>
      </div>
  );
}
