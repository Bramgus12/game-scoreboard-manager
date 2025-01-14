import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Language } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n/client";

export default function DeleteRoundDialog(props: {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    lng: Language;
}) {
    const { open, onClose, onSubmit, lng } = props;

    const { t } = useTranslation(lng, "scoreboardCurrentPage");

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
