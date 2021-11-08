import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }

    let disableUndoButton = true;
    if(store.canUndo()){
        disableUndoButton = false;
    }

    let disableRedoButton = true;
    if(store.canRedo()){
        disableRedoButton = false;
    }
    let disableCloseButton = false;

    let editActive = store.isItemEditActive;
    if(editActive){
        disableRedoButton = true;
        disableUndoButton = true;
        disableCloseButton = true;
    }
    
    return (
        <div id="edit-toolbar">
            <Button 
                disabled={disableUndoButton}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={disableRedoButton}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={disableCloseButton}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;