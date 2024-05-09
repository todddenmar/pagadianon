export async function getStoresSanityData({ client }: { client: any }) {
  const query = `*[_type == "store"]`;
  const data = await client.fetch(query);
  return data;
}

export async function getSanityAdminData({
  slug,
  client,
}: {
  slug: string;
  client: any;
}) {
  const query = `*[_type == "admin"]{...,"slug":${slug}}`;
  const data = await client.fetch(query);
  return data;
}
