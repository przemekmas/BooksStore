import { Outlet, Link } from 'react-router-dom'

function Layout() {
    return (
        <>
            <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;
            <Outlet />
        </>
    );
}

export default Layout;