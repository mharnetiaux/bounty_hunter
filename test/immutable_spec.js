import {expect} from 'chai';
import {List,Map} from 'immutable';

describe('immutability', () => {

    describe('a number', () => {

        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });

    });

    describe('A List', () => {
        "use strict";
        function add_bounty_hunter(current_state, bounty_hunter){
            return current_state.push(bounty_hunter);
        }

        it('is immutable', () => {
            let state = List.of("a","b");
            let next_state = add_bounty_hunter(state,'c');

            expect(next_state).to.equal(List.of(
                'a',
                'b',
                'c'
            ));

            expect(state).to.equal(List.of(
                'a',
                'b'
            ));
        });
    });

    describe('a tree', () => {
        "use strict";
        function add_bounty_hunter(current_state,bounty_hunter) {
            return current_state.update('bounty_hunters', bounty_hunters => bounty_hunters.push(bounty_hunter));
        }

        it('is immutable', () => {
            let state = Map({
                bounty_hunters:List.of('a','b')
            }),
            next_state = add_bounty_hunter(state,'c');

            expect(next_state).to.equal(Map({
                bounty_hunters:List.of(
                    'a',
                    'b',
                    'c'
                )
            }));

            expect(state).to.equal(Map({
                bounty_hunters:List.of(
                    'a',
                    'b'
                )
            }));
        });
    });
});
