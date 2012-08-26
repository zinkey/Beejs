/* BeeJs v1.0.0 MIT Licensed */
/**
 * @overview commonjs module creator
 * @author yaya@uloveit.com.cn
 */
(function(){
/*tangram http://tangram.baidu.com*/
var T,baidu=T=baidu||{version:"1.3.9"};baidu.guid="$BAIDU$";window[baidu.guid]=window[baidu.guid]||{};baidu.ajax=baidu.ajax||{};baidu.fn=baidu.fn||{};baidu.fn.blank=function(){};baidu.ajax.request=function(f,j){var d=j||{},q=d.data||"",g=!(d.async===false),e=d.username||"",a=d.password||"",c=(d.method||"GET").toUpperCase(),b=d.headers||{},i=d.timeout||0,k={},n,r,h;function m(){if(h.readyState==4){try{var t=h.status}catch(s){p("failure");return}p(t);if((t>=200&&t<300)||t==304||t==1223){p("success")}else{p("failure")}window.setTimeout(function(){h.onreadystatechange=baidu.fn.blank;if(g){h=null}},0)}}function l(){if(window.ActiveXObject){try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(s){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(s){}}}if(window.XMLHttpRequest){return new XMLHttpRequest()}}function p(u){u="on"+u;var t=k[u],v=baidu.ajax[u];if(t){if(n){clearTimeout(n)}if(u!="onsuccess"){t(h)}else{try{h.responseText}catch(s){return t(h)}t(h,h.responseText)}}else{if(v){if(u=="onsuccess"){return}v(h)}}}for(r in d){k[r]=d[r]}b["X-Requested-With"]="XMLHttpRequest";try{h=l();if(c=="GET"){if(q){f+=(f.indexOf("?")>=0?"&":"?")+q;q=null}if(d.noCache){f+=(f.indexOf("?")>=0?"&":"?")+"b"+(+new Date)+"=1"}}if(e){h.open(c,f,g,e,a)}else{h.open(c,f,g)}if(g){h.onreadystatechange=m}if(c=="POST"){h.setRequestHeader("Content-Type",(b["Content-Type"]||"application/x-www-form-urlencoded"))}for(r in b){if(b.hasOwnProperty(r)){h.setRequestHeader(r,b[r])}}p("beforerequest");if(i){n=setTimeout(function(){h.onreadystatechange=baidu.fn.blank;h.abort();p("timeout")},i)}h.send(q);if(!g){m()}}catch(o){p("failure")}return h};
    var Modules = {};
    var def = function(name,module){
        Modules[name] = module;
    };
    var getModule = function(name){
        return Modules[name]||function(){};
    };
    var run = function(name){
        baidu.ajax.request(name+".js",{
            async:false,
            onsuccess:function(xhr,resonpseText){
                resonpseText.replace(/require\(\s*['"]?([^'"]*)['"]?\s*\)/g,function(a,b){
                    run(b);
                });
                (new Function('var def=arguments[0];def("'+name+'",function(exports){'+resonpseText+'});'))(def);
            }
        });
        var exports = {};
        //getModule(name)(exports);
        Modules[name](exports);
        return exports;
    };
    window['require'] = run;
})();