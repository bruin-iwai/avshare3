import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/standalone.ts'],
  bundle: true,
  outfile: 'dist/index.mjs',
  target: 'node24',
  format: 'esm',
  platform: 'node',
  external: ['@aws-sdk/*', '@fastify/*', 'fastify', 'http-errors'],
});
