import { watch } from 'chokidar';
import polka from 'polka';
import sirv from 'sirv';

import { exec } from 'child_process';

const staticMiddleware = sirv('dist', { dev: true });

watch('src').on('all', () => {
  exec('yarn build');
});

const port = 9876;
polka()
  .use(staticMiddleware)
  .listen(port, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    // eslint-disable-next-line no-console
    console.log(`> Running on localhost:${port}`);
  });

