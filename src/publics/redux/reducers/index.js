import { combineReducers } from 'redux';

import register from './register';
import login from './login';
import user from './user';
import education from './education';
import experience from './experience';
import job from './job';
import applicant from './applicant';
import favorite from './favorite';

const appReducer = combineReducers({
    register,
    login,
    user,
    education,
    experience,
    job,
    applicant,
    favorite
});

export default appReducer;