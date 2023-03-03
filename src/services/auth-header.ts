export default function authHeader() {
  let user = localStorage.getItem('user');
  if (!user) return {};

  let parsedUser = JSON.parse(user);
  return parsedUser?.accessToken ? { 'x-access-token': parsedUser.accessToken } : {};
}
