import * as http from 'http';
import App from './app';

const port: string | number = process.env.PORT || 3000;
const app = App;

app.set('port', port);

const server: http.Server = http.createServer(app);

server.listen(port, () => console.log(`Server listening on port: ${port}`));
