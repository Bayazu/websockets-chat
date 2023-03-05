import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options : BuildOptions) : webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        // указываем пути для основных папок, откуда будет происходить абсолютный импорт
        modules: [options.paths.src, 'node_modules'],
        // указываем, что для каждого модуля будет основным файлом index
        mainFiles: ['index'],
        alias: {},
    };
}
