import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    axios.get(`https://blogapp-backend-z57x.onrender.com/api/posts/${id}`)
      .then((response) => { 
        setPost(response.data);
        setUpdatedTitle(post.title);
        setUpdatedContent(post.content);
      })
      .catch(error => console.error('There was an error fetching the post!', error));
  }, [id]);
  
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleUpdate = () => {
    setIsEditing(false);
    axios.put(`https://blogapp-backend-z57x.onrender.com/api/posts/${id}`, {
      title: updatedTitle,
      content: updatedContent
    })
      .then(response => {
        setPost(response.data);
        setIsEditing(prevEditing => {
          console.log('Previous isEditing:', prevEditing);
          return false; // Set to false, updating state based on previous value
        });
      })
      .catch(error => console.error('There was an error updating the post!', error));
  };

  const handleDelete = () => {
    axios.delete(`https://blogapp-backend-z57x.onrender.com/api/posts/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('There was an error deleting the post!', error));
  };
  
  const truncateString = (htmlString) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        return plainText;
  };
  /*const updateFunction = (post) => {
    
    setUpdatedTitle(post.title);
    setUpdatedContent(truncateString(post.content));
  }*/
  if (!post) return <p>Loading...</p>;

  return (
    <div className="px-40">
        {isEditing ? (
        <div className="createpost">
          <h2 className="text-center">Edit Post</h2>
          <input
            className="titlepost"
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <br />
          <label>Content:</label>
          <ReactQuill
            className="contentpost"
            theme="snow"
            modules={modules}
            formats={formats}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e)}
            style={{ height: "50vh", width: "50vw" }}
          />        
          <br />
          <br />
          <br />
          <section className="flex justify-between">
            <button className="inline-block rounded border px-12 py-3 text-sm font-medium text-green-600 hover:text-green-900 focus:outline-none focus:ring active:bg-green-500 showbutton" onClick={handleUpdate}>Save Changes</button>
            <button className="inline-block rounded border border-grey-600 px-12 py-3 text-sm font-medium text-grey-600 hover:bg-grey-600 hover:text-grey-900 focus:outline-none focus:ring active:bg-grey-500 showbutton" onClick={() => setIsEditing(false)}>Cancel</button>
          </section>
        </div>
      ) : (
        <div className="showPost">
          <h2 className="text-center"><b>{post.title}</b></h2>
          <br />
          <p>{truncateString(post.content)}</p>
          <br />
          <section className="flex justify-between">
            <button className="inline-block rounded border px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-900 hover:text-indigo-900 focus:outline-none focus:ring active:bg-indigo-500 showbutton" onClick={() => setIsEditing(true)}>Update</button>
            <button className="inline-block rounded border px-12 py-3 text-sm font-medium text-red-600 hover:bg-red-900 hover:text-red-900 focus:outline-none focus:ring active:bg-orange-500 showbutton" onClick={handleDelete}>Delete</button>
            <button className="inline-block rounded border px-12 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:ring active:bg-orange-500 showbutton" onClick={() => navigate('/')}>Back</button> 
          </section>
        </div>
      )}      
    </div>
  );
};

export default PostDetail;

