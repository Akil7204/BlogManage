/* eslint-disable react/prop-types */
import { IF } from '../url';

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF + post.photo}
          alt=""
          className="h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="flex flex-col w-[65%] p-4">
        <h1 className="text-xl font-semibold mb-2 text-gray-800 md:text-2xl truncate">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {post.desc.slice(0, 200)}{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            ...Read more
          </span>
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
