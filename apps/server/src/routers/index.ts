import healthCheckRouter from './healthcheck';
import youtubeRouter from './youtube';

export default server => {
  server.use('/api', healthCheckRouter);
  server.use('/api', youtubeRouter);
};
