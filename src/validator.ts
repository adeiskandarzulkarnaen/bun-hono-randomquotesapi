import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import ClientError from './exceptions/ClientError';
import { HTTPException } from 'hono/http-exception';


const zPostQuotesSchema = z.object({
  author: z.string().min(3).max(100),
  quotes: z.string().min(8).max(100),
});


const zPostQuotes = zValidator('json', zPostQuotesSchema, (result, c) => {
  if (!result.success) {
    throw new HTTPException( 400, {
      res: new Response(JSON.stringify({
        status: "fail",
        message: "data validation error",
        data: [
          ...result.error.issues
        ]
      }),
      {
        status: 400,
        headers: {
          "Content-Type" : "application/json"
        }
      })
    })
  }
});

export { zPostQuotes };
