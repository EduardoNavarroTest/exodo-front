import { useState, useEffect, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "../SearchModal/SearchModal.jsx";
import AlertDialog from "../../AlertDialog/AlertDialog.jsx";
import useApiSizes from "../../../hooks/api/useApiSizes.js";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.jsx";
import CustomSnackbar from "../../CustomSnackbar/CustomSnackbar.jsx";

const FormSize = () => {
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [oldCode, setOldCode] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState("");

  const { getSizeByCode, deleteSize, editSize, saveSize, getSizes } =
    useApiSizes();

  const sizeRef = useRef(null);
  const descriptionRef = useRef(null);
  const codeRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenDialog(true);
    setActionType(isEditMode ? "edit" : "save");
  };

  const handleCreate = async () => {
    // Implementación del guardado
  };

  const handleEdit = async () => {
    // Implementación de la edición
  };

  const handleDelete = async () => {
    // Implementación de la eliminación
  };

  const handleClear = () => {
    setId("");
    setCode("");
    setOldCode("");
    setSize("");
    setDescription("");
    setStatus(true);
    setIsEditMode(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "500px",
        margin: "0 auto",
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#0d6efd",
          marginBottom: 2,
        }}
      >
        Maestro de Tallas
      </Typography>

      <TextField
        id="code"
        label="Código"
        variant="outlined"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        required
        inputRef={codeRef}
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setIsSearchOpen(true)} size="small">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />

      <TextField
        id="size"
        label="Talla"
        variant="outlined"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        required
        fullWidth
        inputRef={sizeRef}
      />

      <TextField
        id="description"
        label="Descripción"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        inputRef={descriptionRef}
      />

      <FormControlLabel
        control={
          <Switch
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        }
        label="Activo"
        sx={{ alignSelf: "flex-start" }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          sx={{ flex: 1, minWidth: "120px" }}
        >
          {isEditMode ? "Editar" : "Guardar"}
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleClear}
          startIcon={<HighlightOffIcon />}
          sx={{ flex: 1, minWidth: "120px" }}
        >
          Limpiar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenDialog(true)}
          startIcon={<DeleteIcon />}
          disabled={!isEditMode}
          sx={{ flex: 1, minWidth: "120px" }}
        >
          Eliminar
        </Button>
      </Box>

      
      <AlertDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        actionType={actionType}
      />
      <LoadingSpinner loading={loading} />
      <CustomSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default FormSize;
