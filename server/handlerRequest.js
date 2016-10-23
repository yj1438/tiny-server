'use strict';

import route from './lib/route';
import httpError from './lib/httpError';
import StaticContent from './lib/StaticContent';

// import Index from './controllers/index';

//===如果有未处理的异常抛出，可以在这里捕获到
//process.on('uncaughtException', function (err) {
//    console.log(err);
//});
//===

/**
 * 所有请求的统一入口
 */
export default (req, res) => {
    const actionInfo = route.getActionInfo(req.url, req.method);
    if (actionInfo.controller && actionInfo.action) {
        const Controller = require('./controllers/' + actionInfo.controller);
        console.log(Controller);
        try {
            /**
             * 這個地方有點糾結，也是整個ES6換的最LOW的地方
             * babel 構建後 require 的是已經改變過後的 class
             * 所以這個地方需要 new Controller.default 而不是正常的 new Controller
             */
            const controllerContext = new Controller.default(req, res);
            controllerContext[actionInfo.action]();
        } catch (err) {
            console.log(err);
            httpError.handler500(req, res, 'ERROR: controller "' + actionInfo.controller + '" without action "' + actionInfo.action + '"');
        }
    } else {
        const staticContent = new StaticContent(req, res);
        staticContent.handle();
    }
} 