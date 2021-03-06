import IconButton from '@material-ui/core/IconButton';
import Alert from 'components/Shared/Alert';
import { WithStyles } from 'decorators/withStyles';
import { errorMessageFormatter } from 'formatters/errorMessage';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import React, { PureComponent } from 'react';

interface IProps {
  error: any;
  onDismiss?: Function;
  className?: string;
  classes?: any;
}

@WithStyles(theme => ({
  icon: {
    opacity: 0.8,
    color: theme.palette.error.main
  }
}))
export default class ErrorMessageIcon extends PureComponent<IProps> {
  async showAlert() {
    const { error, onDismiss } = this.props;

    await Alert.show(errorMessageFormatter(error));
    onDismiss && onDismiss();
  }

  render() {
    const { classes, className } = this.props;

    return (
      <IconButton className={className} onClick={() => this.showAlert()}>
        <AlertCircleIcon className={classes.icon} />
      </IconButton>
    );
  }
}