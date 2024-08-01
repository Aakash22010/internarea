import platform from 'platform';

export const getUserAgentInfo = () => {
    const userAgentInfo = {
        browser: platform.name,
        version: platform.version,
        os: platform.os.family,
        device: platform.product,
    };
    return userAgentInfo;
};
