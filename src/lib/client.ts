import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
export const client = createClient({
  projectId: 'at1yhror',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: true,
});
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
