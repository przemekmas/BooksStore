import { useEffect, useState } from "react";
import { Book } from "../Types/Book";
import api from "../Utils/Api";

function ViewBooks() {
    const [bookData, setBookData] = useState<Book[]>();

    useEffect(() => {
        api.get<Book[]>("/books/book")
            .then(result => {
                setBookData(result.data);
            });
    }, [])

    return (
        <>
            <h1>View Books</h1>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        bookData?.map(x => (
                            <tr>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.description}</td>
                            </tr>
                        ))
                    }
                </tbody>


            </table>
        </>
    );
}

export default ViewBooks;