import React from "react";
import { useEffect, useState, useRef } from 'react';
import  useQueryString  from '@/utils/use-query';
import  { genPid }  from '@/libs/string';
import  Config  from '@/config';
import  {validate}  from '@/api';
var dsBridge=require("dsbridge")

import '@/app.less';
function Home() {
	
	const [currentX, setCurrentX] = useState(0);
  const [eventX, setEventX] = useState(0);
	const [moveX, setMoveX] = useState(0);

  const [maxWidth, setMaxWidth] = useState(0);

	const [percentage, setPercentage] = useState(0);
  
  const [tipState, setTipState] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [pid, setPid] = useState(genPid());
  
  const [params, setParams] = useQueryString('params');
  const [uid, setUid] = useQueryString('uid');
  let imageUrl=Config.apihost+'/image?pid='+pid
 
  	const refButtion = useRef(null);
  	var style_translate = {
   		transform: 'translateX('+moveX+'px)'
  	};
  	var style_rotate = {
   		transform : 'rotate(' + 360 * percentage + 'deg)'
  	};

  	useOnTouchstart(refButtion, (x) => {
      const maxWidth=refButtion.current.parentNode.offsetWidth-refButtion.current.offsetWidth
      setMaxWidth(maxWidth)
  		setCurrentX(x)
  		setIsMouseDown(true)
  	});
    useOnTouchmove(refButtion, (event) => {    
        let clientX=event.clientX
        setEventX(clientX)      
    });
    useEffect(()=>{
      if(isMouseDown){
        let _x=eventX-currentX
        _x=_x>0?_x:0
        _x=_x>maxWidth?maxWidth:_x
        setMoveX(_x)
        setPercentage(parseFloat(moveX/300).toFixed(2))
      }
    },[isMouseDown,eventX])

  	useOnTouchend(refButtion, (x) => {
     setIsMouseDown(x)
     setTipState(1)
     validate(uid,pid,360*percentage,params).then(res=>{
       if(res.code==200){
         setTipState(2)
         dsBridge.call("spinVcodeValidate",res.data, function (v) {
            // alert(v);
         })
       }else{
         setTipState(3)
         setTimeout(()=>{
           setTipState(0)
           setMoveX(0)
           setPid(genPid())
           setPercentage(0)
         },600)
       }
     }).catch(err=>{
       setTipState(3)
     })
    });
  	
  
    return ( <div className="vcode-spin">
	    	<span>身份验证</span>
		   	<h1>拖动滑块，使图片角度为正</h1>
		   	<div  className="vcode-spin-img">
           <img style={style_rotate} src={imageUrl} />
           {tipState==1 ? <i className="vcode-spin-tip vcode-spin-tip-loading  iconfont icon-checkmore"></i> : "" }
           {tipState==2 ? <i className="vcode-spin-tip vcode-spin-tip-success  iconfont icon-icon-test"></i> : "" }
           {tipState==3 ? <i className="vcode-spin-tip vcode-spin-tip-fail  iconfont icon-close"></i> : "" }
         </div>
		   	<div className="vcode-spin-control">
  		   		<div ref={refButtion} className="vcode-spin-button" style={style_translate}>
  		   			<p></p>
  		   		</div>
  		   	</div>
  		</div>
  	);
}


function useOnTouchstart(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        const _event = event.changedTouches && event.changedTouches[0] || event
      	handler(_event.clientX);
      };
      const element=ref.current
      element.addEventListener('mousedown', listener);
      element.addEventListener('touchstart', listener);
      return () => {
        element.removeEventListener('mousedown', listener);
        element.removeEventListener('touchstart', listener);
      };
    },
    []
  );
}

function useOnTouchmove(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
      	const _event = event.changedTouches && event.changedTouches[0] || event
      	handler(_event);
      };
      const element=ref.current
      element.addEventListener('mousemove', listener);
      element.addEventListener('touchmove', listener);
      return () => {
        element.removeEventListener('mousemove', listener);
        element.removeEventListener('touchmove', listener);
      };
    },
    []
  );
}

function useOnTouchend(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        handler(false);
      };
      const element=ref.current
      element.addEventListener('touchend', listener);
      element.addEventListener('mouseup', listener);
      element.addEventListener('touchcancel', listener);
      return () => {
        element.removeEventListener('touchend', listener);
        element.removeEventListener('mouseup', listener);
        element.removeEventListener('touchcancel', listener);
      };
    },
    [ref, handler]
  );
}
export default Home;

