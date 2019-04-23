import { AppStyle } from 'decorators/withStyles';

const styles: AppStyle = {
  cardContent: {
    margin: 20,
  },
  cardButtons: {
    textAlign: 'right',
    '& a': {
      marginRight: 16
    }
  },
  tdAction: {
    width: 50,
    whiteSpace: 'nowrap',
    paddingRight: '5px! important',
    textAlign: 'right'
  }
};

export default styles;