import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setNoResults(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div className="bg-gray-50 min-h-screen mt-6">
      <br />
      <div className="px-8 md:px-[200px] py-10">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : noResults ? (
          <h3 className="text-center font-bold mt-16 text-gray-600">
            No posts available
          </h3>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link to={user ? `/posts/post/${post._id}` : "/login"} key={post._id}>
                <HomePosts post={post} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
