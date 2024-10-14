import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

export default function DeleteRoundDialog(props: {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}) {
    const { open, onClose, onSubmit } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Round?</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this round?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}
