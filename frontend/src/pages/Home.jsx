import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [postsPerPage] = useState(3); 
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setNoResults(true);
    }
  };

  const paginatePosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setDisplayedPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  useEffect(() => {
    paginatePosts(); 
  }, [posts, currentPage]);

  return (
    <>
      <div className="bg-gray-50 min-h-[80vh] py-10">
        <div className="text-center my-12 px-4">
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-4">
            Explore Our Latest Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the latest trends, insights, and tips from our vibrant community of writers and thinkers.
          </p>
        </div>
        <div className="px-8 md:px-[200px]">
          {loader ? (
            <div className="h-[40vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : noResults ? (
            <h3 className="text-center font-bold mt-16 text-gray-600">
              No posts available
            </h3>
          ) : (
            <>
              <div className="grid gap-8">
                {displayedPosts.map((post) => (
                  <Link
                    to={user ? `/posts/post/${post._id}` : "/login"}
                    key={post._id}
                    className="block transition-transform transform hover:scale-105"
                  >
                    <HomePosts post={post} />
                  </Link>
                ))}
              </div>

              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Prev
                </button>
                <span className="px-4 py-2 text-lg font-semibold text-gray-800">
                  Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(posts.length / postsPerPage)))}
                  disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
