var change_word={
    "0":"f",
    "1":"e",
    "2":"d",
    "3":"c",
    "4":"b",
    "5":"a",
    "6":"9",
    "7":"8",
    "8":"7",
    "9":"6",
    "a":"5",
    "b":"4",
    "c":"3",
    "d":"2",
    "e":"1",
    "f":"0"
};

function EthToMolc(key){
    var k=key.toString().toLowerCase();
	k=k.trim();
    var ret='';
    if(k.slice(0,2)=="0x")k=k.slice(2)
    
    var temp;
    for(var i=0;i<k.length;i++){
        temp=change_word[k.slice(i,i+1)];
        if(typeof temp === "undefined")return "错误的地址1";
        ret=ret+temp;
    }
    return "mo"+ret;
}

function MolcToEth(key){
    var k=key.toLowerCase();
	k=k.trim();
    var ret='';
    if(k.slice(0,2)=="mo")k=k.slice(2)
	else {
		alert('非法输入');
		return '';
	}
    for(var i=0;i<k.length;i++){
        temp=change_word[k.slice(i,i+1)];
        if(typeof temp === "undefined")return "错误的地址2";
        ret=ret+temp;
    }
    return "0x"+ret;
}

function MessageBox(msg){
    alert(msg);
}

function base36_to_num(value){
    var str_to_num={r:'0',
            y:'1',
            a:'2',
            3:'3',
            q:'4',
            6:'5',
            b:'6',
            z:'7',
            d:'8',
            2:'9',
            m:'10',
            s:'11',
            c:'12',
            w:'13',
            l:'14',
            9:'15',
            h:'16',
            t:'17',
            e:'18',
            8:'19',
            i:'20',
            o:'21',
            1:'22',
            f:'23',
            v:'24',
            0:'25',
            k:'26',
            5:'27',
            g:'28',
            n:'29',
            x:'30',
            j:'31',
            7:'0',
            p:'0',
            4:'0',
            u:'0',

    };
    

    var l=value.length;
	
    var v=value.toString().toLowerCase();
    var ret=0;
    for(var i=l-1;i>=0;i--){
        ret=Number(ret)*32+ Number(str_to_num[v.slice(i,i+1)]);
		console.log('当前字符='+v.slice(i,i+1));
		console.log('当前数字='+str_to_num[v.slice(i,i+1)]);
		console.log('ret='+ret);
    }
    return ret;
}

function num_to_base36(value){
	
    var num_to_str={0:'r',
            1:'y',
            2:'a',
            3:'3',
            4:'q',
            5:'6',
            6:'b',
            7:'z',
            8:'d',
            9:'2',
            10:'m',
            11:'s',
            12:'c',
            13:'w',
            14:'l',
            15:'9',
            16:'h',
            17:'t',
            18:'e',
            19:'8',
            20:'i',
            21:'o',
            22:'1',
            23:'f',
            24:'v',
            25:'0',
            26:'k',
            27:'5',
            28:'g',
            29:'n',
            30:'x',
            31:'j',
    };
    var ret='';
    var v=value;
    while(v > 0){
        ret=ret+num_to_str[v % 32];
        v=Math.floor(v / 32) ;
    }
	v=0;
    while(ret.length < 4){
        
        if(v===0)ret=ret+'r';
        else if(v===1)ret=ret+'7';
        else if(v===2)ret=ret+'p';
        else if(v===3)ret=ret+'4';
        else if(v===4)ret=ret+'u';
		v++;
    }
    
    return ret;
}
//--------------------16进制转10进制-----------------------------
// 16进制数转10进制
var ex16hex = function(value){
  value = stripscript(value);
    value = value.replace("0x","");
  var arr = value.split("");
  arr = arr.reverse();
  var len = arr.length;
  var res = 0;
  $.each(arr, function(i,v){
      var num = hex_change(v);
      res += muti16(num, i);
  });
  return res;
}

// 字符转16进制数字
var hex_change = function(v){
    var res;
    switch(v){
      case "a": res = 10;break;
    case "b": res = 11;break;
    case "c": res = 12;break;
    case "d": res = 13;break;
    case "e": res = 14;break;
    case "f": res = 15;break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9": res = Number(v);break;
    default: res = 0;break;
  }
  return res;
}

// 过滤所有特殊字符
var stripscript = function(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
        var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

// 返回 v 乘以 n 个 16 的积
var muti16 = function(v, n){
  var temp = v;
    for(var i = 0; i < n; i++){
    temp *= 16;
  }
  return temp;
}


function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
   
      //compatibility for firefox and chrome
      var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      var pc = new myPeerConnection({
         iceServers: []
     }),
     noop = function() {},
     localIPs = {},
     ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
     key;
     function iterateIP(ip) {
         if (!localIPs[ip]) onNewIP(ip);
         localIPs[ip] = true;
    }
     //alert('获取ip');
      //create a bogus data channel
     pc.createDataChannel("");
     
     // create offer and set local description
     pc.createOffer().then(function(sdp) {
         
         sdp.sdp.split('\n').forEach(function(line) {
             alert(line);
             if (line.indexOf('candidate') < 0) return;
             line.match(ipRegex).forEach(iterateIP);
         });
         pc.setLocalDescription(sdp, noop, noop);
     }).catch(function(reason) {
         // An error occurred, so handle the failure to connect
     });
      
     //sten for candidate events
     pc.onicecandidate = function(ice) {
         if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
         ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
     };
}
