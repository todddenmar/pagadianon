export default {
  name: 'admin',
  type: 'document',
  title: 'Admin',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Admin',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Admin Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'images',
      type: 'array',
      title: 'Admin Images',
      of: [{type: 'image'}],
    },
  ],
}
