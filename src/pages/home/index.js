import React from "react";
import { useEffect, useState, useRef } from 'react';
import  useQueryString  from '@/utils/use-query';
import  { genPid }  from '@/libs/string';
import  Config  from '@/config';
import  {validate}  from '@/api';


// import background from '@/assets/images/1.png';
import '@/app.less';
function Home() {
	
	const [currentX, setCurrentX] = useState(0);
	const [moveX, setMoveX] = useState(0);
	const [percentage, setPercentage] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [pid, setPid] = useState(genPid());
  // setGuid(genGuid())

  const [uid, setUid] = useQueryString('uid');

  
      // validateUrl:'/example/validate',
      // console.log(apihost)
  let imageUrl=Config.apihost+'/image?pid='+pid
 
  	const refButtion = useRef(null);
  	var style_translate = {
   		transform: 'translateX('+moveX+'px)'
  	};
  	var style_rotate = {
   		transform : 'rotate(' + 360 * percentage + 'deg)'
  	};

  

  	useOnTouchstart(refButtion, (x) => {
      console.log("useOnTouchstart")
  		setCurrentX(x)
  		setIsMouseDown(true)
  	});
  	useOnTouchend(refButtion, (x) => {
     console.log("useOnTouchend");
     setIsMouseDown(x)
     validate(pid,360*percentage).then(res=>{

     }).catch(err=>{
       
     })
    });
  	useOnTouchmove(refButtion, (event) => {
      console.log("useOnTouchmove");
  		if(isMouseDown) {
  			const maxWidth=refButtion.current.parentNode.offsetWidth-refButtion.current.offsetWidth
  			let clientX=event.clientX
  			console.log(event)
  			let _x=clientX-currentX
  			_x=_x>0?_x:0
  			_x=_x>maxWidth?maxWidth:_x
  			// debugger
  			setMoveX(_x)
  			console.log(moveX)
  			setPercentage(parseFloat(moveX/300).toFixed(2))
  		}
  	});
    // lI7akKu7Rwb28wdW3dJ7LnBNIwG7LG5G


    return ( <div className="vcode-spin">
	    	<span>身份验证</span>
		   	<h1>拖动滑块，使图片角度为正</h1>
		   	<div  className="vcode-spin-img"><img style={style_rotate} src={imageUrl} /></div>
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
    [ref, handler]
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
    [ref, handler]
  );
}

function useOnTouchend(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
      	console.log("useOnTouchend-listener")
        handler(false);
      };

      const element=ref.current
      console.log("useOnTouchend")
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

