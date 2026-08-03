import PostForm from "../PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">New Post</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        Write a blog post. Only published posts appear on the public site.
      </p>

      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
