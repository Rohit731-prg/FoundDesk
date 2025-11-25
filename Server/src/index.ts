import { Hono } from 'hono'
import UserRouter from "./Route/UserRoute";
import ItemRouter from "./Route/itemRoute";
import { cors } from "hono/cors";

const app = new Hono()
app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // VERY IMPORTANT
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/user', UserRouter);
app.route('/api/item', ItemRouter);


export default app
