import axios from "axios"

export const setUrl = (url : string)  => {
	if(url.includes('http://') || url.includes('https://')){
		return url
	}else{
		return axios.defaults.baseURL + url
	}
}

export const setNotFollow_ = async(user_id: any,store_id: any) => {
	return await axios.post('/api/followers/delete/'+user_id+'/'+store_id)
}

export const checkFollow_ = async(user_id: any,store_id: any) => {
	return await axios.get('/api/followers/check/'+user_id+'/'+store_id)
}

export const setFollow_ = async(user_id: any,store_id: any) => {
	return await axios.post('/api/followers',{user_id: user_id, store_id: store_id})
}