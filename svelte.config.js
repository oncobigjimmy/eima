import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.md']
    })
  ],
  kit: {
    adapter: adapter(),
    prerender: { entries: ['*', '/ca/blog.xml', '/en/blog.xml'] }
  }
};

export default config;
