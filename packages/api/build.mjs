import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/standalone.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  target: 'es2020',
  platform: 'node',
  external: ['@aws-sdk', '@fastify/swagger', '@fastify/swagger-ui'],
});
