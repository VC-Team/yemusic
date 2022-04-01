import healthCheckRouter from './healthcheck';
import userRouter from './user';
import youtubeRouter from './youtube';

export default server => {
  server.use('/api', healthCheckRouter);
  server.use('/api', youtubeRouter);
  server.use('/api', userRouter);
};
