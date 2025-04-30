// app/blog/page.tsx
import React from "react";

type BlogPost = {
  id: number;
  authorId: any;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default async function Blog() {
  
  const res = await fetch("http://localhost:8000/post", {
    // Optional: revalidate every 60 seconds
    next: { revalidate: 60 },
  }); 

  const responce = await res.json()
  const posts: BlogPost[] =  responce.posts;
  console.log(posts)

  return (
    <div className="p-4 sm:ml-64">
  <h1>Latest Blog Posts (SSR or ISR)</h1>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Author</th>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created At</th>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Updated At</th>
      </tr>
    </thead>
    <tbody>
      {posts.map((post) => (
        <tr key={post._id}>
          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{post.title}</td>
          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{post.authorId.name}</td>
          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{post.status}</td>
          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{new Date(post.createdAt).toLocaleString()}</td>
          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{new Date(post.updatedAt).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
