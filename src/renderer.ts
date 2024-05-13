import { createTRPCProxyClient } from '@trpc/client';
import { ipcLink } from 'electron-trpc/renderer';
import { AppRouter } from './api';

let i = 0;
setInterval(() => {
  document.getElementById('count')!.innerText = String(i++);
}, 1000);

export const client = createTRPCProxyClient({ links: [ipcLink<AppRouter>()] });
client.greeting
  .query({
    name: 'HOGE',
  })
  .then((res) => {
    document.getElementById('greeting')!.innerText = res.text;
  });
