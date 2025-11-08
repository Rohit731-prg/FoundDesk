import { Hono } from 'hono'
import UserRouter from "./Route/UserRoute";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/user', UserRouter);


export default app
