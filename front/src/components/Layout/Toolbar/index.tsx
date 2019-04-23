import AppBar from '@material-ui/core/AppBar';
import CoreToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

interface IProps extends IStyledProps {
  title: string;
}

@WithStyles(theme => ({
  root: {
    height: theme.variables.headerHeight,
    marginTop: theme.variables.contentPadding * -1,
    marginBottom: theme.variables.contentPadding,
  },
  appBar: {
    marginLeft: theme.variables.drawerWidth,
  }
}))
export default class Toolbar extends PureComponent<IProps> {
  render() {
    const { classes, title } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} color='primary'>

          <CoreToolbar>
            <Typography variant='h6' color='inherit'>{title}</Typography>
          </CoreToolbar>
        </AppBar>
      </div>
    );
  }
}