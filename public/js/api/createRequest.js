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

        if (data) {
            for (let key in data) {
                url.searchParams.set(key, data[key]);
            };
        };
    } else {
        formData = new FormData();

        if (data) {
            for (let key in data) {
                formData.append(key, data[key]);
            };
        };    
    };    

    try {
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.send(formData);
    } catch (e) {
        // перехват сетевой ошибки
        callback(e);
    }    

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            callback(null, xhr.response);
        } else {
            callback(xhr.statustext, null);
        }
    }); 
};