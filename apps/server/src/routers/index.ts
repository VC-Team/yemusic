import authRouter from './auth';
import healthCheckRouter from './healthcheck';
import youtubeRouter from './youtube';

export default server => {
  server.use('/api', healthCheckRouter);
  server.use('/api', youtubeRouter);
  server.use('/api', authRouter);
};
