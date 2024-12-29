import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPost = () => {
  const { id: postId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNewImage,setIsNewImage] = useState(false)

  // Fetch existing post data
  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo || null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load post data!");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // Validate inputs before submitting
  const handleEdit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!title.trim()) {
      toast.error("Title is required and cannot be empty.");
      return;
    }
    if (title.trim().length < 4) {
      toast.error("Title must be at least 4 characters long.");
      return;
    }
    if (!desc.trim()) {
      toast.error("Description is required and cannot be empty.");
      return;
    }
    if (desc.trim().length < 10) {
      toast.error("Description must be at least 10 characters long.");
      return;
    }
    if (!file) {
      toast.error("An image file is required.");
      return;
    }

    setLoading(true);

    // Prepare data
    const post = {
      title: title.trim(),
      desc: desc.trim(),
      username: user.username,
      userId: user._id,
      post:file
    };

    
    // Image upload
    if(isNewImage){
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("img", filename);
      formData.append("file", file);
      post.photo = filename;
      try {
        await axios.post(URL + "/api/upload", formData);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("Image upload failed!");
        return;
      }

    }

    // Update post
    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      toast.success("Post updated successfully!");
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Failed to update post!");
    }finally{
      setLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Optional: Check file type (accept only images)
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Only image files are allowed!");
        return;
      }
      setFile(selectedFile);
      setIsNewImage(true)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
      <br />
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Edit Post
        </h1>
        <form onSubmit={handleEdit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Choose an Image</label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="block w-full py-4 px-4 border-2 border-dashed border-indigo-500 rounded-lg text-center text-indigo-600 cursor-pointer hover:bg-indigo-50 transition mt-2"
            >
              {file ? (file.name || "Current Image") : "Select Image"}
            </label>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              rows="5"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Post Description"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-indigo-500 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditPost;
