import chokidar from 'chokidar';
import polka from 'polka';
import sirv from 'sirv';
import { exec } from 'child_process';

const staticMiddleware = sirv('dist', { dev: true });

chokidar.watch('src').on('all', () => {
  exec('yarn build');
});

const port = 9876;
polka()
  .use(staticMiddleware)
  .listen(port, (error) => {
    if (error) {
      console.error(error);
    }

    console.log(`> Running on localhost:${port}`);
  });

