import { Platform } from "react-native";

export const fontConfig = {
  customVariant: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'OpenSans-Regular',
    }),
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 20,
  },
displaySmall: {
  fontFamily: "OpenSans-Regular",
},
displayMedium: {
  fontFamily: "OpenSans-Regular",
},
displayLarge: {
  fontFamily: "OpenSans-Regular",
},
headlineSmall: {
  fontFamily: "OpenSans-Regular",
},
headlineMedium: {
  fontFamily: "OpenSans-Regular",
},
headlineLarge: {
  fontFamily: "OpenSans-Regular",
},
titleSmall: {
  fontFamily: "OpenSans-Regular",
},
titleMedium: {
  fontFamily: "OpenSans-Regular",
},
titleLarge: {
  fontFamily: "OpenSans-Regular",
},
labelSmall: {
  fontFamily: "OpenSans-Regular",
},
labelMedium: {
  fontFamily: "OpenSans-Regular",
},
labelLarge: {
  fontFamily: "OpenSans-Regular",
},
bodySmall: {
  fontFamily: "OpenSans-Regular",
},
bodyMedium: {
  fontFamily: "OpenSans-Regular",
},
bodyLarge: {
  fontFamily: "OpenSans-Regular",
}
};