import { IRoute } from '@/types';

export const routes: IRoute[] = [
  {
    title: 'Text to NATO',
    route: 'text-to-nato',
    desc: `Transform text into NATO phonetic alphabet for oral transmission.`,
  },
  {
    title: 'UUIDs v4 Generator',
    route: 'uuid-v4-generator',
    desc: `A universally unique identifier (UUID) is a 128-bit number used to identify information in computer systems. The number of possible UUIDs is 16^32, which is 2^128 or about 3.4x10^38 (which is a lot !).`,
  },
  {
    title: 'Text to Slug',
    route: 'text-to-slug',
    desc: `Slugifies strings, even when they contain Unicode, making strings URL-Safe`,
  },
  {
    title: 'Random Port Generator',
    route: 'random-port-generator',
    desc: `Generate a random TCP port number`,
  },
  {
    title: 'Hash Generators',
    route: 'hash-generator',
    desc: `Generate a random Hashes for String inputs`,
  },
  {
    title: 'Simple Password',
    route: 'simple-password-generator',
    desc: `Generate a simple passwords that are easy to memorize`,
  },
];

export default routes.sort((a, b) => {
  return Number(a.title) - Number(b.title);
});
