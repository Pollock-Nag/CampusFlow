import { apiSlice } from '../api/apiSlice';

export const skillApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query({
      query: () => ({
        url: `/skill/getAllSkills`,
      }),
    }),
    getSkillsByCategory: builder.query({
      query: (category) => ({
        url: `/skill/getSkillsByCategory/${category}`,
      }),
    }),

    createSkill: builder.mutation({
      query: (data) => ({
        url: `/skill/addSkill/`,
        method: 'POST',
        body: data,
      }),
    }),
    addCategoryToSkill: builder.mutation({
      query: (data) => ({
        url: `/skill/addSkill/${data.id}`,
        method: 'POST',
        body: data,
      }),
    }),
    addCategoriesToSkills: builder.mutation({
      query: (data) => ({
        url: `/skill/addCategoriesToSkills`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skill/deleteSkill/${id}`,
        method: 'DELETE',
      }),
    }),

    addSkillsType: builder.mutation({
      query: (data) => ({
        url: `/skill/addSkillsType`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useDeleteSkillMutation,
  useCreateSkillMutation,
  useGetSkillsByCategoryQuery,
  useGetAllSkillsQuery,
  useAddCategoriesToSkillsMutation,
  useAddSkillsTypeMutation,
} = skillApi;
