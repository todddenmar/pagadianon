export default {
  name: 'store',
  type: 'document',
  title: 'Store',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Store Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Store Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'images',
      type: 'array',
      title: 'Store Images',
      of: [{type: 'image'}],
    },
  ],
}
