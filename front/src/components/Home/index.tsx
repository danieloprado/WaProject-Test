import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IStateList, ListComponent } from 'components/Abstract/List';
import Toolbar from 'components/Layout/Toolbar';
import TableWrapper from 'components/Shared/TableWrapper';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import { ISearchDefinition } from 'interfaces/searchDefinition';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { Fragment } from 'react';
import RxOp from 'rxjs-operators';
import searchDefinitionService from 'services/searchDefinition';
import { API_ENDPOINT } from 'settings';

import SearchDefinitionFormDialog from './Form';
import ListItem from './ListItem';
import styles from './styles';

interface IState extends IStateList<ISearchDefinition> {
  current?: ISearchDefinition;
  formOpened?: boolean;
}

interface IProps extends IStyledProps { }

@WithStyles(styles)
export default class HomePage extends ListComponent<IProps, IState> {
  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({ loading: true, error: false });

    searchDefinitionService.list().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(data => {
      this.setAllItems(data);
    }, err => this.setError(err));
  }

  handleCreate = () => {
    this.setState({ formOpened: true, current: null });
  }

  handleEdit = (current: ISearchDefinition) => {
    this.setState({ formOpened: true, current });
  }

  formCallback = () => {
    this.setState({ formOpened: false });
    this.loadData();
  }

  formCancel = () => {
    this.setState({ formOpened: false });
  }

  render() {
    const { items, loading, formOpened, current } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Ebay Search' />

        <SearchDefinitionFormDialog
          opened={formOpened || false}
          data={current}
          onComplete={this.formCallback}
          onCancel={this.formCancel}
        />

        <Card className={classes.cardContent}>
          {this.renderLoader()}

          <CardContent className={classes.cardButtons}>
            <Button href={`${API_ENDPOINT}/swagger`} target='_blank'>
              Show API
            </Button>

            <Button variant='contained' color='secondary' onClick={this.handleCreate}>
              Add New
            </Button>
          </CardContent>

          <TableWrapper minWidth={500}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Phrase</TableCell>
                  <TableCell>Interval</TableCell>
                  <TableCell className={classes.tdAction}>
                    <IconButton disabled={loading} onClick={() => this.loadData()}>
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderEmptyAndErrorMessages(4)}
                {items.map(item =>
                  <ListItem
                    key={item._id}
                    data={item}
                    onEdit={this.handleEdit}
                    onDeleteComplete={this.loadData}
                  />
                )}
              </TableBody>
            </Table>
          </TableWrapper>
          {this.renderTablePagination()}
        </Card>

      </Fragment>
    );
  }
}