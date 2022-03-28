import { Router } from 'express';

import controller from '../datasources/controllers/youtube';
const youtubeRouter = Router();

youtubeRouter.route('/song/s').post(controller.listSong);
youtubeRouter.route('/song/:youtubeId').get(controller.song);

export default youtubeRouter;
