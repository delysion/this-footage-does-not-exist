// Local-only review server with byte ranges so Chrome can seek in rendered MP4s.
import { createServer } from 'node:http';
import { createReadStream, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const allowed = new Set(['ending-A-existing.mp4','ending-B-action.mp4']);
const page = readFileSync('tools_video_check.html');
createServer((request,response) => {
  if (request.url === '/' || request.url === '/tools_video_check.html') {
    response.writeHead(200,{'Content-Type':'text/html'}); response.end(page); return;
  }
  const name = request.url?.split('/').pop();
  if (!request.url?.startsWith('/artifacts/') || !allowed.has(name)) {
    response.writeHead(404); response.end(); return;
  }
  const path = join('artifacts',name);
  const size = statSync(path).size;
  const range = /bytes=(\d+)-(\d*)/.exec(request.headers.range ?? '');
  const start = range ? Number(range[1]) : 0;
  const end = range && range[2] ? Math.min(Number(range[2]),size-1) : size-1;
  if (start>=size || end<start) {response.writeHead(416);response.end();return;}
  response.writeHead(range ? 206 : 200,{
    'Content-Type':'video/mp4','Content-Length':end-start+1,
    'Accept-Ranges':'bytes',...(range ? {'Content-Range':`bytes ${start}-${end}/${size}`} : {}),
  });
  createReadStream(path,{start,end}).pipe(response);
}).listen(8010,'127.0.0.1',()=>console.log('Media review server on http://127.0.0.1:8010/'));
