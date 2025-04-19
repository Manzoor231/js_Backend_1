import express from 'express';
import routes from './routes/users.route.js';
import postRoute from './routes/posts.route.js';

const app = express();
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.use('/api',routes);
app.use('/api',postRoute)
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });
export default app;