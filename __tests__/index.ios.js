import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Profile from '../scenes/Profile';

describe('Profile', () => {
    it('should work', () => {
        const component = renderer.create(
            <Profile
                someAttribute={1}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
