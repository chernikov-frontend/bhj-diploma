/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let { url, method, data, callback } = options;
    let formData;

    if (method.toUpperCase() === 'GET') {
        const currentUrl = window.location.href;
        url = new URL(currentUrl.slice(0, -1) + url);
        // url = new URL(url);
        // console.log(url)


        if (data) {
            for ( let key in data ) {
                url.searchParams.append(key, data[key]);
            }
        } else {
            formData = new FormData();
            for ( let key in data ) {
                formData.append(key, data[key]);
            }
        }
    }

    try {
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.send(formData);
    } catch (e) {
        callback(e);
    }

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            callback(null, xhr.response);
        } else {
            callback(xhr.statusText, null);
        }
    });
}

// createRequest({
//     url: '/user/current',
//     method: 'GET',
//     data: {
//         email: 'demo@demo',
//         password: 'demo'
//     },
//     callback: (e,r) => {
//         console.log(e,r)
//     }
// })