import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const API_URL = "https://crud-backend-1-547y.onrender.com";
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchTerm);
  };

  const handleClear = (e) => {
    if (!e.target.value) {
      setSearchTerm("");
      setSearch("");
      setPage(1);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, search],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/users`, { params: { page, search: search || undefined } })
        .then((res) => res.data),
    keepPreviousData: true,
  });

  if (isLoading && !data) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error.message}</div>;

  return (
    <main className="max-w-7xl mx-auto mt-28 mb-12 px-4 sm:px-6 lg:px-8">
      {/* Search */}
      <section className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-3">
        <h2 className="text-2xl font-medium text-[#333]">Employee Management</h2>
        <form onSubmit={handleSearch} className="flex flex-1 max-w-md gap-2">
          <input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onInput={handleClear}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </section>

      {/* Table */}
      <div className="overflow-x-auto shadow-sm rounded-lg mb-6">
        <table className="w-full min-w-[600px] border-collapse bg-white">
          <thead className="bg-[#333] text-white">
            <tr>
              <th className="p-3 text-left font-medium border-b border-gray-200">Name</th>
              <th className="p-3 text-left font-medium border-b border-gray-200">Age</th>
              <th className="p-3 text-left font-medium border-b border-gray-200">Dept</th>
              <th className="p-3 text-center font-medium border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.length > 0 ? (
              data.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2">{user.empname}</td>
                  <td className="p-2">{user.empage}</td>
                  <td className="p-2">{user.empdept}</td>
                  <td className="p-2 text-center">
                    <Link
                      to={`/user/${user.id}`}
                      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs sm:text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-5 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data?.users?.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-base font-medium text-[#333]">
            {data.currentPage} Page of {data.totalPages || data.totalPage}
          </span>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === data.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;