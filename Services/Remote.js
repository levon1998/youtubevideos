import {
    HTTP_OK,
    HTTP_NOT_FOUND,
    HTTP_FORBIDDEN,
    HTTP_INTERNAL_SERVER_ERROR,
} from '../Utils/StatusCodes';

import {
    SERVER_ERROR,
    UNKNOWN_ERROR,
    FORBIDDEN_ERROR,
    PAGE_NOT_FOUND_ERROR,
} from '../Utils/ErrorTypes';

import { METHOD_GET } from '../Utils/HttpMethods';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

function getErrorFromResponse (response, statusCode) {
    let error = {
        type: UNKNOWN_ERROR,
        message: DEFAULT_ERROR_MESSAGE
    }
    if (statusCode === HTTP_NOT_FOUND) {
        error.type = PAGE_NOT_FOUND_ERROR;
        error.message = `The page you're looking for can't be found.`;
    } else if (statusCode === HTTP_FORBIDDEN) {
        error.type = FORBIDDEN_ERROR;
        error.message = `You have not sufficient privileges to view that resource.`;
    } else if (statusCode === HTTP_FORBIDDEN) {
        error.type = HTTP_FORBIDDEN;
        error.message = `Http forbidden`;
    } else if (statusCode >= HTTP_INTERNAL_SERVER_ERROR) {
        error.type = SERVER_ERROR;
        error.message = DEFAULT_ERROR_MESSAGE;
        console.error('Got server error', response, statusCode);
    } else {
        console.warn('Got wrong status code from server', response, statusCode);
    }
    return error;
}

export default function* request (options) {
    const url = `https://www.googleapis.com${options.route}`;
    delete options.route;

    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json';
    options.credentials = 'include';

    let statusCode;
    const returnData = {
        success: false,
        data: {},
        error: {}
    };

    return yield fetch (url, options)
        .then(response => {
            statusCode = response.status;
            if (statusCode === HTTP_OK) {
                returnData.success = true;
            }
            if (statusCode >= 400){
                returnData.success = false;
                return returnData;
            }
            return response.json()
                .catch(err => {
                    if (options.method === METHOD_GET) {
                        throw err;
                    } else {
                        console.warn('Invalid json response received.', err);
                        return '';
                    }
                })
        })
        .then(response => {
            if (returnData.success) {
                returnData.data = response;
            } else {
                returnData.error = getErrorFromResponse(response, statusCode)
            }
            return returnData;
        })
        .catch(error => {
            returnData.success = false;
            returnData.error.type = UNKNOWN_ERROR;
            returnData.error.message = DEFAULT_ERROR_MESSAGE;
            console.error(error);
            return returnData;
        })
}