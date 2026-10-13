/**
 * The test Redmine is served over plain HTTP on localhost, so @typespec/ts-http-runtime warns on every run
 * that the API key is sent over an insecure connection. That is expected here, so this one warning is dropped.
 */
const emitWarning = process.emitWarning;

process.emitWarning = ((warning: string | Error, ...args: any[]) => {
  const message = typeof warning === "string" ? warning : warning.message;
  if (message.startsWith("Sending token over insecure transport")) return;
  return emitWarning.call(process, warning, ...args);
}) as typeof process.emitWarning;
