import { apiSlice } from '../api/apiSlice';

export const githubApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: '/app/bookings',
        method: 'POST',
        body: bookingInfo,
      }),
    }),
    getAllCohorts: builder.query({
      query: () => ({
        url: `/github/getAllCohorts/`,
        headers: {
          'github-access-token': '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',
        },
      }),
    }),
    deleteBookingById: builder.mutation({
      query: (id) => ({
        url: `/app/bookings/${id}`,
        method: 'DELETE',
      }),
    }),
    addBookmark: builder.mutation({
      query: (id) => ({
        url: `app/bookmarks/${id}`,
        method: 'POST',
      }),
    }),

    getAllBookmarkedParkings: builder.query({
      query: () => ({
        url: `app/bookmarks/`,
      }),
    }),

    removeBookmark: builder.mutation({
      query: (id) => ({
        url: `app/bookmarks/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllCohortsQuery } = githubApi;
