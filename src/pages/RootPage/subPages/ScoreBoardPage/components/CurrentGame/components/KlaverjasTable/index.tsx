import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function KlaverjasTable() {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">Round</TableCell>
                    <TableCell align="right">Us</TableCell>
                    <TableCell align="right">Them</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.from({ length: 16 }, (_, i) => (
                    <TableRow key={i}>
                        <TableCell sx={{ width: 20, padding: 1 }}>{i + 1}</TableCell>
                        <TableCell sx={{ padding: 1 }} align="right">
                            150
                        </TableCell>
                        <TableCell sx={{ padding: 1 }} align="right">
                            10
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
