import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  return <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={handlelogin} className="space-y-5 ">
          <div className="p-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email"
              className="w-full px-4 py-3 border-gray-300 rounded-xl" />
          </div>
          <div className="p-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password"
              className="w-full px-4 py-3 border-gray-300 rounded-xl" />
          </div>
          <div className="px-2 flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to={"/password/forgot"} type="button" className="text-blue-600 hover:underline">Forgot Password?</Link>
          </div>
          <div className="px-2 ">
            <button type="submit" className="w-full flex justify-center items-center gap-2 rounded-lg  bg-blue-700 text-white font-semibold py-3 transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className=" w-5 h-5 border-2 bg-white border-t-transparent rounded-full animate-spin">
                    <span>Signing In</span>
                  </div>
                </>
              ) : (
                "signin"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
    
    
    
    
    
    </>;
};

export default ResetPassword;
