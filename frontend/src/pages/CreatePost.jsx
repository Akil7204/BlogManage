import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // react-hook-form setup
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    const [file, setFile] = useState(null);

    // Handle file input manually to integrate with react-hook-form
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Validate file type explicitly
        if (selectedFile && !selectedFile.type.startsWith("image/")) {
            toast.error("Only image files are allowed (e.g., .png, .jpg, .jpeg)");
            return;
        }

        if (selectedFile) {
            setFile(selectedFile);
            setValue("file", selectedFile); // Register file value in react-hook-form
        }
    };

    const onSubmit = async (data) => {
        if (!file) {
            toast.error("Image is required!");
            return;
        }

        // Trim input data to avoid unnecessary spaces
        const trimmedTitle = data.title.trim();
        const trimmedDesc = data.desc.trim();

        if (!trimmedTitle || !trimmedDesc) {
            toast.error("Title and Description cannot be empty!");
            return;
        }

        const post = {
            title: trimmedTitle,
            desc: trimmedDesc,
            username: user.username,
            userId: user._id,
        };

        const formData = new FormData();
        const filename = Date.now() + file.name;
        formData.append("img", filename);
        formData.append("file", file);
        post.photo = filename;

        try {
            await axios.post(URL + "/api/upload", formData);
            const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
            toast.success("Post created successfully!");
            navigate("/posts/post/" + res.data._id);
        } catch (err) {
            console.error(err);
            toast.error("Failed to create post!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">Create a Post</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <input
                        {...register("title", {
                            required: "Title is required",
                            minLength: { value: 4, message: "Title must be at least 4 characters long" },
                            validate: (value) => value.trim() !== "" || "Title cannot be empty spaces",
                        })}
                        type="text"
                        placeholder="Post Title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-1">Choose an Image</label>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className="block w-full text-center py-2 px-4 border border-dashed border-indigo-500 rounded-lg cursor-pointer text-indigo-600 hover:bg-indigo-50 transition"
                        >
                            {file ? file.name : "Select Image"}
                        </label>
                    </div>
                    {errors.file && <p className="text-red-500 text-sm">Image is required!</p>}

                    <textarea
                        {...register("desc", {
                            required: "Description is required",
                            minLength: { value: 10, message: "Description must be at least 10 characters long" },
                            validate: (value) => value.trim() !== "" || "Description cannot be empty spaces",
                        })}
                        rows={5}
                        placeholder="Post Description"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                    {errors.desc && <p className="text-red-500 text-sm">{errors.desc.message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-indigo-500 transition"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Post"}
                    </button>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
};

export default CreatePost;
