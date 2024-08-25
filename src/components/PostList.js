import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://blog-app-backend-mts4.vercel.app/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('There was an error fetching the posts!', error));
  }, []);
  
  //Function to Parse the markdown content to a readable format
  const truncateString = (htmlString) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText;
  };
  
  //Function to read the creation time in a readable format
  const timeFunction = (datetim) => {
    const isoString = datetim;
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Example format: "2024-08-25 05:47:29"
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
  
  return (
    <div className="px-32">
      <h1 className="text-center text-teal-600">Blog Posts</h1>
      <br />
      <ul className="listcolumn">
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <article class="overflow-hidden rounded-lg transition w-1/2 keycard">
                <div class="p-4 sm:p-6">
                  <time datetime="2022-10-10" class="block text-xs text-gray-500">{timeFunction(post.createdAt)}</time>

                  <a href="#">
                      <h3 class="mt-0.5 text-lg text-gray-900">{post.title}</h3>
                  </a>

                  <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {truncateString(post.content)}
                  </p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default PostList;

