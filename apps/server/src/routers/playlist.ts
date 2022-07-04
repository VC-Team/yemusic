import { Router } from 'express';

import controller from '@controllers/playlist';
const youtubeRouter = Router();

youtubeRouter.route('/playlist/s').post(controller.getPlaylists);
youtubeRouter.route('/playlist/:_id').get(controller.getPlaylist);

youtubeRouter.route('/playlist').post(controller.createPlaylist);
youtubeRouter.route('/playlist').put(controller.updatePlaylist);
youtubeRouter.route('/playlist').delete(controller.deletePlaylist);
youtubeRouter.route('/playlist/restore').put(controller.restorePlaylist);

youtubeRouter.route('/playlist/addSong').put(controller.addSong);
youtubeRouter.route('/playlist/removeSong').put(controller.removeSong);

export default youtubeRouter;
