const axios = require('axios');
import  Config  from '@/config';

export function validate(pid,rotate){
	return axios.post(`${Config.apihost}/validate`, {
	    pid: pid,
	    r: rotate
	})
}