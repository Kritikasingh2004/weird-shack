export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const response = await fetch(`${process.env.API_URL}/products/${id}`, {
    method: "DELETE",
  });

  return new Response(null, { status: response.status });
}
