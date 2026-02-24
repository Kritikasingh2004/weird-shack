export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(`${process.env.API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return Response.json(data, { status: response.status });
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const response = await fetch(`${process.env.API_URL}/products/${body.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return Response.json(data, { status: response.status });
}
