const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#6DC2C5',
                            '@body-background': '#F1FAEE',
                            '@component-background': '#F1FAEE',
                            '@layout-body-background': '#F1FAEE',
                            '@layout-header-background': '#F1FAEE',
                            '@layout-trigger-background': '#457B9D',
                            '@layout-trigger-color': '#fff',
                            '@layout-sider-background' : '#1D3557',
                            '@menu-bg': '#1D3557',
                            '@menu-item-color': '#F1FAEE',
                            '@text-color': 'rgba(0, 0, 0, 0.65)', // major text color
                            '@text-color-secondary': 'rgba(0, 0, 0, 0.45)'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};