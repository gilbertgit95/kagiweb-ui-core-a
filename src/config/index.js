let config = {
    appName: 'kagiweb',
    environment: 'development',
    rootRoute: 'core',
    localStorageName: 'app_info',
    // environment: 'staging'
    // environment: 'production'
    development: {
        api: 'http://localhost:5000'
    },
    staging: {
        api: 'http://localhost:5000'
    },
    production: {
        api: 'http://localhost:5000'
    }
}

config = {...config, ...config[config.environment]}

delete config.development
delete config.staging
delete config.production

export default config