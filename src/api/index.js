const axios = require('axios');
import  Config  from '@/config';

export function validate(uid,pid,rotate,params){

	return axios.post(`${Config.apihost}/validate`, {
		uid: uid,
	    pid: pid,
	    r: rotate,
	    params:decodeURIComponent(params)
	})
}