import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { Markup } from 'interweave';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecentPosts();
  }, []);


  const renderContent = (content) => {
    const blocks = content.split(/(<code[\s\S]*?<\/code>)/);
    
    return blocks.map((block, index) => {
      if (block.startsWith('<code')) {
        // Render code block with syntax highlighting
        const start = block.indexOf('>') + 1;
        const end = block.lastIndexOf('</code>');
        const code = block.substring(start, end);
  
        return (
          <SyntaxHighlighter key={index} language='python' style={materialOceanic}>
            {code}
          </SyntaxHighlighter>
        );
      } else {
        // Render non-code part
        return <Markup key={index} content={block} />;
      }
    });
  };

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl max-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover rounded-lg shadow-md'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} min read</span>
      </div>
      <div className='p-3 max-w-screen-2xl w-full post-content text-xl'>
      {/* Render content with Markup to support HTML tags */}
      {post && post.content && renderContent(post.content)}
    </div>
    </main>
  );
}
