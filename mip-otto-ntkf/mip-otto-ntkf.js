/**
 * @file: mip-otto-ntkf 网校小能客服
 * @author: xinbao (fa@ijust.cc)
 * @Date: 2018-07-23
 */
define(function (require) {
    var util = require('util');
    var Gesture = util.Gesture;
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    customElement.prototype.build = function () {

        var element = this.element;
        var gesture = new Gesture(element);
        window.NTKF;

        function loadJs(url) {
            if (/^(https?:)?\/\//gi.test(url)) {
                var myHead = document.querySelector('head');
                var myScript = document.createElement('script');
                myScript.type = 'text/javascript';
                myScript.src = url;
                myHead.appendChild(myScript);
            }
        }
        var siteid = element.getAttribute('siteid') || 'kf_9009';
        var settingid = element.getAttribute('kfid') || 'kf_9009_1497510869857';
        var sign = element.getAttribute('sign');
        if (sign) {
            var url = 'http://wap.wangxiao.cn/Pub/GetNtalkerSettingIdBySign?sign=' + sign;
            fetchJsonp(url, {
                jsonpCallbackFunction: 'cb'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.ResultCode === 0) {
                    NTKF_PARAM.settingid = data.Data.NtalkerSettingId;
                }

            });
        }
        else {
            NTKF_PARAM.settingid = settingid;
        }
        var NTKF_PARAM = {
            siteid: siteid,
            uid: '',
            uname: '',
            userlevel: '0'
        };
        // 新增接口的逻辑

        var script4kf = document.createElement('script');
        script4kf.text = 'var NTKF_PARAM =' + JSON.stringify(NTKF_PARAM);
        script4kf.type = 'text/javascript';
        document.querySelector('head').appendChild(script4kf);

        // 此处引用小能客服js，由第三方提供服务支持，暂时无法做进一步封装
        loadJs('//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=' + NTKF_PARAM.siteid);
        gesture.on('tap', function (event, data) {
            window.NTKF.im_openInPageChat(NTKF_PARAM.settingid);
        });
    };

    return customElement;
});
