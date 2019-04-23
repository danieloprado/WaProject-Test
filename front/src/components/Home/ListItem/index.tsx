import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { WithStyles } from '@react-form-fields/material-ui/decorators/withStyles';
import ListItemComponent, { IStateListItem } from 'components/Abstract/ListItem';
import Alert from 'components/Shared/Alert';
import { IOption } from 'components/Shared/DropdownMenu';
import Toast from 'components/Shared/Toast';
import { IStyledProps } from 'decorators/withStyles';
import { ISearchDefinition } from 'interfaces/searchDefinition';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import * as React from 'react';
import * as RxOp from 'rxjs-operators';
import searchDefinitionService from 'services/searchDefinition';

interface IState extends IStateListItem {
  deleted?: boolean;
}

interface IProps extends IStyledProps {
  data: ISearchDefinition;
  onEdit: (data: ISearchDefinition) => void;
  onDeleteComplete: () => void;
}

@WithStyles({
  tdAction: {
    width: 50,
    whiteSpace: 'nowrap',
    paddingRight: '5px! important',
    textAlign: 'right'
  }
})
export default class ListItem extends ListItemComponent<IProps, IState> {
  private readonly options: IOption[];

  constructor(props: IProps) {
    super(props);
    this.options = [{
      text: 'Edit',
      icon: EditIcon,
      handler: this.handleEdit
    }, {
      text: 'Delete',
      icon: DeleteIcon,
      handler: this.handleDelete
    }];
  }

  handleEdit = () => {
    const { data, onEdit } = this.props;
    onEdit(data);
  }

  handleDelete = async () => {
    const { data, onDeleteComplete } = this.props;

    const ok = await Alert.confirm('Do you really want to delete this item?');
    if (!ok) return;

    this.setState({ loading: true });

    searchDefinitionService.delete(data._id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      Toast.show(`${data.email} deleted`);
      this.setState({ loading: false, deleted: true });
      onDeleteComplete();
    }, error => {
      this.setState({ loading: false, error });
    });
  }

  render(): JSX.Element {
    const { deleted } = this.state;
    const { data, classes } = this.props;

    if (deleted) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>{data.email}</TableCell>
        <TableCell>{data.phrase}</TableCell>
        <TableCell>{data.interval} minutes</TableCell>
        <TableCell className={classes.tdAction}>
          {this.renderSideMenu(this.options)}
        </TableCell>
      </TableRow>
    );
  }
}