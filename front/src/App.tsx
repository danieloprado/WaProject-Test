import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import FormFieldsContext from '@react-form-fields/material-ui/components/Context';
import ConfigBuilder from '@react-form-fields/material-ui/config/builder';
import { theme } from 'assets/theme';
import HomePage from 'components/Home';
import Toast from 'components/Shared/Toast';
import React, { Fragment, PureComponent } from 'react';
import Alert from 'components/Shared/Alert';

const fieldConfig = new ConfigBuilder()
  .build();

export default class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <FormFieldsContext config={fieldConfig}>
          <Fragment>
            <CssBaseline />

            <Toast.Global />
            <Alert.Global />

            <HomePage />
          </Fragment>
        </FormFieldsContext>
      </MuiThemeProvider>
    );
  }
}