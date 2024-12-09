import { Alert, Box, Button, CircularProgress, Container, Modal, Paper, Snackbar, SnackbarCloseReason, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Book } from "../Types/Book";
import api from "../Utils/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    pt: 2,
    px: 4,
    pb: 3,
};

function ViewBooks() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState<boolean>();
    const [open, setOpen] = useState<boolean>(false);
    const [bookToDelete, setBookToDelete] = useState<Book>();
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const queryClient = useQueryClient();
    
    const { data, error, isLoading, isRefetching } = useQuery<Book[]>({
        queryKey: ['getBooks'],
        queryFn: async () => {
            const response = await api.get<Book[]>('/books/book');
            return response.data;
        },
        retry: 3,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 5
    });

    useEffect(() => {
        if (location.state?.message) {
            setSnackbarMessage(location.state.message);
            setSnackbarOpen(true);
            navigate(location.pathname, { replace: true });
        }
    }, [location.state]);

    const OnDeleteRow = (book: Book) => {
        setBookToDelete(book);
        setOpen(true);
    }

    const OnDeleteRowConfirm = () => {
        if (bookToDelete) {
            setIsDeleting(true);

            api.delete("/books/book", {
                params: { id: bookToDelete.id }
            }).finally(() => {
                setIsDeleting(false);
                setOpen(false);
                queryClient.invalidateQueries({ queryKey: ['getBooks'] });
                setSnackbarMessage(`Successfully deleted book "${bookToDelete.name}"`);
                setSnackbarOpen(true);
            });
        }
    }

    const OnEditRow = (id: number) => {
        navigate(`/editbook/${id}`);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" sx={{ marginBottom: 3 }}>View Books</Typography>
            <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/addBook")}
                sx={{ marginBottom: 3 }}>Add Book</Button>
            {
                error ? <Alert variant="filled" severity="error">{error.message}</Alert> : isLoading || isRefetching ? <CircularProgress /> :
                    <Container>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><b>Id</b></TableCell>
                                        <TableCell align="left"><b>Name</b></TableCell>
                                        <TableCell align="left"><b>Description</b></TableCell>
                                        <TableCell align="right"><b>Actions</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left" width={250}>{row.name}</TableCell>
                                            <TableCell align="left" width={450}>{row.description}</TableCell>
                                            <TableCell align="right">
                                                <Grid container spacing={2}>
                                                    <Grid size={6}>
                                                        <Button
                                                            type="button"
                                                            variant="outlined"
                                                            color="inherit"
                                                            sx={{ width: "100%" }}
                                                            onClick={() => OnDeleteRow(row)}>Delete</Button>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Button
                                                            variant="outlined"
                                                            color="inherit"
                                                            sx={{ width: "100%" }}
                                                            onClick={() => OnEditRow(row.id)}>Edit</Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description">
                            <Box sx={{ ...style, width: 400 }}>
                                <Typography variant="h4" component="h3" sx={{ marginBottom: 3 }}>Delete Confirmation</Typography>
                                <p id="parent-modal-description">
                                    Are you sure you want to delete the "{bookToDelete?.name}" book?
                                </p>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            color="inherit"
                                            sx={{ width: "100%" }}
                                            onClick={OnDeleteRowConfirm}>Yes</Button>
                                    </Grid>
                                    <Grid size={6}>
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            sx={{ width: "100%" }}
                                            onClick={() => setOpen(false)}>No</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Modal>
                        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                            <Alert
                                onClose={handleSnackbarClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </Container>
            }
        </Container>
    );
}

export default ViewBooks;