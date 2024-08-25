import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';
const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://blog-app-backend-three-omega.vercel.app/api/posts', { title, content })
      .then(() => navigate('/'))
      .catch(error => console.error('There was an error creating the post!', error));
  };

  return (
    <div className="px-40">
      <form onSubmit={handleSubmit} className="createpost">
        <h1 className="text-center">Create New Post</h1>
        <label>Title:</label>
        <input
          className="titlepost"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <br />
        <label>Content:</label>
        <ReactQuill
          className="contentpost"
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          placeholder="write your content ...."
          onChange={setContent}
          style={{ height: "50vh", width: "50vw" }}
        />        
        <br />
        <button type="submit" class="subbutton text-teal-600">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;

