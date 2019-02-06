import { StyleSheet } from 'react-native';

// this file contains all styles used in the app

// export app details
export const appName = 'Lawyer Forum';
export const appColor = '#0D4F7B';
export const appComplementColor = 'white';

const styles = StyleSheet.create({
  header: {
    backgroundColor: appColor,
    alignItems: 'center'
  },
  header_text: {
    color: appComplementColor
  },
  text_head: {
    fontSize: 20
  },
  button_style: {
    paddingVertical: 10,
    width: 200
  }
});

export default styles;
