import { useState, useEffect, useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
   AlertCircle,
   Search,
   MapPin,
   Calendar,
   User,
   Package,
   Eye,
   Filter,
   X,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

dayjs.extend(relativeTime);

const Blogs = () => {
   const { theme } = useContext(ThemeContext);
   const darkMode = theme === "dark";

   const textPrimary = darkMode ? "text-gray-200" : "text-gray-900";
   const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
   const bgCard = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-slate-200";
   const bgPage = darkMode
      ? "bg-gray-900"
      : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100";

   const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedBlog, setSelectedBlog] = useState(null);
   const [filter, setFilter] = useState("all");
   const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
      fetchBlogs();
   }, []);

   const fetchBlogs = async () => {
      try {
         setLoading(true);
         const response = await axios.get(
            `${import.meta.env.VITE_serverUrl}/Blogs`,
            { withCredentials: true }
         );
         setBlogs(response.data);
         setError(null);
      } catch (err) {
         setError(err.response?.data?.message || "Failed to fetch blogs");
      } finally {
         setLoading(false);
      }
   };

   const filteredBlogs = blogs.filter((blog) => {
      const matchesFilter = filter === "all" || blog.postType === filter;
      const matchesSearch =
         searchQuery === "" ||
         blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         blog.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         blog.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
   });

   const postTypes = [...new Set(blogs.map((b) => b.postType))];

   return (
      <div className={`min-h-screen ${bgPage} py-8`}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                     <Package className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                     Lost & Found Items
                  </h1>
               </div>
               <p className={`ml-16 ${textSecondary}`}>
                  Browse all reported lost and found items from the community
               </p>
            </div>

            <div className="mb-6 space-y-4">
               <div className="relative">
                  <Search
                     className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`}
                  />
                  <input
                     type="text"
                     placeholder="Search by title, category, or location..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                        darkMode
                           ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500"
                           : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                     } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {searchQuery && (
                     <button
                        onClick={() => setSearchQuery("")}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${
                           darkMode ? "hover:bg-gray-700" : "hover:bg-slate-100"
                        }`}
                     >
                        <X className="w-4 h-4" />
                     </button>
                  )}
               </div>

               <div className="flex flex-wrap gap-3">
                  <button
                     onClick={() => setFilter("all")}
                     className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        filter === "all"
                           ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                           : `${
                                darkMode
                                   ? "bg-gray-800 border-gray-700 text-gray-200"
                                   : "bg-white text-slate-700 border-slate-200"
                             } border hover:bg-opacity-80`
                     }`}
                  >
                     All Items ({blogs.length})
                  </button>
                  {postTypes.map((type) => (
                     <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-6 py-2.5 rounded-xl font-medium capitalize transition-all duration-200 ${
                           filter === type
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                              : `${
                                   darkMode
                                      ? "bg-gray-800 border-gray-700 text-gray-200"
                                      : "bg-white text-slate-700 border-slate-200"
                                } border hover:bg-opacity-80`
                        }`}
                     >
                        {type} (
                        {blogs.filter((b) => b.postType === type).length})
                     </button>
                  ))}
               </div>
            </div>

            {error && (
               <div
                  className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                     darkMode
                        ? "bg-red-900 border-red-700"
                        : "bg-red-50 border border-red-200"
                  }`}
               >
                  <AlertCircle
                     className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        darkMode ? "text-red-400" : "text-red-500"
                     }`}
                  />
                  <div>
                     <h3
                        className={`font-semibold ${
                           darkMode ? "text-red-200" : "text-red-800"
                        }`}
                     >
                        Error Loading Blogs
                     </h3>
                     <p
                        className={`text-sm ${
                           darkMode ? "text-red-300" : "text-red-600"
                        } mt-1`}
                     >
                        {error}
                     </p>
                  </div>
               </div>
            )}

            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                     <div
                        key={i}
                        className={`rounded-2xl shadow-sm p-6 ${bgCard}`}
                     >
                        <Skeleton height={200} className="mb-4 rounded-xl" />
                        <Skeleton height={24} width="70%" className="mb-2" />
                        <Skeleton count={2} className="mb-2" />
                        <Skeleton height={40} className="mt-4" />
                     </div>
                  ))}
               </div>
            ) : filteredBlogs.length === 0 ? (
               <div
                  className={`rounded-2xl shadow-sm p-12 text-center ${bgCard}`}
               >
                  <div
                     className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                        darkMode ? "bg-gray-700" : "bg-slate-100"
                     }`}
                  >
                     <Package
                        className={`w-8 h-8 ${
                           darkMode ? "text-gray-400" : "text-slate-400"
                        }`}
                     />
                  </div>
                  <h3 className={`${textPrimary} text-xl font-semibold mb-2`}>
                     No Items Found
                  </h3>
                  <p className={textSecondary}>
                     {searchQuery
                        ? `No items match your search "${searchQuery}"`
                        : filter === "all"
                        ? "There are no items to display at this time."
                        : `No ${filter} items found.`}
                  </p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.map((blog) => (
                     <div
                        key={blog._id}
                        className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer ${bgCard}`}
                        onClick={() => setSelectedBlog(blog)}
                     >
                        {blog.imageUrl && (
                           <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                              <img
                                 src={blog.imageUrl}
                                 alt={blog.title}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                 onError={(e) => {
                                    e.target.style.display = "none";
                                 }}
                              />
                              <div className="absolute top-3 left-3">
                                 <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize backdrop-blur-sm ${
                                       blog.postType === "lost"
                                          ? "bg-red-500/90 text-white"
                                          : "bg-green-500/90 text-white"
                                    }`}
                                 >
                                    {blog.postType}
                                 </span>
                              </div>
                           </div>
                        )}

                        <div className="p-5">
                           <div className="mb-3">
                              {!blog.imageUrl && (
                                 <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize mb-2 ${
                                       blog.postType === "lost"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-green-100 text-green-700"
                                    }`}
                                 >
                                    {blog.postType}
                                 </span>
                              )}
                              <h3
                                 className={`text-lg font-bold ${textPrimary} group-hover:text-blue-600 transition-colors line-clamp-2`}
                              >
                                 {blog.title}
                              </h3>
                           </div>

                           {blog.category && (
                              <div
                                 className={`inline-block px-3 py-1 rounded-lg text-xs font-medium mb-3 ${
                                    darkMode
                                       ? "bg-gray-700 text-gray-300"
                                       : "bg-slate-100 text-slate-700"
                                 }`}
                              >
                                 {blog.category}
                              </div>
                           )}

                           {blog.description && (
                              <p
                                 className={`text-sm ${textSecondary} line-clamp-2 mb-4`}
                              >
                                 {blog.description}
                              </p>
                           )}

                           <div className="space-y-2">
                              {blog.location && (
                                 <div className="flex items-center gap-2 text-sm">
                                    <MapPin
                                       className={`w-4 h-4 flex-shrink-0 ${textSecondary}`}
                                    />
                                    <span className={`${textPrimary}`}>
                                       {blog.location}
                                    </span>
                                 </div>
                              )}
                              {blog.date && (
                                 <div className="flex items-center gap-2 text-sm">
                                    <Calendar
                                       className={`w-4 h-4 flex-shrink-0 ${textSecondary}`}
                                    />
                                    <span className={`${textSecondary}`}>
                                       {dayjs(blog.date).format("MMM D, YYYY")}
                                    </span>
                                 </div>
                              )}
                              {blog.authorName && (
                                 <div className="flex items-center gap-2 text-sm">
                                    <User
                                       className={`w-4 h-4 flex-shrink-0 ${textSecondary}`}
                                    />
                                    <span
                                       className={`${textPrimary} font-medium`}
                                    >
                                       {blog.authorName}
                                    </span>
                                 </div>
                              )}
                           </div>

                           <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {selectedBlog && (
               <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                  onClick={() => setSelectedBlog(null)}
               >
                  <div
                     className={`rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto ${
                        darkMode ? "bg-gray-800 text-gray-200" : "bg-white"
                     }`}
                     onClick={(e) => e.stopPropagation()}
                  >
                     {selectedBlog.imageUrl && (
                        <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                           <img
                              src={selectedBlog.imageUrl}
                              alt={selectedBlog.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                 e.target.style.display = "none";
                              }}
                           />
                           <div className="absolute top-4 left-4">
                              <span
                                 className={`px-4 py-2 rounded-full text-sm font-semibold capitalize backdrop-blur-sm ${
                                    selectedBlog.postType === "lost"
                                       ? "bg-red-500/90 text-white"
                                       : "bg-green-500/90 text-white"
                                 }`}
                              >
                                 {selectedBlog.postType}
                              </span>
                           </div>
                           <button
                              onClick={() => setSelectedBlog(null)}
                              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                           >
                              <X className="w-6 h-6 text-slate-800" />
                           </button>
                        </div>
                     )}

                     <div className="p-6 md:p-8">
                        {!selectedBlog.imageUrl && (
                           <div className="flex items-start justify-between mb-6">
                              <span
                                 className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                                    selectedBlog.postType === "lost"
                                       ? "bg-red-100 text-red-700"
                                       : "bg-green-100 text-green-700"
                                 }`}
                              >
                                 {selectedBlog.postType}
                              </span>
                              <button
                                 onClick={() => setSelectedBlog(null)}
                                 className={`p-2 rounded-lg transition-colors ${
                                    darkMode
                                       ? "hover:bg-gray-700"
                                       : "hover:bg-slate-100"
                                 }`}
                              >
                                 <X className="w-6 h-6" />
                              </button>
                           </div>
                        )}

                        <h2
                           className={`text-3xl font-bold ${textPrimary} mb-4`}
                        >
                           {selectedBlog.title}
                        </h2>

                        {selectedBlog.category && (
                           <div
                              className={`inline-block px-4 py-2 rounded-lg text-sm font-medium mb-4 ${
                                 darkMode
                                    ? "bg-gray-700 text-gray-300"
                                    : "bg-slate-100 text-slate-700"
                              }`}
                           >
                              {selectedBlog.category}
                           </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                           {selectedBlog.location && (
                              <div
                                 className={`rounded-xl p-4 ${
                                    darkMode ? "bg-gray-700" : "bg-slate-50"
                                 }`}
                              >
                                 <div className="flex items-center gap-2 mb-2">
                                    <MapPin
                                       className={`w-4 h-4 ${textSecondary}`}
                                    />
                                    <span
                                       className={`text-xs font-semibold uppercase tracking-wide ${textSecondary}`}
                                    >
                                       Location
                                    </span>
                                 </div>
                                 <p className={`${textPrimary} font-medium`}>
                                    {selectedBlog.location}
                                 </p>
                              </div>
                           )}

                           {selectedBlog.date && (
                              <div
                                 className={`rounded-xl p-4 ${
                                    darkMode ? "bg-gray-700" : "bg-slate-50"
                                 }`}
                              >
                                 <div className="flex items-center gap-2 mb-2">
                                    <Calendar
                                       className={`w-4 h-4 ${textSecondary}`}
                                    />
                                    <span
                                       className={`text-xs font-semibold uppercase tracking-wide ${textSecondary}`}
                                    >
                                       Date
                                    </span>
                                 </div>
                                 <p className={`${textPrimary} font-medium`}>
                                    {dayjs(selectedBlog.date).format(
                                       "MMMM D, YYYY"
                                    )}
                                 </p>
                              </div>
                           )}

                           {selectedBlog.authorName && (
                              <div
                                 className={`rounded-xl p-4 ${
                                    darkMode ? "bg-gray-700" : "bg-slate-50"
                                 }`}
                              >
                                 <div className="flex items-center gap-2 mb-2">
                                    <User
                                       className={`w-4 h-4 ${textSecondary}`}
                                    />
                                    <span
                                       className={`text-xs font-semibold uppercase tracking-wide ${textSecondary}`}
                                    >
                                       Posted By
                                    </span>
                                 </div>
                                 <p className={`${textPrimary} font-medium`}>
                                    {selectedBlog.authorName}
                                 </p>
                              </div>
                           )}

                           {selectedBlog.authorEmail && (
                              <div
                                 className={`rounded-xl p-4 ${
                                    darkMode ? "bg-gray-700" : "bg-slate-50"
                                 }`}
                              >
                                 <div className="flex items-center gap-2 mb-2">
                                    <User
                                       className={`w-4 h-4 ${textSecondary}`}
                                    />
                                    <span
                                       className={`text-xs font-semibold uppercase tracking-wide ${textSecondary}`}
                                    >
                                       Contact
                                    </span>
                                 </div>
                                 <p
                                    className={`${textPrimary} font-medium break-all`}
                                 >
                                    {selectedBlog.authorEmail}
                                 </p>
                              </div>
                           )}
                        </div>

                        {selectedBlog.description && (
                           <div
                              className={`rounded-xl p-4 mb-6 ${
                                 darkMode ? "bg-gray-700" : "bg-slate-50"
                              }`}
                           >
                              <h3
                                 className={`text-sm font-semibold uppercase tracking-wide ${textSecondary} mb-2`}
                              >
                                 Description
                              </h3>
                              <p className={`${textPrimary} leading-relaxed`}>
                                 {selectedBlog.description}
                              </p>
                           </div>
                        )}
                     </div>

                     <div
                        className={`p-6 border-t ${
                           darkMode
                              ? "bg-gray-900 border-gray-700"
                              : "bg-slate-50 border-slate-200"
                        } rounded-b-2xl`}
                     >
                        <button
                           onClick={() => setSelectedBlog(null)}
                           className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
                        >
                           Close
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Blogs;
