import { useState, useEffect, useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
   AlertCircle,
   FileText,
   Flag,
   Mail,
   User,
   Calendar,
   MessageSquare,
   Package,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";
import LoadingSpinner from "../Components/LoadingSpinner";

dayjs.extend(relativeTime);

const Reports = () => {
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

   const [reports, setReports] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedReport, setSelectedReport] = useState(null);
   const [filter, setFilter] = useState("all");

   useEffect(() => {
      fetchReports();
   }, []);

   const fetchReports = async () => {
      try {
         setLoading(true);
         const response = await axios.get(
            `${import.meta.env.VITE_serverUrl}/reports`,
            { withCredentials: true }
         );
         setReports(response.data);
         setError(null);
      } catch (err) {
         setError(err.response?.data?.message || "Failed to fetch reports");
      } finally {
         setLoading(false);
      }
   };

   const filteredReports =
      filter === "all"
         ? reports
         : reports.filter((report) => report.postType === filter);

   const postTypes = [...new Set(reports.map((r) => r.postType))];

   if (loading) {
      return <LoadingSpinner />;
   }

   return (
      <div className={`min-h-screen ${bgPage} py-8`}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                     <Flag className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                     Reports Dashboard
                  </h1>
               </div>
               <p className={`ml-16 ${textSecondary}`}>
                  Review and manage reported items from the community
               </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
               <button
                  onClick={() => setFilter("all")}
                  className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                     filter === "all"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : `bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 ${
                             darkMode
                                ? "bg-gray-800 border-gray-700 text-gray-200"
                                : ""
                          }`
                  }`}
               >
                  All Reports ({reports.length})
               </button>
               {postTypes.map((type) => (
                  <button
                     key={type}
                     onClick={() => setFilter(type)}
                     className={`px-6 py-2.5 rounded-xl font-medium capitalize transition-all duration-200 ${
                        filter === type
                           ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                           : `bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 ${
                                darkMode
                                   ? "bg-gray-800 border-gray-700 text-gray-200"
                                   : ""
                             }`
                     }`}
                  >
                     {type} ({reports.filter((r) => r.postType === type).length}
                     )
                  </button>
               ))}
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
                        Error Loading Reports
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
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                     <div
                        key={i}
                        className={`rounded-2xl shadow-sm p-6 ${bgCard}`}
                     >
                        <Skeleton height={24} width="70%" className="mb-4" />
                        <Skeleton count={3} className="mb-2" />
                        <Skeleton height={40} className="mt-4" />
                     </div>
                  ))}
               </div>
            ) : filteredReports.length === 0 ? (
               <div
                  className={`rounded-2xl shadow-sm p-12 text-center ${bgCard}`}
               >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                     <FileText className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className={`${textPrimary} text-xl font-semibold mb-2`}>
                     No Reports Found
                  </h3>
                  <p className={textSecondary}>
                     {filter === "all"
                        ? "There are no reports to display at this time."
                        : `No ${filter} reports found.`}
                  </p>
               </div>
            ) : (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredReports.map((report) => (
                     <div
                        key={report._id}
                        className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${bgCard}`}
                     >
                        <div className="p-6">
                           <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-2">
                                    <span
                                       className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                          report.postType === "lost"
                                             ? "bg-red-100 text-red-700"
                                             : "bg-green-100 text-green-700"
                                       }`}
                                    >
                                       {report.postType}
                                    </span>
                                    <span
                                       className={`text-xs flex items-center gap-1 ${textSecondary}`}
                                    >
                                       <Calendar className="w-3 h-3" />
                                       {dayjs(report.date).fromNow()}
                                    </span>
                                 </div>
                                 <h3
                                    className={`text-lg font-bold ${textPrimary} group-hover:text-blue-600 transition-colors line-clamp-2`}
                                 >
                                    {report.postTitle}
                                 </h3>
                              </div>
                              <button
                                 onClick={() => setSelectedReport(report)}
                                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                              >
                                 <FileText
                                    className={`w-5 h-5 ${
                                       darkMode
                                          ? "text-gray-200"
                                          : "text-slate-600"
                                    }`}
                                 />
                              </button>
                           </div>

                           <div className="space-y-3 mb-4">
                              <div className="flex items-center gap-3 text-sm">
                                 <User
                                    className={`w-4 h-4 flex-shrink-0 ${textSecondary}`}
                                 />
                                 <span className={`font-medium ${textPrimary}`}>
                                    {report.reporterName}
                                 </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                 <Mail
                                    className={`w-4 h-4 flex-shrink-0 ${textSecondary}`}
                                 />
                                 <span className={`${textPrimary}`}>
                                    {report.reporterEmail}
                                 </span>
                              </div>
                              <div className="flex items-start gap-3 text-sm">
                                 <Flag
                                    className={`w-4 h-4 flex-shrink-0 mt-0.5 ${textSecondary}`}
                                 />
                                 <span className={`font-medium ${textPrimary}`}>
                                    {report.reason}
                                 </span>
                              </div>
                              {report.comment && (
                                 <div className="flex items-start gap-3 text-sm">
                                    <MessageSquare
                                       className={`w-4 h-4 flex-shrink-0 mt-0.5 ${textSecondary}`}
                                    />
                                    <p
                                       className={`${textPrimary} line-clamp-2`}
                                    >
                                       {report.comment}
                                    </p>
                                 </div>
                              )}
                           </div>

                           <div className="pt-4 border-t border-slate-100">
                              <div
                                 className={`flex items-center justify-between text-xs ${textSecondary}`}
                              >
                                 <div className="flex items-center gap-1">
                                    <Package className="w-3 h-3" />
                                    <span>Post ID: {report.postId}</span>
                                 </div>
                                 <span>
                                    {dayjs(report.date).format("MMM D, YYYY")}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {selectedReport && (
               <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                  onClick={() => setSelectedReport(null)}
               >
                  <div
                     className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
                        darkMode ? "bg-gray-800 text-gray-200" : "bg-white"
                     }`}
                     onClick={(e) => e.stopPropagation()}
                  >
                     {/* Modal content stays as your existing design */}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Reports;
