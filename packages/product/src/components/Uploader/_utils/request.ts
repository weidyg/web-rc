import { UploadProgressEvent, UploadRequestError, UploadRequestOption, UploadResponseBody } from "../typing";

function getError(option: UploadRequestOption, xhr: XMLHttpRequest, errMsg?: string) {
    const msg = errMsg || `cannot ${option.method} ${option.action} ${xhr.status}'`;
    const err = new Error(msg) as UploadRequestError;
    err.status = xhr.status;
    err.method = option.method;
    err.url = option.action;
    return err;
}
function getBody<T extends UploadResponseBody>(option: UploadRequestOption<T>, xhr: XMLHttpRequest): T {
    const text = xhr.responseText || xhr.response;
    if (!text) { return text; }
    try {
        const bodyJson = JSON.parse(text);
        const body = option?.normalize?.responseBody?.(bodyJson) || bodyJson;
        return body;
    } catch (e) {
        const body: UploadResponseBody = { error: { message: text } };
        return body as T;
    }
}

export default function uploadRequest<T extends UploadResponseBody>(
    option: UploadRequestOption<T>
) {
    const xhr = new XMLHttpRequest();
    if (option.onProgress && xhr.upload) {
        xhr.upload.onprogress = function progress(e: UploadProgressEvent) {
            const { total = 0, loaded = 0 } = e;
            if (total > 0) { e.percent = (loaded / total) * 100; }
            option.onProgress?.(e);
        };
    }
    const formData = new FormData();
    if (option.data) {
        Object.keys(option.data).forEach(key => {
            const value = option.data?.[key];
            if (Array.isArray(value)) {
                value.forEach(item => {
                    formData.append(`${key}[]`, item);
                });
                return;
            }
            formData.append(key, value as string | Blob);
        });
    }

    const { file, filename = 'file' } = option;
    if (file instanceof Blob) {
        formData.append(filename, file, (file as any).name);
    } else {
        formData.append(filename, file);
    }

    xhr.onerror = function error(e) {
        // console.log('error', xhr, e);
        option.onError?.(e);
    };

    xhr.onload = function onload() {
        // console.log('onload', xhr);
        // allow success when 2xx status
        // see https://github.com/react-component/upload/issues/34
        const body = getBody(option, xhr);
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError?.(getError(option, xhr), body);
        } else if (body.error) {
            return option.onError?.(getError(option, xhr, body?.error?.message), body);
        }
        return option.onSuccess?.(body, xhr);
    };

    xhr.open(option.method, option.action, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};
    // when set headers['X-Requested-With'] = null , can close default XHR header
    // see https://github.com/react-component/upload/issues/33
    if (headers['X-Requested-With'] !== null) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    Object.keys(headers).forEach(h => {
        if (headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    });

    xhr.send(formData);

    return {
        abort() {
            xhr.abort();
        },
    };
}