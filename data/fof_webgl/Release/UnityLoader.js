function LoadJSCodeBlob(e,t){var o=document.createElement("script");o.src=URL.createObjectURL(e),o.onload=t,document.body.appendChild(o)}function LoadJSCode(e,t){var o=new Blob([e],{type:"text/javascript"});if(Math.fround&&-1==browser.indexOf("Chrome"))LoadJSCodeBlob(o,t);else{console.log("optimizing out Math.fround calls");var n=new FileReader;n.onload=function(e){var o=e.target.result.replace(/Math_fround\(/g,"("),n=new Blob([o],{type:"text/javascript"});LoadJSCodeBlob(n,t)},n.readAsText(o)}}function DecompressAndLoadFile(e,t,o){tryServerCompression=!1,e+="gz";var n=new XMLHttpRequest;n.open("GET",e,!0),n.onprogress=o,n.responseType="arraybuffer",n.onload=function(){var o=new Uint8Array(n.response),r=(new Date).getTime(),a=pako.inflate(o),i=(new Date).getTime();console.log("Decompressed "+e+" in "+(i-r)+"ms. You can remove this delay if you configure your web server to host files using gzip compression."),t(a)},n.send(null)}function LoadCompressedFile(e,t,o){if(CompressionState.current==CompressionState.Unsupported)return void DecompressAndLoadFile(e,t);if(CompressionState.current==CompressionState.Pending)return void CompressionState.pendingServerRequests.push(function(){LoadCompressedFile(e,t,o)});CompressionState.current==CompressionState.Uninitialized&&(CompressionState.current=CompressionState.Pending);var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onprogress=function(e){o&&o(e),CompressionState.current==CompressionState.Pending&&(0==n.status||200==n.status?CompressionState.Set(CompressionState.Supported):CompressionState.Set(CompressionState.Unsupported))},n.onload=function(){if(0==n.status||200==n.status){CompressionState.Set(CompressionState.Supported);var r=new Uint8Array(n.response);t(r)}else CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,o)},n.onerror=function(){CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,o)};try{n.send(null)}catch(r){CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,t,o)}}function LoadCompressedJS(e,t){LoadCompressedFile(e,function(e){LoadJSCode(e,t)})}function fetchRemotePackageWrapper(e,t,o,n){LoadCompressedFile(e,o,function(o){var n=e,r=t;if(o.total&&(r=o.total),o.loaded){Module.dataFileDownloads||(Module.dataFileDownloads={}),Module.dataFileDownloads[n]={loaded:o.loaded,total:r};var a=0,i=0,s=0;for(var l in Module.dataFileDownloads){var d=Module.dataFileDownloads[l];a+=d.total,i+=d.loaded,s++}a=Math.ceil(a*Module.expectedDataFileDownloads/s),Module.setStatus&&Module.setStatus("Downloading data... ("+i+"/"+a+")")}else Module.dataFileDownloads||Module.setStatus&&Module.setStatus("Downloading data...")})}function CompatibilityCheck(){hasWebGL?mobile?confirm("Please note that Unity WebGL is not currently supported on mobiles. Press Ok if you wish to continue anyway.")||window.history.back():-1==browser.indexOf("Firefox")&&-1==browser.indexOf("Chrome")&&-1==browser.indexOf("Safari")&&(confirm("Please note that your browser is not currently supported for this Unity WebGL content. Try installing Firefox, or press Ok if you wish to continue anyway.")||window.history.back()):(alert("You need a browser which supports WebGL to run this content. Try installing Firefox."),window.history.back())}function SetFullscreen(e){if("undefined"==typeof JSEvents)return void console.log("Player not loaded yet.");var t=JSEvents.canPerformEventHandlerRequests;JSEvents.canPerformEventHandlerRequests=function(){return 1},Module.cwrap("SetFullscreen","void",["number"])(e),JSEvents.canPerformEventHandlerRequests=t}var CompressionState={Uninitialized:0,Pending:1,Unsupported:2,Supported:3,current:0,pendingServerRequests:[],Set:function(e){if(CompressionState.current==CompressionState.Pending){CompressionState.current=e;for(var t=0;t<CompressionState.pendingServerRequests.length;t++)CompressionState.pendingServerRequests[t]()}}};Module.memoryInitializerRequest={response:null,callback:null,addEventListener:function(e,t){if("load"!=e)throw"Unexpected type "+e;this.callback=t}},LoadCompressedJS(Module.codeUrl),LoadCompressedFile(Module.memUrl,function(e){Module.memoryInitializerRequest.response=e,Module.memoryInitializerRequest.callback&&Module.memoryInitializerRequest.callback()}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.pako=e()}}(function(){return function e(t,o,n){function r(i,s){if(!o[i]){if(!t[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(a)return a(i,!0);var d=new Error("Cannot find module '"+i+"'");throw d.code="MODULE_NOT_FOUND",d}var u=o[i]={exports:{}};t[i][0].call(u.exports,function(e){var o=t[i][1][e];return r(o?o:e)},u,u.exports,e,t,o,n)}return o[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)r(n[i]);return r}({1:[function(e,t,o){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;o.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var o=t.shift();if(o){if("object"!=typeof o)throw new TypeError(o+"must be non-object");for(var n in o)o.hasOwnProperty(n)&&(e[n]=o[n])}}return e},o.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var r={arraySet:function(e,t,o,n,r){if(t.subarray&&e.subarray)return void e.set(t.subarray(o,o+n),r);for(var a=0;n>a;a++)e[r+a]=t[o+a]},flattenChunks:function(e){var t,o,n,r,a,i;for(n=0,t=0,o=e.length;o>t;t++)n+=e[t].length;for(i=new Uint8Array(n),r=0,t=0,o=e.length;o>t;t++)a=e[t],i.set(a,r),r+=a.length;return i}},a={arraySet:function(e,t,o,n,r){for(var a=0;n>a;a++)e[r+a]=t[o+a]},flattenChunks:function(e){return[].concat.apply([],e)}};o.setTyped=function(e){e?(o.Buf8=Uint8Array,o.Buf16=Uint16Array,o.Buf32=Int32Array,o.assign(o,r)):(o.Buf8=Array,o.Buf16=Array,o.Buf32=Array,o.assign(o,a))},o.setTyped(n)},{}],2:[function(e,t,o){"use strict";function n(e,t){if(65537>t&&(e.subarray&&i||!e.subarray&&a))return String.fromCharCode.apply(null,r.shrinkBuf(e,t));for(var o="",n=0;t>n;n++)o+=String.fromCharCode(e[n]);return o}var r=e("./common"),a=!0,i=!0;try{String.fromCharCode.apply(null,[0])}catch(s){a=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(s){i=!1}for(var l=new r.Buf8(256),d=0;256>d;d++)l[d]=d>=252?6:d>=248?5:d>=240?4:d>=224?3:d>=192?2:1;l[254]=l[254]=1,o.string2buf=function(e){var t,o,n,a,i,s=e.length,l=0;for(a=0;s>a;a++)o=e.charCodeAt(a),55296===(64512&o)&&s>a+1&&(n=e.charCodeAt(a+1),56320===(64512&n)&&(o=65536+(o-55296<<10)+(n-56320),a++)),l+=128>o?1:2048>o?2:65536>o?3:4;for(t=new r.Buf8(l),i=0,a=0;l>i;a++)o=e.charCodeAt(a),55296===(64512&o)&&s>a+1&&(n=e.charCodeAt(a+1),56320===(64512&n)&&(o=65536+(o-55296<<10)+(n-56320),a++)),128>o?t[i++]=o:2048>o?(t[i++]=192|o>>>6,t[i++]=128|63&o):65536>o?(t[i++]=224|o>>>12,t[i++]=128|o>>>6&63,t[i++]=128|63&o):(t[i++]=240|o>>>18,t[i++]=128|o>>>12&63,t[i++]=128|o>>>6&63,t[i++]=128|63&o);return t},o.buf2binstring=function(e){return n(e,e.length)},o.binstring2buf=function(e){for(var t=new r.Buf8(e.length),o=0,n=t.length;n>o;o++)t[o]=e.charCodeAt(o);return t},o.buf2string=function(e,t){var o,r,a,i,s=t||e.length,d=new Array(2*s);for(r=0,o=0;s>o;)if(a=e[o++],128>a)d[r++]=a;else if(i=l[a],i>4)d[r++]=65533,o+=i-1;else{for(a&=2===i?31:3===i?15:7;i>1&&s>o;)a=a<<6|63&e[o++],i--;i>1?d[r++]=65533:65536>a?d[r++]=a:(a-=65536,d[r++]=55296|a>>10&1023,d[r++]=56320|1023&a)}return n(d,r)},o.utf8border=function(e,t){var o;for(t=t||e.length,t>e.length&&(t=e.length),o=t-1;o>=0&&128===(192&e[o]);)o--;return 0>o?t:0===o?t:o+l[e[o]]>t?o:t}},{"./common":1}],3:[function(e,t,o){"use strict";function n(e,t,o,n){for(var r=65535&e|0,a=e>>>16&65535|0,i=0;0!==o;){i=o>2e3?2e3:o,o-=i;do r=r+t[n++]|0,a=a+r|0;while(--i);r%=65521,a%=65521}return r|a<<16|0}t.exports=n},{}],4:[function(e,t,o){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],5:[function(e,t,o){"use strict";function n(){for(var e,t=[],o=0;256>o;o++){e=o;for(var n=0;8>n;n++)e=1&e?3988292384^e>>>1:e>>>1;t[o]=e}return t}function r(e,t,o,n){var r=a,i=n+o;e=-1^e;for(var s=n;i>s;s++)e=e>>>8^r[255&(e^t[s])];return-1^e}var a=n();t.exports=r},{}],6:[function(e,t,o){"use strict";function n(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=n},{}],7:[function(e,t,o){"use strict";var n=30,r=12;t.exports=function(e,t){var o,a,i,s,l,d,u,c,f,h,p,m,w,b,g,v,k,y,_,x,S,M,C,E,R;o=e.state,a=e.next_in,E=e.input,i=a+(e.avail_in-5),s=e.next_out,R=e.output,l=s-(t-e.avail_out),d=s+(e.avail_out-257),u=o.dmax,c=o.wsize,f=o.whave,h=o.wnext,p=o.window,m=o.hold,w=o.bits,b=o.lencode,g=o.distcode,v=(1<<o.lenbits)-1,k=(1<<o.distbits)-1;e:do{15>w&&(m+=E[a++]<<w,w+=8,m+=E[a++]<<w,w+=8),y=b[m&v];t:for(;;){if(_=y>>>24,m>>>=_,w-=_,_=y>>>16&255,0===_)R[s++]=65535&y;else{if(!(16&_)){if(0===(64&_)){y=b[(65535&y)+(m&(1<<_)-1)];continue t}if(32&_){o.mode=r;break e}e.msg="invalid literal/length code",o.mode=n;break e}x=65535&y,_&=15,_&&(_>w&&(m+=E[a++]<<w,w+=8),x+=m&(1<<_)-1,m>>>=_,w-=_),15>w&&(m+=E[a++]<<w,w+=8,m+=E[a++]<<w,w+=8),y=g[m&k];o:for(;;){if(_=y>>>24,m>>>=_,w-=_,_=y>>>16&255,!(16&_)){if(0===(64&_)){y=g[(65535&y)+(m&(1<<_)-1)];continue o}e.msg="invalid distance code",o.mode=n;break e}if(S=65535&y,_&=15,_>w&&(m+=E[a++]<<w,w+=8,_>w&&(m+=E[a++]<<w,w+=8)),S+=m&(1<<_)-1,S>u){e.msg="invalid distance too far back",o.mode=n;break e}if(m>>>=_,w-=_,_=s-l,S>_){if(_=S-_,_>f&&o.sane){e.msg="invalid distance too far back",o.mode=n;break e}if(M=0,C=p,0===h){if(M+=c-_,x>_){x-=_;do R[s++]=p[M++];while(--_);M=s-S,C=R}}else if(_>h){if(M+=c+h-_,_-=h,x>_){x-=_;do R[s++]=p[M++];while(--_);if(M=0,x>h){_=h,x-=_;do R[s++]=p[M++];while(--_);M=s-S,C=R}}}else if(M+=h-_,x>_){x-=_;do R[s++]=p[M++];while(--_);M=s-S,C=R}for(;x>2;)R[s++]=C[M++],R[s++]=C[M++],R[s++]=C[M++],x-=3;x&&(R[s++]=C[M++],x>1&&(R[s++]=C[M++]))}else{M=s-S;do R[s++]=R[M++],R[s++]=R[M++],R[s++]=R[M++],x-=3;while(x>2);x&&(R[s++]=R[M++],x>1&&(R[s++]=R[M++]))}break}}break}}while(i>a&&d>s);x=w>>3,a-=x,w-=x<<3,m&=(1<<w)-1,e.next_in=a,e.next_out=s,e.avail_in=i>a?5+(i-a):5-(a-i),e.avail_out=d>s?257+(d-s):257-(s-d),o.hold=m,o.bits=w}},{}],8:[function(e,t,o){"use strict";function n(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function r(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new b.Buf16(320),this.work=new b.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=O,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new b.Buf32(pe),t.distcode=t.distdyn=new b.Buf32(me),t.sane=1,t.back=-1,R):A}function i(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,a(e)):A}function s(e,t){var o,n;return e&&e.state?(n=e.state,0>t?(o=0,t=-t):(o=(t>>4)+1,48>t&&(t&=15)),t&&(8>t||t>15)?A:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=o,n.wbits=t,i(e))):A}function l(e,t){var o,n;return e?(n=new r,e.state=n,n.window=null,o=s(e,t),o!==R&&(e.state=null),o):A}function d(e){return l(e,be)}function u(e){if(ge){var t;for(m=new b.Buf32(512),w=new b.Buf32(32),t=0;144>t;)e.lens[t++]=8;for(;256>t;)e.lens[t++]=9;for(;280>t;)e.lens[t++]=7;for(;288>t;)e.lens[t++]=8;for(y(x,e.lens,0,288,m,0,e.work,{bits:9}),t=0;32>t;)e.lens[t++]=5;y(S,e.lens,0,32,w,0,e.work,{bits:5}),ge=!1}e.lencode=m,e.lenbits=9,e.distcode=w,e.distbits=5}function c(e,t,o,n){var r,a=e.state;return null===a.window&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new b.Buf8(a.wsize)),n>=a.wsize?(b.arraySet(a.window,t,o-a.wsize,a.wsize,0),a.wnext=0,a.whave=a.wsize):(r=a.wsize-a.wnext,r>n&&(r=n),b.arraySet(a.window,t,o-n,r,a.wnext),n-=r,n?(b.arraySet(a.window,t,o-n,n,0),a.wnext=n,a.whave=a.wsize):(a.wnext+=r,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=r))),0}function f(e,t){var o,r,a,i,s,l,d,f,h,p,m,w,pe,me,we,be,ge,ve,ke,ye,_e,xe,Se,Me,Ce=0,Ee=new b.Buf8(4),Re=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return A;o=e.state,o.mode===J&&(o.mode=K),s=e.next_out,a=e.output,d=e.avail_out,i=e.next_in,r=e.input,l=e.avail_in,f=o.hold,h=o.bits,p=l,m=d,xe=R;e:for(;;)switch(o.mode){case O:if(0===o.wrap){o.mode=K;break}for(;16>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(2&o.wrap&&35615===f){o.check=0,Ee[0]=255&f,Ee[1]=f>>>8&255,o.check=v(o.check,Ee,2,0),f=0,h=0,o.mode=z;break}if(o.flags=0,o.head&&(o.head.done=!1),!(1&o.wrap)||(((255&f)<<8)+(f>>8))%31){e.msg="incorrect header check",o.mode=ce;break}if((15&f)!==I){e.msg="unknown compression method",o.mode=ce;break}if(f>>>=4,h-=4,_e=(15&f)+8,0===o.wbits)o.wbits=_e;else if(_e>o.wbits){e.msg="invalid window size",o.mode=ce;break}o.dmax=1<<_e,e.adler=o.check=1,o.mode=512&f?H:J,f=0,h=0;break;case z:for(;16>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(o.flags=f,(255&o.flags)!==I){e.msg="unknown compression method",o.mode=ce;break}if(57344&o.flags){e.msg="unknown header flags set",o.mode=ce;break}o.head&&(o.head.text=f>>8&1),512&o.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,o.check=v(o.check,Ee,2,0)),f=0,h=0,o.mode=U;case U:for(;32>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}o.head&&(o.head.time=f),512&o.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,Ee[2]=f>>>16&255,Ee[3]=f>>>24&255,o.check=v(o.check,Ee,4,0)),f=0,h=0,o.mode=P;case P:for(;16>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}o.head&&(o.head.xflags=255&f,o.head.os=f>>8),512&o.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,o.check=v(o.check,Ee,2,0)),f=0,h=0,o.mode=Z;case Z:if(1024&o.flags){for(;16>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}o.length=f,o.head&&(o.head.extra_len=f),512&o.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,o.check=v(o.check,Ee,2,0)),f=0,h=0}else o.head&&(o.head.extra=null);o.mode=q;case q:if(1024&o.flags&&(w=o.length,w>l&&(w=l),w&&(o.head&&(_e=o.head.extra_len-o.length,o.head.extra||(o.head.extra=new Array(o.head.extra_len)),b.arraySet(o.head.extra,r,i,w,_e)),512&o.flags&&(o.check=v(o.check,r,w,i)),l-=w,i+=w,o.length-=w),o.length))break e;o.length=0,o.mode=G;case G:if(2048&o.flags){if(0===l)break e;w=0;do _e=r[i+w++],o.head&&_e&&o.length<65536&&(o.head.name+=String.fromCharCode(_e));while(_e&&l>w);if(512&o.flags&&(o.check=v(o.check,r,w,i)),l-=w,i+=w,_e)break e}else o.head&&(o.head.name=null);o.length=0,o.mode=N;case N:if(4096&o.flags){if(0===l)break e;w=0;do _e=r[i+w++],o.head&&_e&&o.length<65536&&(o.head.comment+=String.fromCharCode(_e));while(_e&&l>w);if(512&o.flags&&(o.check=v(o.check,r,w,i)),l-=w,i+=w,_e)break e}else o.head&&(o.head.comment=null);o.mode=j;case j:if(512&o.flags){for(;16>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(f!==(65535&o.check)){e.msg="header crc mismatch",o.mode=ce;break}f=0,h=0}o.head&&(o.head.hcrc=o.flags>>9&1,o.head.done=!0),e.adler=o.check=0,o.mode=J;break;case H:for(;32>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}e.adler=o.check=n(f),f=0,h=0,o.mode=W;case W:if(0===o.havedict)return e.next_out=s,e.avail_out=d,e.next_in=i,e.avail_in=l,o.hold=f,o.bits=h,F;e.adler=o.check=1,o.mode=J;case J:if(t===C||t===E)break e;case K:if(o.last){f>>>=7&h,h-=7&h,o.mode=le;break}for(;3>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}switch(o.last=1&f,f>>>=1,h-=1,3&f){case 0:o.mode=Y;break;case 1:if(u(o),o.mode=te,t===E){f>>>=2,h-=2;break e}break;case 2:o.mode=Q;break;case 3:e.msg="invalid block type",o.mode=ce}f>>>=2,h-=2;break;case Y:for(f>>>=7&h,h-=7&h;32>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if((65535&f)!==(f>>>16^65535)){e.msg="invalid stored block lengths",o.mode=ce;break}if(o.length=65535&f,f=0,h=0,o.mode=X,t===E)break e;case X:o.mode=V;case V:if(w=o.length){if(w>l&&(w=l),w>d&&(w=d),0===w)break e;b.arraySet(a,r,i,w,s),l-=w,i+=w,d-=w,s+=w,o.length-=w;break}o.mode=J;break;case Q:for(;14>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(o.nlen=(31&f)+257,f>>>=5,h-=5,o.ndist=(31&f)+1,f>>>=5,h-=5,o.ncode=(15&f)+4,f>>>=4,h-=4,o.nlen>286||o.ndist>30){e.msg="too many length or distance symbols",o.mode=ce;break}o.have=0,o.mode=$;case $:for(;o.have<o.ncode;){for(;3>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}o.lens[Re[o.have++]]=7&f,f>>>=3,h-=3}for(;o.have<19;)o.lens[Re[o.have++]]=0;if(o.lencode=o.lendyn,o.lenbits=7,Se={bits:o.lenbits},xe=y(_,o.lens,0,19,o.lencode,0,o.work,Se),o.lenbits=Se.bits,xe){e.msg="invalid code lengths set",o.mode=ce;break}o.have=0,o.mode=ee;case ee:for(;o.have<o.nlen+o.ndist;){for(;Ce=o.lencode[f&(1<<o.lenbits)-1],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=we);){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(16>ge)f>>>=we,h-=we,o.lens[o.have++]=ge;else{if(16===ge){for(Me=we+2;Me>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(f>>>=we,h-=we,0===o.have){e.msg="invalid bit length repeat",o.mode=ce;break}_e=o.lens[o.have-1],w=3+(3&f),f>>>=2,h-=2}else if(17===ge){for(Me=we+3;Me>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}f>>>=we,h-=we,_e=0,w=3+(7&f),f>>>=3,h-=3}else{for(Me=we+7;Me>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}f>>>=we,h-=we,_e=0,w=11+(127&f),f>>>=7,h-=7}if(o.have+w>o.nlen+o.ndist){e.msg="invalid bit length repeat",o.mode=ce;break}for(;w--;)o.lens[o.have++]=_e}}if(o.mode===ce)break;if(0===o.lens[256]){e.msg="invalid code -- missing end-of-block",o.mode=ce;break}if(o.lenbits=9,Se={bits:o.lenbits},xe=y(x,o.lens,0,o.nlen,o.lencode,0,o.work,Se),o.lenbits=Se.bits,xe){e.msg="invalid literal/lengths set",o.mode=ce;break}if(o.distbits=6,o.distcode=o.distdyn,Se={bits:o.distbits},xe=y(S,o.lens,o.nlen,o.ndist,o.distcode,0,o.work,Se),o.distbits=Se.bits,xe){e.msg="invalid distances set",o.mode=ce;break}if(o.mode=te,t===E)break e;case te:o.mode=oe;case oe:if(l>=6&&d>=258){e.next_out=s,e.avail_out=d,e.next_in=i,e.avail_in=l,o.hold=f,o.bits=h,k(e,m),s=e.next_out,a=e.output,d=e.avail_out,i=e.next_in,r=e.input,l=e.avail_in,f=o.hold,h=o.bits,o.mode===J&&(o.back=-1);break}for(o.back=0;Ce=o.lencode[f&(1<<o.lenbits)-1],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=we);){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(be&&0===(240&be)){for(ve=we,ke=be,ye=ge;Ce=o.lencode[ye+((f&(1<<ve+ke)-1)>>ve)],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=ve+we);){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}f>>>=ve,h-=ve,o.back+=ve}if(f>>>=we,h-=we,o.back+=we,o.length=ge,0===be){o.mode=se;break}if(32&be){o.back=-1,o.mode=J;break}if(64&be){e.msg="invalid literal/length code",o.mode=ce;break}o.extra=15&be,o.mode=ne;case ne:if(o.extra){for(Me=o.extra;Me>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}o.length+=f&(1<<o.extra)-1,f>>>=o.extra,h-=o.extra,o.back+=o.extra}o.was=o.length,o.mode=re;case re:for(;Ce=o.distcode[f&(1<<o.distbits)-1],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=we);){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(0===(240&be)){for(ve=we,ke=be,ye=ge;Ce=o.distcode[ye+((f&(1<<ve+ke)-1)>>ve)],we=Ce>>>24,be=Ce>>>16&255,ge=65535&Ce,!(h>=ve+we);){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}f>>>=ve,h-=ve,o.back+=ve}if(f>>>=we,h-=we,o.back+=we,64&be){e.msg="invalid distance code",o.mode=ce;break}o.offset=ge,o.extra=15&be,o.mode=ae;case ae:if(o.extra){for(Me=o.extra;Me>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}o.offset+=f&(1<<o.extra)-1,f>>>=o.extra,h-=o.extra,o.back+=o.extra}if(o.offset>o.dmax){e.msg="invalid distance too far back",o.mode=ce;break}o.mode=ie;case ie:if(0===d)break e;if(w=m-d,o.offset>w){if(w=o.offset-w,w>o.whave&&o.sane){e.msg="invalid distance too far back",o.mode=ce;break}w>o.wnext?(w-=o.wnext,pe=o.wsize-w):pe=o.wnext-w,w>o.length&&(w=o.length),me=o.window}else me=a,pe=s-o.offset,w=o.length;w>d&&(w=d),d-=w,o.length-=w;do a[s++]=me[pe++];while(--w);0===o.length&&(o.mode=oe);break;case se:if(0===d)break e;a[s++]=o.length,d--,o.mode=oe;break;case le:if(o.wrap){for(;32>h;){if(0===l)break e;l--,f|=r[i++]<<h,h+=8}if(m-=d,e.total_out+=m,o.total+=m,m&&(e.adler=o.check=o.flags?v(o.check,a,m,s-m):g(o.check,a,m,s-m)),m=d,(o.flags?f:n(f))!==o.check){e.msg="incorrect data check",o.mode=ce;break}f=0,h=0}o.mode=de;case de:if(o.wrap&&o.flags){for(;32>h;){if(0===l)break e;l--,f+=r[i++]<<h,h+=8}if(f!==(4294967295&o.total)){e.msg="incorrect length check",o.mode=ce;break}f=0,h=0}o.mode=ue;case ue:xe=D;break e;case ce:xe=L;break e;case fe:return B;case he:default:return A}return e.next_out=s,e.avail_out=d,e.next_in=i,e.avail_in=l,o.hold=f,o.bits=h,(o.wsize||m!==e.avail_out&&o.mode<ce&&(o.mode<le||t!==M))&&c(e,e.output,e.next_out,m-e.avail_out)?(o.mode=fe,B):(p-=e.avail_in,m-=e.avail_out,e.total_in+=p,e.total_out+=m,o.total+=m,o.wrap&&m&&(e.adler=o.check=o.flags?v(o.check,a,m,e.next_out-m):g(o.check,a,m,e.next_out-m)),e.data_type=o.bits+(o.last?64:0)+(o.mode===J?128:0)+(o.mode===te||o.mode===X?256:0),(0===p&&0===m||t===M)&&xe===R&&(xe=T),xe)}function h(e){if(!e||!e.state)return A;var t=e.state;return t.window&&(t.window=null),e.state=null,R}function p(e,t){var o;return e&&e.state?(o=e.state,0===(2&o.wrap)?A:(o.head=t,t.done=!1,R)):A}var m,w,b=e("../utils/common"),g=e("./adler32"),v=e("./crc32"),k=e("./inffast"),y=e("./inftrees"),_=0,x=1,S=2,M=4,C=5,E=6,R=0,D=1,F=2,A=-2,L=-3,B=-4,T=-5,I=8,O=1,z=2,U=3,P=4,Z=5,q=6,G=7,N=8,j=9,H=10,W=11,J=12,K=13,Y=14,X=15,V=16,Q=17,$=18,ee=19,te=20,oe=21,ne=22,re=23,ae=24,ie=25,se=26,le=27,de=28,ue=29,ce=30,fe=31,he=32,pe=852,me=592,we=15,be=we,ge=!0;o.inflateReset=i,o.inflateReset2=s,o.inflateResetKeep=a,o.inflateInit=d,o.inflateInit2=l,o.inflate=f,o.inflateEnd=h,o.inflateGetHeader=p,o.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(e,t,o){"use strict";var n=e("../utils/common"),r=15,a=852,i=592,s=0,l=1,d=2,u=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],f=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,o,p,m,w,b,g){var v,k,y,_,x,S,M,C,E,R=g.bits,D=0,F=0,A=0,L=0,B=0,T=0,I=0,O=0,z=0,U=0,P=null,Z=0,q=new n.Buf16(r+1),G=new n.Buf16(r+1),N=null,j=0;for(D=0;r>=D;D++)q[D]=0;for(F=0;p>F;F++)q[t[o+F]]++;for(B=R,L=r;L>=1&&0===q[L];L--);if(B>L&&(B=L),0===L)return m[w++]=20971520,m[w++]=20971520,g.bits=1,0;for(A=1;L>A&&0===q[A];A++);for(A>B&&(B=A),O=1,D=1;r>=D;D++)if(O<<=1,O-=q[D],0>O)return-1;if(O>0&&(e===s||1!==L))return-1;for(G[1]=0,D=1;r>D;D++)G[D+1]=G[D]+q[D];for(F=0;p>F;F++)0!==t[o+F]&&(b[G[t[o+F]]++]=F);if(e===s?(P=N=b,S=19):e===l?(P=u,Z-=257,N=c,j-=257,S=256):(P=f,N=h,S=-1),U=0,F=0,D=A,x=w,T=B,I=0,y=-1,z=1<<B,_=z-1,e===l&&z>a||e===d&&z>i)return 1;for(var H=0;;){H++,M=D-I,b[F]<S?(C=0,E=b[F]):b[F]>S?(C=N[j+b[F]],E=P[Z+b[F]]):(C=96,E=0),v=1<<D-I,k=1<<T,A=k;do k-=v,m[x+(U>>I)+k]=M<<24|C<<16|E|0;while(0!==k);for(v=1<<D-1;U&v;)v>>=1;if(0!==v?(U&=v-1,U+=v):U=0,F++,0===--q[D]){if(D===L)break;D=t[o+b[F]]}if(D>B&&(U&_)!==y){for(0===I&&(I=B),x+=A,T=D-I,O=1<<T;L>T+I&&(O-=q[T+I],!(0>=O));)T++,O<<=1;if(z+=1<<T,e===l&&z>a||e===d&&z>i)return 1;y=U&_,m[y]=B<<24|T<<16|x-w|0}}return 0!==U&&(m[x+U]=D-I<<24|64<<16|0),g.bits=B,0}},{"../utils/common":1}],10:[function(e,t,o){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],11:[function(e,t,o){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=n},{}],"/lib/inflate.js":[function(e,t,o){"use strict";function n(e,t){var o=new h(t);if(o.push(e,!0),o.err)throw o.msg;return o.result}function r(e,t){return t=t||{},t.raw=!0,n(e,t)}var a=e("./zlib/inflate.js"),i=e("./utils/common"),s=e("./utils/strings"),l=e("./zlib/constants"),d=e("./zlib/messages"),u=e("./zlib/zstream"),c=e("./zlib/gzheader"),f=Object.prototype.toString,h=function(e){this.options=i.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var o=a.inflateInit2(this.strm,t.windowBits);if(o!==l.Z_OK)throw new Error(d[o]);this.header=new c,a.inflateGetHeader(this.strm,this.header)};h.prototype.push=function(e,t){var o,n,r,d,u,c=this.strm,h=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:t===!0?l.Z_FINISH:l.Z_NO_FLUSH,"string"==typeof e?c.input=s.binstring2buf(e):"[object ArrayBuffer]"===f.call(e)?c.input=new Uint8Array(e):c.input=e,c.next_in=0,c.avail_in=c.input.length;do{if(0===c.avail_out&&(c.output=new i.Buf8(h),c.next_out=0,c.avail_out=h),o=a.inflate(c,l.Z_NO_FLUSH),o!==l.Z_STREAM_END&&o!==l.Z_OK)return this.onEnd(o),this.ended=!0,!1;c.next_out&&(0===c.avail_out||o===l.Z_STREAM_END||0===c.avail_in&&(n===l.Z_FINISH||n===l.Z_SYNC_FLUSH))&&("string"===this.options.to?(r=s.utf8border(c.output,c.next_out),d=c.next_out-r,u=s.buf2string(c.output,r),c.next_out=d,c.avail_out=h-d,d&&i.arraySet(c.output,c.output,r,d,0),this.onData(u)):this.onData(i.shrinkBuf(c.output,c.next_out)))}while(c.avail_in>0&&o!==l.Z_STREAM_END);return o===l.Z_STREAM_END&&(n=l.Z_FINISH),n===l.Z_FINISH?(o=a.inflateEnd(this.strm),this.onEnd(o),this.ended=!0,o===l.Z_OK):n===l.Z_SYNC_FLUSH?(this.onEnd(l.Z_OK),c.avail_out=0,!0):!0},h.prototype.onData=function(e){this.chunks.push(e)},h.prototype.onEnd=function(e){e===l.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},o.Inflate=h,o.inflate=n,o.inflateRaw=r,o.ungzip=n},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate.js":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js")});var browser=function(){var e,t=navigator.userAgent,o=t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(o[1])?(e=/\brv[ :]+(\d+)/g.exec(t)||[],"IE "+(e[1]||"")):"Chrome"===o[1]&&(e=t.match(/\bOPR\/(\d+)/),null!=e)?"Opera "+e[1]:(o=o[2]?[o[1],o[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=t.match(/version\/(\d+)/i))&&o.splice(1,1,e[1]),o.join(" "))}(),hasWebGL=function(){if(!window.WebGLRenderingContext)return 0;var e=document.createElement("canvas"),t=e.getContext("webgl");return t||(t=e.getContext("experimental-webgl"))?1:0}(),mobile=function(e){return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}(navigator.userAgent||navigator.vendor||window.opera);Module.compatibilitycheck?Module.compatibilitycheck():CompatibilityCheck();var didShowErrorMessage=!1;"function"!=typeof window.onerror&&(window.onerror=function(e,t,o){return Module.errorhandler&&Module.errorhandler(e,t,o)||(console.log("Invoking error handler due to\n"+e),"function"==typeof dump&&dump("Invoking error handler due to\n"+e),didShowErrorMessage||-1!=e.indexOf("UnknownError")||-1!=e.indexOf("Program terminated with exit(0)"))?void 0:(didShowErrorMessage=!0,-1!=e.indexOf("DISABLE_EXCEPTION_CATCHING")?void alert("An exception has occured, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project's WebGL player settings to be able to catch the exception or see the stack trace."):-1!=e.indexOf("Cannot enlarge memory arrays")?void alert("Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings."):-1!=e.indexOf("Invalid array buffer length")||-1!=e.indexOf("out of memory")?void alert("The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."):-1!=e.indexOf("Script error.")&&0==document.URL.indexOf("file:")?void alert("It seems your browser does not support running Unity WebGL content from file:// urls. Please upload it to an http server, or try a different browser."):void alert("An error occured running the Unity content on this page. See your browser's JavaScript console for more info. The error was:\n"+e))}),Module.locateFile=function(e){return Module.dataUrl},Module.preRun=[],Module.postRun=[],Module.print=function(){return function(e){console.log(e)}}(),Module.printErr=function(e){console.error(e)},Module.canvas=document.getElementById("canvas"),Module.progress=null,Module.setStatus=function(e){if(null==this.progress){if("function"!=typeof UnityProgress)return;this.progress=new UnityProgress(canvas)}if(Module.setStatus.last||(Module.setStatus.last={time:Date.now(),text:""}),e!==Module.setStatus.text){this.progress.SetMessage(e);var t=e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);t&&this.progress.SetProgress(parseInt(t[2])/parseInt(t[4])),""===e&&this.progress.Clear()}},Module.totalDependencies=0,Module.monitorRunDependencies=function(e){this.totalDependencies=Math.max(this.totalDependencies,e),Module.setStatus(e?"Preparing... ("+(this.totalDependencies-e)+"/"+this.totalDependencies+")":"All downloads complete.");
},Module.setStatus("Downloading (0.0/1)");var Module;"undefined"==typeof Module&&(Module=eval("(function() { try { return Module || {} } catch(e) { return {} } })()")),Module.expectedDataFileDownloads||(Module.expectedDataFileDownloads=0,Module.finishedDataFileDownloads=0),Module.expectedDataFileDownloads++,function(){var e=function(e){function t(e){console.error("package error:",e)}function o(){function e(e,t){if(!e)throw t+(new Error).stack}function o(e,t,o,n){this.start=e,this.end=t,this.crunched=o,this.audio=n}function a(e,t){try{var o=p.open(b,g)}catch(n){return t(n)}o.onupgradeneeded=function(e){var t=e.target.result;t.objectStoreNames.contains(k)&&t.deleteObjectStore(k);t.createObjectStore(k);t.objectStoreNames.contains(v)&&t.deleteObjectStore(v);t.createObjectStore(v)},o.onsuccess=function(t){var o=t.target.result;e(o)},o.onerror=function(e){t(e)}}function d(e,t,o,n){var r=e.transaction([v],m),a=r.objectStore(v),i=a.get(t);i.onsuccess=function(e){var t=e.target.result;return o(t?l===t.uuid:!1)},i.onerror=function(e){n(e)}}function u(e,t,o,n){var r=e.transaction([k],m),a=r.objectStore(k),i=a.get(t);i.onsuccess=function(e){var t=e.target.result;o(t)},i.onerror=function(e){n(e)}}function c(e,t,o,n,r,a){var i=e.transaction([k,v],w),s=i.objectStore(k),l=i.objectStore(v),d=s.put(o,t);d.onsuccess=function(e){var i=l.put(n,t);i.onsuccess=function(e){r(o)},i.onerror=function(e){a(e)}},d.onerror=function(e){a(e)}}function f(t){Module.finishedDataFileDownloads++,e(t,"Loading data file failed.");var n=new Uint8Array(t);o.prototype.byteArray=n,o.prototype.requests["/globalgamemanagers"].onload(),o.prototype.requests["/globalgamemanagers.assets"].onload(),o.prototype.requests["/level0"].onload(),o.prototype.requests["/level1"].onload(),o.prototype.requests["/methods_pointedto_by_uievents.xml"].onload(),o.prototype.requests["/preserved_derived_types.xml"].onload(),o.prototype.requests["/resources.assets"].onload(),o.prototype.requests["/resources.resource"].onload(),o.prototype.requests["/sharedassets0.assets"].onload(),o.prototype.requests["/sharedassets0.resource"].onload(),o.prototype.requests["/sharedassets1.assets"].onload(),o.prototype.requests["/sharedassets1.resource"].onload(),o.prototype.requests["/Il2CppData/Metadata/global-metadata.dat"].onload(),o.prototype.requests["/Resources/unity_default_resources"].onload(),o.prototype.requests["/Resources/unity_builtin_extra"].onload(),o.prototype.requests["/Managed/mono/2.0/machine.config"].onload(),Module.removeRunDependency("datafile_fof_webgl.data")}function h(e){console.error(e),console.error("falling back to default preload behavior"),fetchRemotePackageWrapper(i,s,f,t)}Module.FS_createPath("/","Il2CppData",!0,!0),Module.FS_createPath("/Il2CppData","Metadata",!0,!0),Module.FS_createPath("/","Resources",!0,!0),Module.FS_createPath("/","Managed",!0,!0),Module.FS_createPath("/Managed","mono",!0,!0),Module.FS_createPath("/Managed/mono","2.0",!0,!0),o.prototype={requests:{},open:function(e,t){this.name=t,this.requests[t]=this,Module.addRunDependency("fp "+this.name)},send:function(){},onload:function(){var e=this.byteArray.subarray(this.start,this.end);this.finish(e)},finish:function(e){var t=this;Module.FS_createPreloadedFile(this.name,null,e,!0,!0,function(){Module.removeRunDependency("fp "+t.name)},function(){t.audio?Module.removeRunDependency("fp "+t.name):Module.printErr("Preloading file "+t.name+" failed")},!1,!0),this.requests[this.name]=null}},new o(0,29476,0,0).open("GET","/globalgamemanagers"),new o(29476,45420,0,0).open("GET","/globalgamemanagers.assets"),new o(45420,123816,0,0).open("GET","/level0"),new o(123816,310948,0,0).open("GET","/level1"),new o(310948,312357,0,0).open("GET","/methods_pointedto_by_uievents.xml"),new o(312357,317709,0,0).open("GET","/preserved_derived_types.xml"),new o(317709,1009657,0,0).open("GET","/resources.assets"),new o(1009657,1173972,0,0).open("GET","/resources.resource"),new o(1173972,4296600,0,0).open("GET","/sharedassets0.assets"),new o(4296600,7240606,0,0).open("GET","/sharedassets0.resource"),new o(7240606,7460578,0,0).open("GET","/sharedassets1.assets"),new o(7460578,19829336,0,0).open("GET","/sharedassets1.resource"),new o(19829336,21753388,0,0).open("GET","/Il2CppData/Metadata/global-metadata.dat"),new o(21753388,23250760,0,0).open("GET","/Resources/unity_default_resources"),new o(23250760,23311488,0,0).open("GET","/Resources/unity_builtin_extra"),new o(23311488,23339113,0,0).open("GET","/Managed/mono/2.0/machine.config");var p=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,m="readonly",w="readwrite",b="EM_PRELOAD_CACHE",g=1,v="METADATA",k="PACKAGES";Module.addRunDependency("datafile_fof_webgl.data"),Module.preloadResults||(Module.preloadResults={}),a(function(e){d(e,n+r,function(t){Module.preloadResults[r]={fromCache:t},t?(console.info("loading "+r+" from cache"),u(e,n+r,f,h)):(console.info("loading "+r+" from remote"),fetchRemotePackageWrapper(i,s,function(t){c(e,n+r,t,{uuid:l},f,function(e){console.error(e),f(t)})},h))},h)},h),Module.setStatus&&Module.setStatus("Downloading...")}var n;if("object"==typeof window)n=window.encodeURIComponent(window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/");else{if("undefined"==typeof location)throw"using preloaded data can only be done on a web page or in a web worker";n=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}var r="fof_webgl.data",a="fof_webgl.data";"function"!=typeof Module.locateFilePackage||Module.locateFile||(Module.locateFile=Module.locateFilePackage,Module.printErr("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"));var i="function"==typeof Module.locateFile?Module.locateFile(a):(Module.filePackagePrefixURL||"")+a,s=23339113,l="200762f0-b5b3-49e6-849b-9e7f37a614fe";Module.calledRun?o():(Module.preRun||(Module.preRun=[]),Module.preRun.push(o))};e()}();