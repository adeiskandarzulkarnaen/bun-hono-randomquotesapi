import { Context } from "hono";

function notFoundHandler(c: Context) {
  return c.json({
    status: 'fail',
    message: 'request path tidak ada',
  }, 400);
};

export default notFoundHandler;
