import Axios from 'axios';

export const reqWithoutBody = async (url, method) => {
    const res = await Axios ({
        method: method,
        url: `https://pcfy.redberryinternship.ge/api/${url}`
    })
    const data = await res.data;
    return data;
}

export const reqWithBody = async (url, method) => {
    try {
        const res = await Axios({
            method,
            url:`https://pcfy.redberryinternship.ge/api/${url}?token=3a13437ec4ff8482bbb0f2d70fb4065a`
        });

        const data = await res.data;
        return data;
    } catch (err) {
        console.warn(err);
    }
}