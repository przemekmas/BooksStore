import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom'

function Layout() {
    const navigate = useNavigate();
    
    return (
        <>
            <AppBar position="static" sx={{ marginBottom: 3 }}>
                <Toolbar>
                    <Container sx={{ display: "flex" }}>
                        <Typography variant="h6">
                            Book Store 📖
                        </Typography>
                        <Box sx={{ paddingLeft: 2 }}>
                            <Button color="inherit" onClick={() => navigate("/viewbooks")}>Books</Button>
                        </Box>
                    </Container>

                </Toolbar>
            </AppBar>
            <Box>
                <Outlet />
            </Box>
        </>
    );
}

export default Layout;