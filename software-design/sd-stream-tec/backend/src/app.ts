import * as http from 'http'
import Server from './server'

const port: string | number | boolean = process.env.PORT || 3000;

Server.set('port', port);

const server: http.Server = http.createServer(Server);

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
