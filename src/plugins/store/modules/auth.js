//import user from "@/plugins/jwt/user";

/*
|--------------------------------------------------------------------------
| Mutation Types
|--------------------------------------------------------------------------
*/
export const SET_USER = 'SET_USER';
export const SET_UNIT = 'SET_UNIT';
export const UNSET_USER = 'UNSET_USER';

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/
const state = {
	user: {
		id :null, 
		name : null,
		user_name : null,
		email : null,
		is_admin : null,
		permissions : null
	}
};

/*
|--------------------------------------------------------------------------
| Mutations
|--------------------------------------------------------------------------
*/
const mutations = {
	[SET_USER](state, payload) {
		state.user.id = payload.user.id;
		state.user.name = payload.user.name;
		state.user.user_name = payload.user.user_name;
		state.user.email = payload.user.email;
		state.user.is_admin = payload.user.is_admin;
		state.user.permissions = payload.user.permissions;
	},
	[UNSET_USER](state) {
		state.user.id = null;
		state.user.name = null;
		state.user.user_name = null;
		state.user.email = null;
		state.user.is_admin = null;
		state.user.permissions = null;
	}
};

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/
const actions = {
	setAuthUser: (context, user) => {
		context.commit(SET_USER, {user})
	},
	setUnit: (context, unit) => {
		context.commit(SET_UNIT, {unit})
	},
	unsetAuthUser: (context) => {
		context.commit(UNSET_USER)
	}
};

/*
|--------------------------------------------------------------------------
| Getters
|--------------------------------------------------------------------------
*/
const getters = {
	isLoggedIn: (state) => {
		return !!(state.user.firstname && state.user.email);
	},
	getUser: (state) => {
		return (state.user);
	},
	getUnit: (state) => {
		return (state.user.unit);
	},
	getUnitId: (state) => {
		return (state.user.unit);
	},
	whoami: (state) => {
		return state.user.id;
	},

};

/*
|--------------------------------------------------------------------------
| Export the module
|--------------------------------------------------------------------------
*/
export default {
	state,
	mutations,
	actions,
	getters
}