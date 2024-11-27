import { useState } from "react";
import { Book } from "../Types/Book";
import api from "../Utils/Api";

function AddBook() {
    const [formData, setFormData] = useState<Book>({
        id: -1,
        name: '',
        description: ''
    });

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        api.post("/books/book", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <h1>Add Book</h1>

            <form onSubmit={handleAddBook}>
                <div className="form-row">
                    <label>Id:</label>
                    <input type='text' value={formData?.id} name='id' onChange={handleChange}></input>
                </div>
                <div className="form-row">
                    <label>Name:</label>
                    <input type='text' value={formData?.name} name='name' onChange={handleChange}></input>
                </div>
                <div className="form-row">
                    <label>Description:</label>
                    <input type='text' value={formData?.description} name='description' onChange={handleChange}></input>
                </div>

                <button type="submit">Add Book</button>
            </form>
        </>
    );
}

export default AddBook;