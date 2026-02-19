import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const API_URL = "https://crud-backend-1-547y.onrender.com";
  const [preview, setPreview] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const mutation = useMutation({
    mutationFn: (formData) =>
      axios.post(`${API_URL}/api/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate(formData);
  };

  return (
    <section className="max-w-3xl mx-auto mt-28 mb-12 p-5 bg-white shadow-sm rounded-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-[#333] border-b border-gray-200 pb-4 mb-6">
        New User Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Name & Age */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="flex-1">
            <label htmlFor="empname" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="empname"
              id="empname"
              placeholder="Enter name"
              required
              className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="empage" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="empage"
              id="empage"
              placeholder="Enter age"
              required
              className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Dept */}
        <div>
          <label htmlFor="empdept" className="block text-sm font-medium text-gray-700 mb-1">
            Dept
          </label>
          <select
            id="empdept"
            name="empdept"
            required
            className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">Select Dept</option>
            <option value="Software">Software</option>
            <option value="Marketing">Marketing</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="System Analyst">System Analyst</option>
            <option value="UX/UI Designer">UX/UI Designer</option>
            <option value="Cybersecurity Manager">Cybersecurity Manager</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Photo */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
            Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2.5 text-sm text-gray-500 bg-gray-50 border border-gray-300 rounded cursor-pointer focus:outline-none"
          />
          <div className="mt-2 h-32 flex justify-center items-center border border-dashed border-gray-300 rounded bg-gray-50 overflow-hidden">
            {preview ? (
              <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded-full" />
            ) : (
              <span className="text-gray-400 text-sm">Upload Your Image</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddUser;