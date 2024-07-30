import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosInstance"

export const createReview = createAsyncThunk(
  "review/createReview",
  async (review, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.post("/reviews", review)
      return response.data
    } catch (error) {
      return rejectedWithValue(error.response.data)
    }
  }
)

export const fetchReviewsByUserId = createAsyncThunk(
  "review/fetchReviewsByUserId",
  async (userId, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/reviews/user/${userId}`)
      return response.data
    } catch (error) {
      return rejectedWithValue(error.response.data)
    }
  }
)

export const fetchReviewsByProductId = createAsyncThunk(
  "review/fetchReviewsByProductId",
  async (productId, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/reviews/product/${productId}`)
      return response.data
    } catch (error) {
      return rejectedWithValue(error.response.data)
    }
  }
)

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    statusCode: null,
    message: null,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.fulfilled, (state, action) => {
        state.statusCode = "succeeded"
        state.data = action.payload.data
      })
      .addCase(fetchReviewsByUserId.fulfilled, (state, action) => {
        state.statusCode = "succeeded"
        state.data = action.payload.data
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.statusCode = "succeeded"
        state.data = action.payload.data
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload
          state.status = "failed"
        }
      )
  },
})

export default reviewSlice.reducer