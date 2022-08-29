import Axios from 'axios';

export const reqWithoutBody = async (url, method) => {
    const res = await Axios ({
        method: method,
        url: `https://pcfy.redberryinternship.ge/api/${url}`
    })
    const data = await res.data;
    return data;
}
