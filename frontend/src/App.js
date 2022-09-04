import {
    BrowserRouter, Navigate, Routes, Route, Outlet,
} from 'react-router-dom';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import NotFound from './pages/NotFound';
import Categories from "./pages/Categories";
import AddEditCategory from "./pages/AddEditCategory";
import Products from "./pages/Products";
import AddEditProduct from "./pages/AddEditProduct";

// Hooks
import AuthProvider from './hooks/AuthProvider';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="categories" element={<Outlet/>}>
                            <Route index element={<Categories />} />
                            <Route path="edit/:id" element={<AddEditCategory />}/>
                            <Route path="add/" element={<AddEditCategory />}/>
                        </Route>
                        <Route path="products" element={<Outlet/>}>
                            <Route index element={<Products />} />
                            <Route path="edit/:id" element={<AddEditProduct />}/>
                            <Route path="add/" element={<AddEditProduct />}/>
                        </Route>
                        <Route path="not-found" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/not-found" />} />
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;