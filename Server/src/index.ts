import { Hono } from 'hono'
import UserRouter from "./Route/UserRoute";
import { cors } from "hono/cors";

const app = new Hono()
app.use(
  '*',
  cors({
    origin: 'http://localhost:5173', // or specific: ['http://localhost:5173']
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/user', UserRouter);


export default app
