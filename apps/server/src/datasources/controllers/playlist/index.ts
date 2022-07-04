import * as playlistCommand from './playlistCommand';
import * as playlistQuery from './playlistQuery';

export default {
  ...playlistQuery,
  ...playlistCommand,
};
