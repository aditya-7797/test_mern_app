import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import Header2 from "../components/Header2";
import API_BASE_URL from "../config/api";

function BlogPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const user_email = Cookies.get("user_email"); // Define it once outside the function

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure user_email is available
    if (!user_email) {
      alert("User not logged in or cookie not found");
      return;
    }
  
    // Prepare JSON data
    const postData = {
      user_email: user_email.trim(),
      title,
      author,
      date,
      summary,
      content
    };
  
    try {
      const response = await Axios.post(
        `${API_BASE_URL}/add_post`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        alert(response.data.message || "Blog posted successfully");
        navigate("/blogs");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      // Log additional information for debugging
      console.error("Response status:", error.response ? error.response.status : "No response status");
      console.error("Response data:", error.response ? error.response.data : "No response data");
      alert(error.response?.data?.message || "Error posting blog");
    }
  };
  
  





  return (
    <div className="cu">
      <Header2 />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center mb-4">Create a New Blog Post</h2>
            <form
              onSubmit={handleSubmit}
              style={{ background: "none", padding: "20px" }}
            >
              {/* Blog Title */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Author */}
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              {/* Date */}
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* Blog Summary */}
              <div className="mb-3">
                <label htmlFor="summary" className="form-label">
                  Blog Summary
                </label>
                <textarea
                  className="form-control"
                  id="summary"
                  rows="2"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Blog Content */}
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Blog Content
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  rows="5"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>



              {/* Submit Button */}
              <button type="submit" className="btn btn-success">
                Post Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
