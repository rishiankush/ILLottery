'use strict';

const localhost     = "localhost:3000",
    staging         = "xyz:4000";

const running_url   = staging,
    http_url        = `http://${running_url}`,
    socket_url      = `ws://${running_url}/websocket`,
    apiBase_url     = `http://${running_url}/rest/v1/`,
    staticPagesUrl  = `http://${running_url}/`,
    mediaBase_url   = `http://${running_url}/store/files/uploads/`;

export default class Connection {
    static getResturl() {
        return apiBase_url;
    };

    static getSocketResturl() {
        return socket_url;
    };

    static getBaseUrl() {
        return http_url;
    };

    static getMedia(_id) {
        return mediaBase_url + _id;
    }

    static getStaticPage(url){
        return staticPagesUrl + url;
    }
}