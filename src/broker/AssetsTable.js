import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from "react";
import { GetQuote } from "../API/QuoteAPI";
import isPropValid from '@emotion/is-prop-valid'


const StyledTableCell = styled(TableCell, {
    shouldForwardProp: prop => isPropValid(prop)
})(({ theme }) => ({
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

function createData(symbol, current, amplitude, volume, low, high) {
    return { symbol, current, amplitude, volume, low, high};
}

const initialRows = [
    createData('AAPL', 159, 6.0, 24, 180, 200),
    createData('TSLA', 237, 9.0, 37, 180, 200),
    createData('NVDA', 262, 16.0, 24, 180, 200),
    createData('ARKK', 305, 3.7, 67, 180, 200),
];

export default function AssetsTable(props) {
    const { user } = props
    const [rows, setRows] = useState(initialRows)
    const prevRowsRef = useRef(initialRows);

    useEffect(() => {
        rows.map(r => {
            let prevRow
            prevRowsRef.current.map(tmp => {
                if (tmp.symbol == r.symbol) {
                    prevRow = tmp
                    return
                }
            })
            if (!prevRow) {
                return
            }
            const target = document.getElementById(r.symbol)
            target.animate({ opacity: [0, 1] }, 600);
            target.style.color = prevRow?.current < r.current ? 'green' : 'red'
        })
        prevRowsRef.current = rows
    }, [rows]);

    useEffect(() => {
        if (!user) {
            return
        }
        const timer = setInterval(async () => {
            let symbols = []
            rows.map(r => symbols.push(r.symbol))
            const r = await GetQuote(symbols.join(','), 'US')
            let newRows = []
            r.data.items.map(item => {
                const q = item.quote
                newRows.push({symbol: q.symbol, current: q.current, amplitude: q.amplitude, volume: q.volume, low: q.low, high: q.high})
            })
            setRows(newRows)
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, [user]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ALL</StyledTableCell>
                        <StyledTableCell align="right">CURRENT</StyledTableCell>
                        <StyledTableCell align="right">AMPLITUDE</StyledTableCell>
                        <StyledTableCell align="right">VOLUME</StyledTableCell>
                        <StyledTableCell align="right">LOW</StyledTableCell>
                        <StyledTableCell align="right">HIGH</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.symbol}>
                            <StyledTableCell component="th" scope="row">
                                {row.symbol}
                            </StyledTableCell>
                            <StyledTableCell align="right" id={row.symbol} >{row.current}</StyledTableCell>
                            <StyledTableCell align="right">{row.amplitude}</StyledTableCell>
                            <StyledTableCell align="right">{row.volume}</StyledTableCell>
                            <StyledTableCell align="right">{row.low}</StyledTableCell>
                            <StyledTableCell align="right">{row.high}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}