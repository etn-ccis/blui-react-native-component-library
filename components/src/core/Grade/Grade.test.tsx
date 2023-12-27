import React from 'react';
import { render } from '@testing-library/react-native';
import Grade from './Grade';

describe('Grade.custom', () => {
    it('renders with custom label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(
            <Grade label="Custom Grade" fontColor="#FF5733" backgroundColor="#66CCFF" size={50} />
        );

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(50);
        expect(avatarHeight).toBe(50);

        const labelElement = getByText('Custom Grade');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FF5733');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#66CCFF');
        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.aPlus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.APlus />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('A+');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#198900');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.a', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.A />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('A');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#198900');
        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.aMinus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.AMinus />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('A-');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#64a721');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.bPlus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.BPlus />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('B+');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#524700');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#afc543');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.b', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.B />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('B');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#524700');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#FBE365');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.bMinus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.BMinus />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('B-');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#524700');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#f6c543');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.cPlus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.CPlus />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('C+');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#4B2800');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#f1a821');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.c', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.C />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('C');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#4B2800');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#ED8B00');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.cMinus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.CMinus />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('C-');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#4B2800');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#dc6508');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.dPlus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.DPlus />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('D+');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#cb3f11');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.d', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.D />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('D');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#BA1A1A');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.dMinus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.DMinus />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('D-');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#BA1A1A');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grade.f', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grade.F />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('F');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#9F45F6');

        expect(toJSON()).toMatchSnapshot();
    });
});
