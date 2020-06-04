export function genPid()
{
    var pid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      pid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        pid += "";
    }
    return pid;    
}