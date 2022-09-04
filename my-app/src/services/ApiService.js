import Axios from 'axios';

export const reqWithoutBody = async (url, method) => {
    const res = await Axios ({
        method: method,
        url: `https://pcfy.redberryinternship.ge/api/${url}`
    })
    const data = await res.data;
    return data;
}

export const reqWithBody = async (url, method, token, id) => {
    let link = id?`${url}/${id}?token=${token}`:`${url}?token=${token}`;

    try {
        const res = await Axios({
            method,
            url:`https://pcfy.redberryinternship.ge/api/${link}`
        });

        const data = await res.data;
        return data;
    } catch (err) {
        console.warn(err);
    }
}

export const postRequest = (body) => {
    Axios.post('https://pcfy.redberryinternship.ge/api/laptop/create', body)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}