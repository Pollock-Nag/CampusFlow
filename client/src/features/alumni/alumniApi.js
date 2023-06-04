import { apiSlice } from '../api/apiSlice';

export const alumniApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    convertToAlumni: builder.mutation({
      query: (data) => ({
        url: `/alumni/convertToAlumni`,
        method: 'POST',
        body: data,
      }),
    }),
    getAlumniById: builder.query({
      query: (id) => `/alumni/getAlumniById/${id}`,
    }),

    addAlumniInfo: builder.mutation({
      query: (data) => ({
        url: `/alumni/postInfo/${data.id}/?type=${data.type}`,
        method: 'POST',
        body: data,
      }),
    }),

    addAlumniStack: builder.mutation({
      query: (data) => ({
        url: `/alumni/addStack/${data.id}`,
        method: 'POST',
        body: data,
      }),
    }),

    // router.post(
    //   '/insertPersonaityRating/:id',
    //   alumniController.insertPersonaityRating
    // );

    insertPersonaityRating: builder.mutation({
      query: (id) => ({
        url: `/alumni/insertPersonaityRating/${id}`,
        method: 'POST',
        body: id,
      }),
    }),
  }),
});

export const {
  useConvertToAlumniMutation,
  useGetAlumniByIdQuery,
  useAddAlumniInfoMutation,
  useAddAlumniStackMutation,
  useInsertPersonaityRatingMutation,
} = alumniApi;
