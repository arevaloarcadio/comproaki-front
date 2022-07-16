/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';

import Unocss from 'unocss/vite';
import transformerDirective from '@unocss/transformer-directives';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Pages(),
        Unocss({
            transformers: [transformerDirective()],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            core: path.resolve(__dirname, './src/core'),
            pages: path.resolve(__dirname, './src/pages'),
        },
    },
});
