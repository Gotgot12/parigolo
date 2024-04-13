import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import React from "react"

const Leaderboard = () => {
    const rows = [
        {id: 1, pseudo: 'Got', score: 302.2}
    ]

    return (
        <Box className="flex flex-col items-center mt-5 gap-y-6">
            <h1 className="font-bold text-2xl">Leaderboard</h1>
            <Box className="w-2/3">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Position</TableCell>
                                <TableCell align="center">Pseudo</TableCell>
                                <TableCell align="center">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, position) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {position}
                                    </TableCell>
                                    <TableCell align="center">{row.pseudo}</TableCell>
                                    <TableCell align="center">{row.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Leaderboard