import { StyleSheet } from 'react-native';

// this file contains all styles used in the app

// export app details
export const appName = 'Lawyer Forum';
export const appColor = 'white';
export const appComplementColor = 'black';

const styles = StyleSheet.create({
  header: {
    backgroundColor: appColor,
    alignItems: 'center'
  },
  header_text: {
    color: appColor,
    fontSize: 25
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
