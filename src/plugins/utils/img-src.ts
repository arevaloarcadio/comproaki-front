import axios from "axios"

export const setUrl = (url : string)  =>{
	if(url.includes('http://') || url.includes('https://')){
		return url
	}else{
		return axios.defaults.baseURL + url
	}
}