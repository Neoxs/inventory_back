import initializeServer from './server';
import { router } from './routes';

const app = initializeServer(router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));