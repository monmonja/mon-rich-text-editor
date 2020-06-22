let mix = require('laravel-mix');

mix.webpackConfig({
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },
    resolve: {
        extensions: ['.vue'],
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.djs'
            }
        }
    }
});
mix.ts('src/index.ts', 'dist');

