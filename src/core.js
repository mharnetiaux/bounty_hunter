import {List} from 'immutable';

export function set_entries(state,entries){
    "use strict";
    return state.set('entries',List(entries));
}