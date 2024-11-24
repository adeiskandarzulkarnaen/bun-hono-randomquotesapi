import { bearerAuth } from 'hono/bearer-auth';


function bearerMiddleware() {
  const token: string | undefined = process.env.BEARER_TOKEN;

  if (!token) {
    throw new Error('Environment variable BEARER_TOKEN is not set');
  }

  return bearerAuth({
    token,
    noAuthenticationHeaderMessage: {
      status: "fail",
      message: "bearer token tidak dilampirkan!"
    },
    invalidAuthenticationHeaderMessage: {
      status: "fail",
      message: "bearer token invalid!"
    },
    invalidTokenMessage: {
      status: "fail",
      message: "invalid token message!"
    }
  });
};

export default bearerMiddleware;

