import React, { Component } from 'react';
import { Text, View, StyleSheet, TextProps, ImageSourcePropType, Image, TouchableOpacity } from 'react-native';
import { red, gray } from '@pxblue/colors';
import { ListItem } from './list-item';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export interface HeaderIcon {
  /** Name of the icon */
  icon: string;

  /** Callback when icon is pressed */
  onPress: () => void;
}

export interface Props {
  headerColor?: string;
  headerText: string | Array<string>;
  badge?: JSX.Element;
  actionRow?: JSX.Element;

  /** Background image to render when header is expanded */
  headerBackgroundImage?: ImageSourcePropType;

  actionItems?: Array<HeaderIcon>;

  onPressOverflow?: () => void;
};

export class ScoreCard extends Component<Props> {
  private static readonly ICON_SIZE = 24;
  public static readonly ListItem = ListItem;

  public render() {
    const { children, headerColor = red[700] } = this.props;
    const headerText = this.headerTextArray();

    return (
      <View style={styles.card}>
        <View style={[styles.padded, styles.header, { backgroundColor: headerColor }]}>
          {this.backgroundImage()}
          <View style={{ flex: 1 }}>
            {headerText.map((text, i) =>
              <Text style={[styles.headerText, headerTextProps[i].style]} testID={headerTextProps[i].testID} numberOfLines={1} ellipsizeMode={'tail'}>
                {text}
              </Text>
            )}
          </View>
          {this.actionItems()}
        </View>
        <View style={[styles.row]}>
          <View style={this.childrenWrapperStyle()}>
            {children}
          </View>
          {this.hero()}
        </View>
        {this.footer()}
      </View>
    );
  }

  private childrenWrapperStyle() {
    const { badge } = this.props;

    if (badge) {
      return [styles.padded, styles.firstColumn];
    } else {
      return [styles.padded];
    }
  }

  private headerTextArray(): Array<string> {
    const { headerText } = this.props;

    return typeof headerText === 'string' ? [headerText] : headerText.slice(0, 3);
  }

  private hero() {
    const { badge } = this.props;
    if (badge) {
      return (
        <View style={{ position: 'absolute', right: PADDING_AMOUNT, top: -24 }}>
          {badge}
        </View>
      );
    }
  }

  private backgroundImage() {
    const { headerBackgroundImage } = this.props;
    if (headerBackgroundImage) {
      return (
        <Image
          testID={'header-background-image'}
          source={headerBackgroundImage}
          style={{
            position: 'absolute',
            resizeMode: 'cover',
            height: 100,
            opacity: 0.3
          }}
        />
      );
    }
  }

  private footer() {
    const { actionRow } = this.props;

    if (actionRow) {
      return (
        <View style={[styles.footer]}>
          {actionRow}
        </View>
      );
    }
  }

  private actionItems() {
    const { actionItems, onPressOverflow } = this.props;
    let items: Array<HeaderIcon> = [];

    if (onPressOverflow && !actionItems || actionItems && actionItems.length > 2 && onPressOverflow) {
      items = [{ icon: 'more-vert', onPress: onPressOverflow }];
    } else if (actionItems) {
      items = actionItems;
    }

    if (items) {
      return items.slice(0, 2).map((actionItem, index) => (
        <View>
          <TouchableOpacity key={`${index}`} testID={`header-action-item${index}`} onPress={actionItem.onPress} style={styles.actionItem}>
            <MaterialIcon name={actionItem.icon} size={ScoreCard.ICON_SIZE} color={this.fontColor()}/>
          </TouchableOpacity>
        </View>
      ))
    }
  }

  private fontColor() {
    return 'white';
  }
}

const PADDING_AMOUNT = 16;
const styles = StyleSheet.create({
  card: {
    shadowColor: gray[900],
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0
    },
    borderRadius: 4,
    elevation: 1,
    backgroundColor: 'white',
    flex: 1
  },
  actionItem: {
    marginLeft: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: PADDING_AMOUNT,
    height: 100,
    overflow: 'hidden'
  },
  headerText: {
    color: 'white',
  },
  headerText1: {
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 4
  },
  headerText2: {
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 3
  },
  headerText3: {
    fontSize: 14,
    fontWeight: '200'
  },
  footer: {
    borderTopColor: gray[100],
    borderTopWidth: 1
  },
  padded: {
    padding: PADDING_AMOUNT
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  firstColumn: {
    marginRight: 90
  }
});

const headerTextProps: ReadonlyArray<TextProps> = [
  { testID: 'header 1', style: styles.headerText1 },
  { testID: 'header 2', style: styles.headerText2 },
  { testID: 'header 3', style: styles.headerText3 },
];
