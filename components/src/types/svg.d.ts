declare module '*.svg' {
    import { SvgProps } from 'react-native-svg';
    const content: React.ComponentClass<SvgProps, any>; // eslint-disable-line
    export default content;
}
