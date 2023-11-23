import React from 'react';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import { View } from 'react-native';
import { Hero } from '..';
import { IconFamily } from '../__types__';
import { cleanup } from '@testing-library/react-native';
import { ScoreCard } from './ScoreCard';

const Line: IconFamily = { family: 'material-community', name: 'chart-line-variant' };

describe('ScoreCard', () => {
    describe('headerText', () => {
        afterEach(cleanup);
        describe('when a single string is passed in as headerText', () => {
            afterEach(cleanup);
            let instance: ReactTestInstance;
            beforeEach(() => {
                instance = TestRenderer.create(<ScoreCard headerTitle={'Hello'} />).root;
            });

            it('finds a single header text element', () => {
                expect(instance.find((x) => x.props.testID === 'header_title')).toBeTruthy();
                expect(instance.findAll((x) => x.props.testID === 'header_subtitle')).toHaveLength(0);
                expect(instance.findAll((x) => x.props.testID === 'header_info')).toHaveLength(0);
            });
        });

        describe('when an array of three strings is passed', () => {
            let instance: ReactTestInstance;
            beforeEach(() => {
                instance = TestRenderer.create(
                    <ScoreCard
                        headerTitle={'Portland Datacenter Long Name'}
                        headerSubtitle={'6 UPS Devices'}
                        headerInfo={'Attention Required'}
                    />
                ).root;
            });

            it('renders at all three', () => {
                expect(instance.find((x) => x.props.testID === 'header_title')).toBeTruthy();
                expect(instance.find((x) => x.props.testID === 'header_subtitle')).toBeTruthy();
                expect(instance.find((x) => x.props.testID === 'header_info')).toBeTruthy();
            });
        });
    });

    describe('actionRow', () => {
        describe('when present', () => {
            let instance: ReactTestInstance;
            beforeEach(() => {
                instance = TestRenderer.create(
                    <ScoreCard headerTitle={'Hello'} actionRow={<View testID={'my-action'} />} />
                ).root;
            });

            it('is rendered', () => {
                expect(instance.find((x) => x.props.testID === 'my-action')).toBeTruthy();
            });
        });
    });

    describe('badge', () => {
        describe('when present', () => {
            let instance: ReactTestInstance;
            beforeEach(() => {
                instance = TestRenderer.create(
                    <ScoreCard headerTitle={'Hello'} badge={<Hero testID={'my-badge'} label={'...'} icon={Line} />} />
                ).root;
            });

            it('is rendered', () => {
                expect(instance.find((x) => x.props.testID === 'my-badge')).toBeTruthy();
            });
        });
    });

    describe('actionItems', () => {
        describe('when 2 actionItems are passed in', () => {
            let instance: ReactTestInstance;
            let firstCallback: ReturnType<typeof jest.fn>;
            let secondCallback: ReturnType<typeof jest.fn>;
            beforeEach(() => {
                firstCallback = jest.fn();
                secondCallback = jest.fn();
                instance = TestRenderer.create(
                    <ScoreCard
                        headerTitle={'Hello'}
                        actionItems={[
                            { icon: Line, onPress: firstCallback },
                            { icon: Line, onPress: secondCallback },
                        ]}
                    />
                ).root;
            });

            it('renders two actionItems', () => {
                expect(instance.find((x) => x.props.testID === 'action-item0')).toBeTruthy();
                expect(instance.find((x) => x.props.testID === 'action-item1')).toBeTruthy();
            });

            it('the first button can be pressed', () => {
                instance.find((x) => x.props.testID === 'action-item0').props.onPress();

                expect(firstCallback).toHaveBeenCalled();
                expect(secondCallback).not.toHaveBeenCalled();
            });

            it('the second button can be pressed', () => {
                instance.find((x) => x.props.testID === 'action-item1').props.onPress();

                expect(firstCallback).not.toHaveBeenCalled();
                expect(secondCallback).toHaveBeenCalled();
            });
        });

        describe('when more than 6 actionItems are passed in', () => {
            let instance: ReactTestInstance;
            beforeEach(() => {
                instance = TestRenderer.create(
                    <ScoreCard
                        headerTitle={'Hello'}
                        actionItems={[
                            { icon: Line, onPress: jest.fn() },
                            { icon: Line, onPress: jest.fn() },
                            { icon: Line, onPress: jest.fn() },
                            { icon: Line, onPress: jest.fn() },
                            { icon: Line, onPress: jest.fn() },
                            { icon: Line, onPress: jest.fn() },
                            { icon: Line, onPress: jest.fn() },
                        ]}
                    />
                ).root;
            });

            it('renders only the first six items', () => {
                expect(instance.find((x) => x.props.testID === 'action-item0')).toBeTruthy();
                expect(instance.find((x) => x.props.testID === 'action-item1')).toBeTruthy();
                expect(instance.find((x) => x.props.testID === 'action-item2')).toBeTruthy();
                expect(instance.find((x) => x.props.testID === 'action-item3')).toBeTruthy();
                expect(instance.find((x) => x.props.testID === 'action-item4')).toBeTruthy();
                expect(instance.find((x) => x.props.testID === 'action-item5')).toBeTruthy();
                expect(instance.findAll((x) => x.props.testID === 'action-item6')).toHaveLength(0);
            });
        });
    });
});
