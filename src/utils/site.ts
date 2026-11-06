// Local assets follow the deployment directory, e.g. / or /test/.
export function sitePath(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`;
}
