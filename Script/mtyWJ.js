
// 转换时间: 2024/6/10 11:17:11
// 兼容性转换
if (typeof $request !== 'undefined') {
  const lowerCaseRequestHeaders = Object.fromEntries(
    Object.entries($request.headers).map(([k, v]) => [k.toLowerCase(), v])
  );

  $request.headers = new Proxy(lowerCaseRequestHeaders, {
    get: function (target, propKey, receiver) {
      return Reflect.get(target, propKey.toLowerCase(), receiver);
    },
    set: function (target, propKey, value, receiver) {
      return Reflect.set(target, propKey.toLowerCase(), value, receiver);
    },
  });
}
if (typeof $response !== 'undefined') {
  const lowerCaseResponseHeaders = Object.fromEntries(
    Object.entries($response.headers).map(([k, v]) => [k.toLowerCase(), v])
  );

  $response.headers = new Proxy(lowerCaseResponseHeaders, {
    get: function (target, propKey, receiver) {
      return Reflect.get(target, propKey.toLowerCase(), receiver);
    },
    set: function (target, propKey, value, receiver) {
      return Reflect.set(target, propKey.toLowerCase(), value, receiver);
    },
  });
}
Object.getOwnPropertyNames($httpClient).forEach(method => {
  if(typeof $httpClient[method] === 'function') {
    $httpClient[method] = new Proxy($httpClient[method], {
      apply: (target, ctx, args) => {
        for (let field in args?.[0]?.headers) {
          if (['host'].includes(field.toLowerCase())) {
            delete args[0].headers[field];
          } else if (['number'].includes(typeof args[0].headers[field])) {
            args[0].headers[field] = args[0].headers[field].toString();
          }
        }
        return Reflect.apply(target, ctx, args);
      }
    });
  }
})


// QX 相关
var setInterval = () => {}
var clearInterval = () => {}
var $task = {
  fetch: url => {
    return new Promise((resolve, reject) => {
      if (url.method == 'POST') {
        $httpClient.post(url, (error, response, data) => {
          if (response) {
            response.body = data
            resolve(response, {
              error: error,
            })
          } else {
            resolve(null, {
              error: error,
            })
          }
        })
      } else {
        $httpClient.get(url, (error, response, data) => {
          if (response) {
            response.body = data
            resolve(response, {
              error: error,
            })
          } else {
            resolve(null, {
              error: error,
            })
          }
        })
      }
    })
  },
}

var $prefs = {
  removeValueForKey: key => {
    let result
    try {
      result = $persistentStore.write('', key)
    } catch (e) {
    }
    if ($persistentStore.read(key) == null) return result
    try {
      result = $persistentStore.write(null, key)
    } catch (e) {
    }
    if ($persistentStore.read(key) == null) return result
    const err = '无法模拟 removeValueForKey 删除 key: ' + key
    console.log(err)
    $notification.post('Script Hub: 脚本转换', '❌ %E7%8C%AB%E5%A4%B4%E9%B9%B0%E6%96%87%E4%BB%B6.js.txt', err)
    return result
  },
  valueForKey: key => {
    return $persistentStore.read(key)
  },
  setValueForKey: (val, key) => {
    return $persistentStore.write(val, key)
  },
}

var $notify = (title = '', subt = '', desc = '', opts) => {
  const toEnvOpts = (rawopts) => {
    if (!rawopts) return rawopts 
    if (typeof rawopts === 'string') {
      if ('undefined' !== typeof $loon) return rawopts
      else if('undefined' !== typeof $rocket) return rawopts
      else return { url: rawopts }
    } else if (typeof rawopts === 'object') {
      if ('undefined' !== typeof $loon) {
        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
        return { openUrl, mediaUrl }
      } else {
        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
        if('undefined' !== typeof $rocket) return openUrl
        return { url: openUrl }
      }
    } else {
      return undefined
    }
  }
  console.log(title, subt, desc, toEnvOpts(opts))
  $notification.post(title, subt, desc, toEnvOpts(opts))
}
var _scriptSonverterOriginalDone = $done
var _scriptSonverterDone = (val = {}) => {
  let result
  if (
    (typeof $request !== 'undefined' &&
    typeof val === 'object' &&
    typeof val.status !== 'undefined' &&
    typeof val.headers !== 'undefined' &&
    typeof val.body !== 'undefined') || false
  ) {
    try {
      for (const part of val?.status?.split(' ')) {
        const statusCode = parseInt(part, 10)
        if (!isNaN(statusCode)) {
          val.status = statusCode
          break
        }
      }
    } catch (e) {}
    if (!val.status) {
      val.status = 200
    }
    if (!val.headers) {
      val.headers = {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      }
    }
    result = { response: val }
  } else {
    result = val
  }
  console.log('$done')
  try {
    console.log(JSON.stringify(result))
  } catch (e) {
    console.log(result)
  }
  _scriptSonverterOriginalDone(result)
}
var window = globalThis
window.$done = _scriptSonverterDone
var global = globalThis
global.$done = _scriptSonverterDone

/*

商店下载：猫头鹰文件


TG频道:https://t.me/iosapp520

ios鸡神破解

功能解锁永久vip



[rewrite_local]

^https:\/\/www\.skyjos\.cn:58080\/ws\/loadaccountinfo$ url script-response-body https://raw.githubusercontent.com/gjwj666/qx/main/mtyWJ.js

[mitm]

hostname = www.skyjos.cn:58080



*/

var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxf7211=["\x62\x6F\x64\x79","\x70\x61\x72\x73\x65","","\x6F\x31\x4F\x77\x34\x36\x39\x4F\x35\x77\x59\x6A\x31\x35\x76\x2D\x70\x30\x41\x30\x7A\x44\x70\x56\x61\x79\x79\x38\x40\x77\x78","\x69\x6F\x73\u9E21\u795E","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6C\x6F\x67","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];var body=$response[__Oxf7211[0x0]];let obj=JSON[__Oxf7211[0x1]]($response[__Oxf7211[0x0]]);obj= {"\x65\x72\x72\x6F\x72\x43\x6F\x64\x65":0,"\x73\x75\x63\x63":true,"\x65\x72\x72\x6F\x72\x4D\x65\x73\x73\x61\x67\x65":__Oxf7211[0x2],"\x75\x69\x64":5134,"\x65\x6D\x61\x69\x6C":__Oxf7211[0x3],"\x6D\x65\x6D\x62\x65\x72\x4C\x65\x76\x65\x6C":3,"\x65\x78\x70\x69\x72\x65\x41\x74":3658580856800,"\x65\x78\x74\x65\x72\x6E\x61\x6C\x55\x69\x64":__Oxf7211[0x2],"\x63\x6F\x6E\x6E\x65\x63\x74\x65\x64\x47\x6F\x6F\x67\x6C\x65":false,"\x63\x6F\x6E\x6E\x65\x63\x74\x65\x64\x41\x70\x70\x6C\x65":false,"\x63\x6F\x6E\x6E\x65\x63\x74\x65\x64\x57\x65\x69\x78\x69\x6E":true,"\x61\x63\x63\x6F\x75\x6E\x74\x52\x65\x67\x69\x73\x74\x54\x69\x6D\x65":0,"\x77\x69\x74\x68\x6F\x75\x74\x50\x61\x73\x73\x77\x64":true,"\x6C\x61\x73\x74\x50\x61\x73\x73\x77\x6F\x72\x64\x4D\x6F\x64\x69\x66\x69\x65\x64\x54\x69\x6D\x65":1678363788318,"\x64\x69\x73\x70\x4E\x61\x6D\x65":__Oxf7211[0x4]};_scriptSonverterDone({body:JSON[__Oxf7211[0x5]](obj)});;;(function(_0x3e6dx3,_0x3e6dx4,_0x3e6dx5,_0x3e6dx6,_0x3e6dx7,_0x3e6dx8){_0x3e6dx8= __Oxf7211[0x6];_0x3e6dx6= function(_0x3e6dx9){if( typeof alert!== _0x3e6dx8){alert(_0x3e6dx9)};if( typeof console!== _0x3e6dx8){console[__Oxf7211[0x7]](_0x3e6dx9)}};_0x3e6dx5= function(_0x3e6dxa,_0x3e6dx3){return _0x3e6dxa+ _0x3e6dx3};_0x3e6dx7= _0x3e6dx5(__Oxf7211[0x8],_0x3e6dx5(_0x3e6dx5(__Oxf7211[0x9],__Oxf7211[0xa]),__Oxf7211[0xb]));try{_0x3e6dx3= __encode;if(!( typeof _0x3e6dx3!== _0x3e6dx8&& _0x3e6dx3=== _0x3e6dx5(__Oxf7211[0xc],__Oxf7211[0xd]))){_0x3e6dx6(_0x3e6dx7)}}catch(e){_0x3e6dx6(_0x3e6dx7)}})({})
