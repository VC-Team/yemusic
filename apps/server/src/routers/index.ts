import authRouter from './auth';
import healthCheckRouter from './healthcheck';
import playlistRouter from './playlist';
import youtubeRouter from './youtube';

export default server => {
  server.use('/api', healthCheckRouter);
  server.use('/api', youtubeRouter);
  server.use('/api', authRouter);
  server.use('/api', playlistRouter);
};
