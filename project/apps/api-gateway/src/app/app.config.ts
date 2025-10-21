export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/auth',
  Subscribe = 'http://localhost:3001/api/subscribe',
  Posts = 'http://localhost:3002/api/posts',
  Files = 'http://localhost:3003/api/files',
  Feed = 'http://localhost:3333/api/feed',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
