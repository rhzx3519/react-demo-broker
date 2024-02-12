import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#eee',
        color: theme.palette.common.black,
        fontSize: 12,
        opacity: 0.5,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.common.white,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, currentPrice, priceChange, turnover, totalValue, yearToDate) {
    return { name, currentPrice, priceChange, turnover, totalValue, yearToDate };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 0),
    createData('Eclair', 262, 16.0, 24, 6.0, 0),
    createData('Cupcake', 305, 3.7, 67, 4.3, 0),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
];

export default function AssetsTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ALL</StyledTableCell>
                        <StyledTableCell align="right">CURRENT PRICE</StyledTableCell>
                        <StyledTableCell align="right">PRICE CHANGE</StyledTableCell>
                        <StyledTableCell align="right">TOTAL VALUE</StyledTableCell>
                        <StyledTableCell align="right">TURNOVER</StyledTableCell>
                        <StyledTableCell align="right">YEAR TO DATE</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.currentPrice}</StyledTableCell>
                            <StyledTableCell align="right">{row.priceChange}</StyledTableCell>
                            <StyledTableCell align="right">{row.turnover}</StyledTableCell>
                            <StyledTableCell align="right">{row.totalValue}</StyledTableCell>
                            <StyledTableCell align="right">{row.yearToDate}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}