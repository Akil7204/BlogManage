import { useNavigate, useParams } from "react-router-dom";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <br />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-20 py-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
              {user?._id === post?.userId && (
                <div className="flex space-x-4">
                  <BiEdit
                    className="cursor-pointer text-2xl text-blue-600 hover:text-blue-700"
                    onClick={() => navigate(`/edit/${postId}`)}
                  />
                  <MdDelete
                    className="cursor-pointer text-2xl text-red-600 hover:text-red-700"
                    onClick={() => setShowModal(true)}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-gray-500 mb-8">
              <p className="text-lg">@{post.username}</p>
              <div className="text-sm">
                <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
                <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
              </div>
            </div>

            {post.photo && (
              <div className="w-full overflow-hidden rounded-lg shadow-lg mb-8">
                <img
                  src={`${IF}${post.photo}`}
                  className="w-full h-96 object-cover"
                  alt={post.title}
                />
              </div>
            )}

            <div className="text-gray-800 leading-relaxed text-lg space-y-4">
              <p>{post.desc}</p>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  handleDeletePost();
                  setShowModal(false);
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
