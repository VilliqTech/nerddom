// import { defineConfig } from '@tanstack/react-start/config';
// import tsConfigPaths from 'vite-tsconfig-paths';

// export default defineConfig({
//     tsr: {
//         appDirectory: 'app',
//     },
//     vite: {
//         plugins: [
//             tsConfigPaths({
//                 projects: ['./tsconfig.json'],
//             }),
//         ],
//     },
// });

// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        tsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        tanstackStart(),
    ],
});
