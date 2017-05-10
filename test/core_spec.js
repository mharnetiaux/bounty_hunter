import {expect} from 'chai';
import {List,Map} from 'immutable';
import {set_entries} from '../src/core';

describe('bounty logic', () => {
    "use strict";
    describe('set_entries',() => {
        it('adds the entries to the state', () => {
            const state = Map(),
                entries = ['a','b'],
                next_state = set_entries(state,entries);

            expect(next_state).to.equal(Map({
                entries:List.of('a,b')
            }));
        });
    });
});