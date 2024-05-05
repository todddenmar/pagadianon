export default {
  name: 'client',
  type: 'document',
  title: 'Client',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Client Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Client Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'images',
      type: 'array',
      title: 'Client Images',
      of: [{type: 'image'}],
    },
  ],
}
