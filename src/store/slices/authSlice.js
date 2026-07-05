<<<<<<< HEAD
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { toggleAuthPopup } from "./popupSlice";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);

      toast.success(res.data.message);
      thunkAPI.dispatch(toggleAuthPopup());

      return res.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/login", data)
    toast.success(res.data.message),
      thunkAPI.dispatch(toggleAuthPopup())
    return res.data.user

  }
  catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);

  }
})
export const getUser = createAsyncThunk("auth/me", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/me", data)
    // toast.success(res.data.message),
    //thunkAPI.dispatch(toggleAuthPopup())
    return res.data.user

  }
  catch (error) {

    return thunkAPI.rejectWithValue(error.response.data.message || "failed to get user");

  }
});
export const logout = createAsyncThunk("auth/logout", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/logout", data)

    thunkAPI.dispatch(toggleAuthPopup());
    return null;

  }
  catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message || "failed to get user");

  }
});
export const forgotPassword = createAsyncThunk("auth/password/forgot", async (email, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/password/forgot?frontendUrl=http://localhost:5173", email)
    toast.success(res.data.message);

    return null;

  }
  catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);

  }
}

)
export const resetPassword = createAsyncThunk("auth/password/reset", async ({ token, password, confirmPassword }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/auth/password/reset/${token}`, {
      password,
      confirmPassword
    });
    toast.success(res.data.message || "Password reset successfully");
    //thunkAPI.dispatch(toggleAuthPopup()); // ✅ open profile panel
    return res.data.user; // ✅ this sets authUser in state
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});


export const updatePassword = createAsyncThunk("auth/password/update",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put("/auth/password/update", data
      )
      toast.success(res.data.message);

      return null;

    }
    catch (error) {
      const message = toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(message);

    }
  }

);
export const updateProfile = createAsyncThunk("auth/me/profile",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put("/auth/profile/update", data
      )
      toast.success(res.data.message);

      return res.data.user;

    }
    catch (error) {
      const message = toast.error(error.response.data.message);
      toast.error(message || "something went wrong. Plsease try again");
      return thunkAPI.rejectWithValue(message);

    }
  }

);

=======
import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
>>>>>>> 701e9bf349e789c5991dcb89f0a7b70b67dca075

const authSlice = createSlice({
  name: "auth",
  initialState: {
<<<<<<< HEAD
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
  },
  extraReducers: (builder) => {

    builder.addCase(register.pending, (state) => {
      state.isSigningUp = true;
    })
      .addCase(register.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isSigningUp = false;
        state.authUser = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;

      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = null;
      })
      .addCase(getUser.pending, (state) => {
        state.isCheckingAuth = true;
        //state.authUser = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.authUser = null;

      })
      .addCase(logout.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = state.authUser;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isRequestingForToken = true;

      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isRequestingForToken = false;

      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isRequestingForToken = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isUpdatingPassword = false;
        state.authUser = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isUpdatingPassword = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isUpdatingPassword = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isUpdatingPassword = false;

      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;

      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false;
      })
  },

});
=======
    loading: false,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loginFailed(state) {
      state.loading = false;
    },
    getUserRequest(state) {
      state.loading = true;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailed(state) {
      state.loading = false;
    },
    forgotPasswordRequest(state) {
      state.loading = true;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;

    },
    forgotPasswordFailed(state) {
      state.loading = false;
    },
    resetPasswordRequest(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;

    },
    resetPasswordFailed(state) {
      state.loading = false;
    },

    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;

    },
    updateProfileFailed(state) {
      state.loading = false;
    },
    updatePasswordRequest(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    updatePasswordFailed(state) {
      state.loading = false;
    },
    resetAuthSlice(state) {
      state.loading = false;
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
    },

  },
});
export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    const res = await axiosInstance.post("/auth/login", data).then(res => {
      if (res.data.user.role === "Admin") {
        dispatch(authSlice.actions.loginSuccess(res.data.user))
        toast.success(res.data.message)

      }
      else {
        dispatch(authSlice.actions.loginFailed());
        toast.error(res.data.message);
      }
    });
    dispatch(authSlice.actions.loginSuccess(res.data));
  } catch (error) {
    dispatch(authSlice.actions.loginFailed());
    toast.error(error.response.data.message || "Login Failed");
  }



};
export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  try {
    const res = await axiosInstance.get("/auth/me").then(res => {
      dispatch(authSlice.actions.getUserSuccess(res.data.user));
    })

  } catch (error) {
    dispatch(authSlice.actions.getUserFailed());
    toast.error(error.response.data.message || "Failed to fetch user");
  }
};
export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  try {
    const res = await axiosInstance.get("/auth/logout").then(res => {
      dispatch(authSlice.actions.logoutSuccess());
      toast.success(res.data.message);
      dispatch(authSlice.actions.resetAuthSlice());
    })

  } catch (error) {
    dispatch(authSlice.actions.logoutFailed()); //getUserrFailed
    toast.error(error.response.data.message || "Failed to logout");
    dispatch(authSlice.actions.resetAuthSlice());
  }
};
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  try {
    const res = await axiosInstance.post("/auth/password/forgot?frontendUrl=http://localhost:5173", email).then(res => {

      dispatch(authSlice.actions.forgotPasswordSuccess(res.data))
      toast.success(res.data.message)
    });
  } catch (error) {
    dispatch(authSlice.actions.forgotPasswordFailed());
    toast.error(error.response.data.message || "can't request for reset password");
  }



};

export const resetPassword = (newData, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  try {
    const res = await axiosInstance.put(`/auth/password/reset/${token}`, newData).then(res => {

      dispatch(authSlice.actions.resetPasswordSuccess(res.data.user))
      toast.success(res.data.message)
    });
  } catch (error) {
    dispatch(authSlice.actions.resetPasswordFailed());
    toast.error(error.response.data.message || "Failed to reset password");
  }



};
export const updateAdminProfile = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updateProfileRequest());
  try {
    const res = await axiosInstance.put(`/auth/profile/update`, data).then(res => {

      dispatch(authSlice.actions.updateProfileSuccess(res.data.user))
      toast.success(res.data.message)
    });
  } catch (error) {
    dispatch(authSlice.actions.updateProfileFailed());
    toast.error(error.response.data.message || "Failed to update profile");
  }



};
export const updateAdminPassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try {
    const res = await axiosInstance.put(`/auth/password/update`, data).then(res => {

      dispatch(authSlice.actions.updatePasswordSuccess(res.data.user))
      toast.success(res.data.message)
    });
  } catch (error) {
    dispatch(authSlice.actions.updatePasswordFailed());
    toast.error(error.response.data.message || "Failed to update password");
  }



};
export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
}

>>>>>>> 701e9bf349e789c5991dcb89f0a7b70b67dca075

export default authSlice.reducer;
