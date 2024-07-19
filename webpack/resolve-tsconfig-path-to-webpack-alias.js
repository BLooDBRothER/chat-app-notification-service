const { resolve, join } = require('path');

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @param  {string} tsconfigPath           - Path to tsconfig
 * @param  {string} webpackConfigBasePath  - Path from tsconfig to Webpack config to create absolute aliases
 * @return {object}                        - Webpack alias config
 */
function resolveTsconfigPathsToAlias() {
    const tsconfigPath = "../tsconfig.json";
    const webpackConfigBasePath = join(__dirname, "..");

    const { paths } = require(tsconfigPath).compilerOptions;
    const aliases = {};

    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '');
        const value = resolve(webpackConfigBasePath, paths[item][0].replace('/*', '').replace('*', ''));

        aliases[key] = value;
    });

    return aliases;
}

module.exports = resolveTsconfigPathsToAlias;
