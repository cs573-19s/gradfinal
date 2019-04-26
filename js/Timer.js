function minsToTime(m){
    h=Math.floor(m/60);
    m=m%60;
    if(h<10){h="0"+h;}
    if(m<10){m="0"+m;}
    return h+":"+m;
}
