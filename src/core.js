import {List,Map} from 'immutable';


function get_winners(vote){
    "use strict";
    if(!vote) return [];

    const [a,b] = vote.get('pair');

    const a_votes = vote.getIn(['tally',a],0);
    const b_votes = vote.getIn(['tally',b],0);

    if(a_votes > b_votes){
        return [a];
    }else if(a_votes < b_votes){
        return [b];
    }else{
        return [a,b];
    }
}

export function set_entries(state,entries){
    "use strict";
    return state.set('entries',List(entries));
}

export function next(state){
    "use strict";
    const entries = state.get('entries').concat(get_winners(state.get('vote')));
    return state.merge({
        vote: Map(
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
        (tally) => tally + 1
    );
}




////IMMUTABLE STATE FLOW
/*let state_map = new Map,
    entries_to_state_map = set_entries(state_map,["Bobba","Squid-Face","Greedo"]),
    grab_two_entries_from_map = next(entries_to_state_map),
    vote_on_two_entries = vote(grab_two_entries_from_map,"Bobba"),

    object_cycle = [
        state_map,
        entries_to_state_map,
        grab_two_entries_from_map,
        vote_on_two_entries
    ];

for(let i = 0; i < object_cycle.length; i++){
    console.log(object_cycle[i]);
}*/










