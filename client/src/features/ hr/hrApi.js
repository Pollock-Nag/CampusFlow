import { apiSlice } from '../api/apiSlice';
import { queryResult } from './hrSlice';

export const hrApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postStackWiseFilter: builder.mutation({
      query: (body) => ({
        url: `hr/stackWiseFilter`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem('results', JSON.stringify(result.data));
          dispatch(
            queryResult({
              results: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),

    talentRequest: builder.mutation({
      query: (body) => ({
        url: `hr/talentRequest`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostStackWiseFilterMutation, useTalentRequestMutation } =
  hrApi;
