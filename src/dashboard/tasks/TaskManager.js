import { useState, useRef, useCallback } from "react";
import { TableContainer, Rating, Box } from "@mui/material";
import { useFetchTasks } from "../hooks/useFetchTodoist";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { updateTask, createTask, deleteTask } from "./TaskAPI";
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  useGridApiContext,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import { EnhancedTableToolbar, EditToolbar} from "./TaskToolBar";




const TaskManager = () => {
  const [refresh, setRefresh] = useState(0);
  const [selected, setSelected] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

  const { tasks, setTasks, loading } = useFetchTasks(refresh);

  const [rowModesModel, setRowModesModel] = useState({});


  const renderRating = function (params) {
    return <Rating readOnly value={params.value} max={4} />;
  }

  function RatingEditInputCell(props) {
    const { id, value, field, hasFocus } = props;
    const apiRef = useGridApiContext();
    const ref = useRef();

    const handleChange = (event, newValue) => {
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    useEnhancedEffect(() => {
      if (hasFocus && ref.current) {
        const input = ref.current.querySelector(`input[value="${value}"]`);
        input?.focus();
      }
    }, [hasFocus, value]);

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
        <Rating
          ref={ref}
          name="rating"
          precision={1}
          value={value}
          max={4}
          onChange={handleChange}
        />
      </Box>
    );
  }

  const renderRatingEditInputCell = (params) => {
    return <RatingEditInputCell {...params} />;
  };

  const renderDate = function (params) {
    const value = params.value instanceof Date && !isNaN(params.value) ? params.value.toLocaleDateString() : '';
    return (<Box>{value}</Box>);
  }

  const columns = [
    { field: 'order', headerName: 'ID', width: 100 },
    {
      field: 'content', headerName: 'Task', width: 200, editable: true,
      preProcessEditCellProps: (params) => {
        const content = params.props.value
        const error = validateTaskContent(content)
        return { ...params.props, error: error };
      }
    },
    {
      field: 'labels', headerName: 'Labels', width: 300, editable: true,

    },
    {
      field: 'due_date', headerName: 'Due date', type: 'date', renderCell: renderDate, width: 100, editable: true,
      preProcessEditCellProps: (params) => {
        const dueDate = params.props.value
        const error = validateDueDate(dueDate);
        return { ...params.props, error: error };
      }
    },
    {
      field: 'priority',
      headerName: 'Priority',
      type: 'number',
      width: 150,
      renderCell: renderRating,
      renderEditCell: renderRatingEditInputCell,
      preProcessEditCellProps: (params) => {
        const priority = params.props.value
        const error = validateTaskPriority(priority);
        return { ...params.props, error: error };
      },
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const validateTaskContent = (content) => {
    let error = false
    if (content.trim() === '') {
      error = new Error('Task content must not be empty.')
      setSnackbar({ children: error.message, severity: 'error' });
    }
    return error;
  }

  const validateDueDate = (dueDate) => {
    let error = false
    const now = new Date()
    if (dueDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      error = new Error('Due date must be later than today.')
      setSnackbar({ children: error.message, severity: 'error' });
    }
    return error;
  }

  const validateTaskPriority = (priority) => {
    let error = false
    if (priority < 1 || priority > 4) {
      error = new Error('Priority must between 1 and 4.')
      setSnackbar({ children: error.message, severity: 'error' });
    }
    return error;
  }


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    await deleteTask(id)
    setRefresh(randomId())
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = tasks.find((row) => row.id === id);
    if (editedRow.isNew) {
      setTasks(tasks.filter((row) => row.id !== id));
    }
  };

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  // Will be called after update or create a row.
  const processRowUpdate = async (newRow) => {
    let error = false
    error = validateTaskContent(newRow.content)
    validateDueDate(newRow.due_date) &&
      validateTaskPriority(newRow.priority)
    if (error) {
      return error
    }

    const updated = {
      content: newRow.content,
      labels: newRow.labels.split(',').map(s => s.trim()).filter(s => s !== ''),
      priority: newRow.priority,
      due_date: newRow.due_date.toLocaleDateString('en-CA'),
      isNew: false
    }
    if (newRow.isNew) { // create a new row
      await createTask(updated)
      return newRow
    }

    // otherwise update the row
    await updateTask(newRow.id, updated)
    setRefresh(randomId())
    return newRow
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { tasks, setTasks, setRowModesModel },
          }}
        />
      </TableContainer>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setSnackbar(null)}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </div>
  );
};

export default TaskManager;