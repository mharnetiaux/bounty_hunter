import {List,Map} from 'immutable';

export function set_entries(state,entries){
    "use strict";
    return state.set('entries',List(entries));
}

export function next(state){
    "use strict";
    const entries = state.get('entries');
    return state.merge({
        vote:Map(
            {
                pair: entries.take(2)
            }
        ),
        entries:entries.skip(2)
    });
}

export function vote(state,entry){
    "use strict";
    return state.updateIn(
        ['vote','tally',entry],
        0,
        tally => tally + 1
    );
}









