export async function getStoreSanityData({
  slug,
  client,
}: {
  slug: string;
  client: any;
}) {
  const query = `*[_type == "store"]{...,"slug":${slug}}`;
  const data = await client.fetch(query);
  return data;
}

export async function getSanityRootData({
  slug,
  client,
}: {
  slug: string;
  client: any;
}) {
  const query = `*[_type == "root"]{...,"slug":${slug}}`;
  const data = await client.fetch(query);
  return data;
}

