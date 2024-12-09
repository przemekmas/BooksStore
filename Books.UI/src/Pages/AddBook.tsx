import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../Types/Book";
import api from "../Utils/Api";

function AddBook() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [formData, setFormData] = useState<Book>({
        id: -1,
        name: '',
        description: ''
    });

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        api.post("/books/book", formData)
            .finally(() => {
                setIsLoading(false);
                queryClient.invalidateQueries({ queryKey: ['getBooks'] });
                navigate("/viewbooks", { state: { message: `Book "${formData?.name}" was successfully added.` } });
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ marginBottom: 3 }}>Add Book</Typography>
            <form onSubmit={handleAddBook}>
                <Grid container spacing={2}>
                    <Grid size={8} offset={2}>
                        <TextField
                            required
                            sx={{ minWidth: 400 }}
                            id="outlined-basic"
                            name='name'
                            label="Name:"
                            variant="outlined"
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
                            onChange={handleChange} />
                    </Grid>
                </Grid>

                <Button type="submit" variant="outlined" sx={{ marginTop: 3, minWidth: 200 }}>Add Book</Button>
            </form>
        </>
    );
}

export default AddBook;