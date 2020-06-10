const axios = require('axios');
import  Config  from '@/config';
import { service } from "@/utils/axios";


export function validate(uid,pid,rotate,params){
	return service.post(`${Config.apihost}/validate`, {
		uid: uid,
	    pid: pid,
	    r: rotate,
	    params:decodeURIComponent(params)
	})
}