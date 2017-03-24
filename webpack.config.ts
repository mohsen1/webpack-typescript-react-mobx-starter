import * as path from 'path';
import * as webpack from 'webpack';
import * as HTMLPlugin from 'html-webpack-plugin';
import * as ExtractText from 'extract-text-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

const compilerOptions = require('./tsconfig.json').compilerOptions;
compilerOptions.module = 'es2015';

const config: webpack.Configuration = {
    devtool: 'source-map',
    entry: {
        main: './src/index.tsx',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.css', '.js'],
        modules: ['src', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            silent: true,
                            compilerOptions,
                        },
                    },
                ]
            },
            {
                test: /\.css?$/,
                exclude: /node_modules/,
                get use() {
                    const loaders = [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: `${isProd ? '' : '[local]'}--[hash:base64:6]`,
                                minimize: isProd,
                            }
                        },
                        {
                            loader: 'typed-css-modules-loader',
                        },
                    ];

                    if (isProd) {
                        return ExtractText.extract(loaders);
                    }
                    return [{ loader: 'style-loader' }, ...loaders];
                },
            }
        ]
    },
    plugins: [
        new HTMLPlugin(),
        new ExtractText({
            filename: 'style.css',
            disable: !isProd,
        }),
    ],
};

export default config;
