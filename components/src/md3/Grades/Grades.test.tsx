import React from 'react';
import { render } from '@testing-library/react-native';
import { Grades } from './Grades';
// import '@testing-library/jest-native/extend-expect';

describe('Grades.custom', () => {
    it('renders with custom label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(
            <Grades.custom label="Custom Grade" color="#FF5733" backgroundColor="#66CCFF" size={50} />
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

describe('Grades.aPlus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.aPlus />);

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
    it('renders Grades.aPlus component with custom label', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.aPlus label="Custom A+" />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(40);
        expect(avatarHeight).toBe(40);

        const labelElement = getByText('Custom A+');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#198900');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.a', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.a />);

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

    it('renders Grades.a component with custom label', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.a label="Custom A" size={50} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(50);
        expect(avatarHeight).toBe(50);

        const labelElement = getByText('Custom A');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#198900');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.aMinus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.aMinus />);

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

    it('renders Grades.aMinus component with custom label', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.aMinus label="Custom A-" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom A-');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#64a721');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.bPlus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.bPlus />);

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

    it('renders Grades.bPlus component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.bPlus label="Custom B+" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom B+');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#524700');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#afc543');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.b', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.b />);

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

    it('renders Grades.b component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.b label="Custom B" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom B');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#524700');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#FBE365');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.bMinus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.bMinus />);

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

    it('renders Grades.bMinus component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.bMinus label="Custom B-" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom B-');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#524700');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#f6c543');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.cPlus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.cPlus />);

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

    it('renders Grades.cPlus component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.cPlus label="Custom C+" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom C+');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#4B2800');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#f1a821');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.c', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.c />);

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

    it('renders Grades.c component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.c label="Custom C" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom C');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#4B2800');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#ED8B00');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.cMinus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.cMinus />);

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

    it('renders Grades.cMinus component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.cMinus label="Custom C-" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom C-');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#4B2800');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#dc6508');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.dPlus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.dPlus />);

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

    it('renders Grades.dPlus component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.dPlus label="Custom D+" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom D+');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#cb3f11');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.d', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.d />);

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

    it('renders Grades.d component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.d label="Custom D" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom D');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#BA1A1A');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.dMinus', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.dMinus />);

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

    it('renders Grades.dMinus component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.dMinus label="Custom D-" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom D-');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#BA1A1A');

        expect(toJSON()).toMatchSnapshot();
    });
});

describe('Grades.f', () => {
    it('renders with default label, color, background color, and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.f />);

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

    it('renders Grades.f component with custom label and size', () => {
        const { toJSON, getByText, getByTestId } = render(<Grades.f label="Custom F" size={30} />);

        const avatarElement = getByTestId('grade');
        const avatarStyle = avatarElement.props.style;
        const avatarWidth = avatarStyle[0].width;
        const avatarHeight = avatarStyle[0].height;
        expect(avatarWidth).toBe(30);
        expect(avatarHeight).toBe(30);

        const labelElement = getByText('Custom F');
        expect(labelElement).toBeDefined();

        const color = labelElement.props.style[3][1].color;
        expect(color).toBe('#FFFFFF');

        const backgroundColor = avatarElement.props.style[0].backgroundColor;
        expect(backgroundColor).toBe('#9F45F6');

        expect(toJSON()).toMatchSnapshot();
    });
});
