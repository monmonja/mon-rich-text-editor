let mix = require('laravel-mix');

mix.webpackConfig({
    externals: {
        "jquery": "jQuery",
        "quill": "Quill"
        // ,"vue": "Vue"
    },
    resolve: {
        extensions: ['.vue']
    }
});
mix.ts('src/index.ts', 'dist');

