import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import BlogNavbar from '@/components/BlogNavbar';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogNavbar />
      <main className="min-h-screen bg-light dark:bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold text-dark dark:text-light mb-8">
            Blog
          </h1>
          <p className="text-lg text-dark-500 dark:text-light-300 mb-12 max-w-2xl">
            Thoughts on software engineering, projects, and technology.
          </p>

          {posts.length === 0 ? (
            <p className="text-dark-500 dark:text-light-300">
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-light dark:bg-dark border border-dark-300 dark:border-light-300 p-6 hover:border-dark dark:hover:border-light transition-colors duration-200"
                >
                  <article>
                    <time className="text-sm text-dark-500 dark:text-light-300 mb-2 block">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className="text-xl font-semibold text-dark dark:text-light mb-3 group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="text-dark-500 dark:text-light-300 text-sm mb-4">
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-dark-100 dark:bg-light-100 text-dark dark:text-light"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
