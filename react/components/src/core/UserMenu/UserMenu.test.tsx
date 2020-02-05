import {createMount, createShallow} from '@material-ui/core/test-utils';
import SendIcon from '@material-ui/icons/Send';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import {findByTestId} from "../test-utils";
import {Mount, Shallow} from '../types';
import {UserMenu} from './UserMenu';

Enzyme.configure({ adapter: new Adapter() });

let mount: Mount;
let shallow: Shallow;

describe('User Menu', () => {
    beforeEach(() => {
        mount = createMount({ strict: true });
        shallow = createShallow({ dive: true });
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UserMenu />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders with icon', () => {
        let wrapper = shallow(<UserMenu AvatarProps={{children: <SendIcon data-test={'send-icon'}/>}}/>);
        expect(findByTestId('send-icon', wrapper).length).toEqual(1);
    });
});
