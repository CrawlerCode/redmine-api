import type { HttpResponse, StreamableMethod } from "@typespec/ts-http-runtime";

// Same check as the runtime uses to choose between `asNodeStream` and `asBrowserStream`
const isNodeLike = typeof globalThis.process !== "undefined" && Boolean(globalThis.process.version) && Boolean(globalThis.process.versions?.node);

/**
 * Reads a Node.js or web stream into a byte array
 */
async function readStream(stream: NodeJS.ReadableStream | ReadableStream<Uint8Array>): Promise<Uint8Array> {
  if (!(Symbol.asyncIterator in stream)) return new Uint8Array(await new Response(stream).arrayBuffer());

  const chunks: Uint8Array[] = [];
  for await (const chunk of stream as AsyncIterable<Uint8Array | string>) {
    chunks.push(typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk);
  }
  const bytes = new Uint8Array(chunks.reduce((length, chunk) => length + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return bytes;
}

/**
 * Sends the request and reads the response body as bytes (`undefined` if empty).
 *
 * Without streaming, the runtime reads every body as text, which breaks binary content.
 */
export async function sendBinaryRequest(request: StreamableMethod): Promise<HttpResponse & { body?: Uint8Array }> {
  const response = await (isNodeLike ? request.asNodeStream() : request.asBrowserStream());
  const body = response.body ? await readStream(response.body) : undefined;
  return { ...response, body: body?.length ? body : undefined };
}
