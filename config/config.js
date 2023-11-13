import config from './default.js';

const loadConfig = () => {
    // console.log(config)
    const env = process.env.NODE_ENV || 'development';
    // console.log(env)
    return config[env];
}

export default loadConfig;
