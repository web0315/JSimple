/**
 * 自动发送 jsonp
 * @param {String} url
 * @param {Obj} data
 * @param {Function} callback
 */
function jsonp (url, data, callback) {
    var funcName = getFunctionName()
    data = data || {}
    data.callback = funcName
    url = parseUrl(url, serialize(data))
  
    window[funcName] = function (response) {
      // 这里可以看情况处理，比如如果是 jsonp 我们可以 parse 一下
      // data = JSON.parse(response)
      callback(response)
    }
  
    createScript(url)
  }
  
  /**
   * 序列化参数
   * jsonp 中参数只能是 GET 方式传递
   * @param {Obj} data
   */
  function serialize (data) {
    var ret = []
  
    Object.keys(data).forEach(item => {
      ret.push(encodeURIComponent(item) + '=' + encodeURIComponent(data[item]))
    })
    console.log("web add"+ret.join('&'))
    return ret.join('&')
  }
  
  /**
   * 处理 URL ，把参数拼上来
   * @param {String} url
   * @param {String} param
   */
  function parseUrl (url, param) {
    return url + (url.indexOf('?') === -1 ? '?' : '&') + param
  }
  
  /**
   * 这里就是对 jsonp 的理解了，必须要有一个全局函数，而且不能重名
   */
  function getFunctionName () {
    return ('jsonp_' + Math.random()).replace('.', '')
  }
  
  /**
   * 创建 script 标签并插到 body 中
   * @param {String} url
   */
  function createScript (url) {
    var doc = document
    var script = doc.createElement('script')
    script.src = url
  
    doc.body.appendChild(script)
  }