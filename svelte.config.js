import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import { copyFileSync, renameSync, writeFileSync } from 'node:fs';

const nodeAdapter = adapter();
const canonicalAdapter = {
  ...nodeAdapter,
  async adapt(builder) {
    await nodeAdapter.adapt(builder);
    renameSync('build/handler.js', 'build/svelte-handler.js');
    copyFileSync('server/canonical-domain.mjs', 'build/canonical-domain.mjs');
    writeFileSync(
      'build/handler.js',
      "import { handler as appHandler } from './svelte-handler.js';\n" +
        "import { withCanonicalDomain } from './canonical-domain.mjs';\n" +
        'export const handler = withCanonicalDomain(appHandler);\n'
    );
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.md']
    })
  ],
  kit: {
    adapter: canonicalAdapter,
    prerender: { entries: ['*', '/ca/blog.xml', '/en/blog.xml'] }
  }
};

export default config;
