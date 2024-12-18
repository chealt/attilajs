import chokidar from 'chokidar';
import polka from 'polka';
import sirv from 'sirv';
import { exec } from 'child_process';

const staticMiddleware = sirv('dist');

const port = 9876;
polka()
  .use(staticMiddleware)
  .listen(port, () => {
    console.log(`> Running on localhost:${port}`);
  });

chokidar.watch('src/index.js').on('all', () => {
  exec('yarn build');
});
