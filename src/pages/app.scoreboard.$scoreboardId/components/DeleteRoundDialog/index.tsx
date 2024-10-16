import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function DeleteRoundDialog(props: {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}) {
    const { open, onClose, onSubmit } = props;

    const { t } = useTranslation("scoreboardCurrentPage");

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t("deleteDialog.title")}</DialogTitle>
            <DialogContent>{t("deleteDialog.description")}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t("deleteDialog.cancel")}</Button>
                <Button onClick={onSubmit}>{t("deleteDialog.delete")}</Button>
            </DialogActions>
        </Dialog>
    );
}
