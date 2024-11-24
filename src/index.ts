import { Context, Hono } from 'hono';
import prismaClient from './config/prismaClient';
import { zPostQuotes } from './validator';
import bearerMiddleware from './middlewares/bearerMiddleware';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';


const app = new Hono()

app.get('/quotes', async (c: Context) => {
  const result: {author: string, quotes: string, created_at: string}[] = await prismaClient.$queryRaw`
    SELECT author, quotes, created_at FROM quotes ORDER BY RAND() LIMIT 1`;

  return c.json({
    status: "success",
    message: "berhasil get data",
    data: {
      author: result[0].author,
      quotes: result[0].quotes,
      createdAt: new Date(result[0].created_at).toLocaleString()
    }
  }, 200);
});


app.post('/quotes', bearerMiddleware(), zPostQuotes, async (c: Context) => {
  const { author, quotes } = c.req.valid('json');

  const result = await prismaClient.quotes.create({
    data: { author, quotes },
    select: { createdAt: true, author: true, quotes: true }
  });

  return c.json({
    status: "success",
    message: "berhail menambahkan quotes",
    data: {
      ...result
    }
  });
});


app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app
