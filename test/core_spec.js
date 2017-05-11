import {expect} from 'chai';
import {List,Map} from 'immutable';
import {set_entries,next,vote} from '../src/core';

describe('bounty logic', () => {
    "use strict";

    describe('set entries',() => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('a','b');
            const next_state = set_entries(state,entries);
            const test_data = Map({
                entries:List.of('a','b')
            });

            expect(next_state).to.equal(test_data);
        });
    });


    describe('get two entries to vote on', () => {
        it('gets two entries from state to vote on favorite', () => {
            const state = Map({
                entries:List.of('a','b','c')
            });
            const test_data = Map({
                vote:Map({
                    pair: List.of('a','b')
                }),
                entries:List.of('c')
            });
            const next_state = next(state);
            expect(next_state).to.equal(test_data);
        });

        it('puts winner of current vote back to entries', () => {
            const state =  Map({
                vote: Map({
                    pair: List.of('a', 'b'),
                    tally: Map({
                        'a': 4,
                        'b': 2
                    })
                }),
                entries: List.of('c', 'd', 'e')
            });

            const next_state = next(state);

            const test_data = Map({
                vote: Map({
                    pair: List.of('c', 'd')
                }),
                entries: List.of('e', 'a')
            });

            expect(next_state).to.equal(test_data);
        });

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('a', 'b'),
                    tally: Map({
                        'a': 3,
                        'b': 3
                    })
                }),
                entries: List.of('c', 'd', 'e')
            });

            const next_state = next(state);

            const test_data = Map({
                vote: Map({
                    pair: List.of('c', 'd')
                }),
                entries: List.of('e', 'a', 'b')
            });

            expect(next_state).to.equal(test_data);
        });
    });


    describe('vote on two  entries', () => {

        it('contains a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('a', 'b')
                }),
                entries: List()
            });
            const next_state = vote(state, 'a');
            const test_data = Map({
                vote: Map({
                    pair: List.of('a', 'b'),
                    tally: Map({
                        'a': 1
                    })
                }),
                entries: List()
            });

            expect(next_state).to.equal(test_data);
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('a', 'b'),
                    tally: Map({
                        'a': 3,
                        'b': 2
                    })
                }),
                entries: List()
            });
            const next_state = vote(state, 'a');
            const test_data = Map({
                vote: Map({
                    pair: List.of('a', 'b'),
                    tally: Map({
                        'a': 4,
                        'b': 2
                    })
                }),
                entries: List()
            });

            expect(next_state).to.equal(test_data);
        });
    });
});
