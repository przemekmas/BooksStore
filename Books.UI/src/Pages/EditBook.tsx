import { Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Book } from "../Types/Book";
import api from "../Utils/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function EditBook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState<Book>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsLoading(true);

        api.get<Book>(`/books/book/${id}`)
            .then(result => {
                setBook(result.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (book) {
            setBook({ ...book, [name]: value });
        }
    };

    const handleEditBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        api.put(`/books/book/${id}`, book)
            .finally(() => {
                setIsLoading(false);
                queryClient.invalidateQueries({ queryKey: ['getBooks'] });
                navigate("/viewbooks", { state: { message: `Book "${book?.name}" was successfully edited.` } });
            });
    };

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ marginBottom: 3 }}>Edit Book</Typography>
            {
                isLoading ? <CircularProgress /> :
                    <form onSubmit={handleEditBook}>
                        <Grid container spacing={2}>
                            <Grid size={8} offset={2}>
                                <TextField
                                    required
                                    sx={{ minWidth: 400 }}
                                    id="outlined-basic"
                                    name='name'
                                    label="Name:"
                                    variant="outlined"
                                    value={book?.name}
                                    onChange={handleChange} />
                            </Grid>
                            <Grid size={8} offset={2}>
                                <TextField
                                    required
                                    sx={{ minWidth: 400 }}
                                    id="outlined-basic"
                                    name='description'
                                    label="Description:"
                                    variant="outlined"
                                    value={book?.description}
                                    onChange={handleChange} />
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="outlined" sx={{ marginTop: 3, minWidth: 200 }}>Save Changes</Button>
                    </form>
            }
        </>
    );
}

export default EditBook;