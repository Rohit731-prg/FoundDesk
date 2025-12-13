import { Hono } from 'hono'
import UserRouter from "./Route/UserRoute";
import ItemRouter from "./Route/itemRoute";
import AdminRouter from "./Route/AdminRoute";
import ClaimRouter from "./Route/CliamRoute";
import QuestionRouter from "./Route/QuestionRoute";
import { cors } from "hono/cors";

const app = new Hono()
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);


app.get('/', (c) => {
  return c.text('Hello Hono!');
})

app.route('/api/user', UserRouter);
app.route('/api/item', ItemRouter);
app.route('/api/admin', AdminRouter);
app.route('/api/claim', ClaimRouter);
app.route('/api/question', QuestionRouter);

export default app
