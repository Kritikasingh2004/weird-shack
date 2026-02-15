export default async function Home() {
  const res = await fetch(process.env.API_URL!, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div>
      <h1>{data.status}</h1>
    </div>
  );
}
