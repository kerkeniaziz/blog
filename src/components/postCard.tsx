import { Post } from "@/types";
import Link from "next/link";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
            <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                    <img
                        src="https://cdn.tailgrids.com/1.0/assets/images/blogs/blog-01/image-01.jpg"
                        alt={post.title}
                        className="w-full"
                    />
                </div>
                <div>
          <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>

            <Link href={`/posts/${post.title}`}>
            {post.title}
            </Link>


                    <p className="text-base text-body-color mb-2">
                        {post.metaDescription || post.description.slice(0, 100)}...
                    </p>
                    <p className="text-sm text-gray-500">By: {post.author}</p>
                </div>
            </div>
        </div>
    );
}
