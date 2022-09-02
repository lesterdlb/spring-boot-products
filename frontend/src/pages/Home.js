import {useNavigate} from 'react-router-dom';
import useAuth from "../hooks/useAuth";

function Home() {
    const auth = useAuth();
    const title = 'React Bootstrap Template';

    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.logout();
    }

    return (
        <>
            <main className="container-fluid">
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold">{title}</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">
                            A simple, clean starter web app project with React and Bootstrap 5.
                        </p>
                        {auth.isAuthenticated && (
                            <>
                                <h2>Username: {auth.user.username}</h2>
                            </>
                        )}
                        {auth.isAuthenticated ? (
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button type="button"
                                        className="btn btn-outline-secondary btn-lg px-4"
                                        onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button type="button"
                                        className="btn btn-outline-secondary btn-lg px-4"
                                        onClick={() => navigate('/register')}
                                >
                                    Register
                                </button>
                                <button type="button"
                                        className="btn btn-primary btn-lg px-4 gap-3"
                                        onClick={() => navigate('/login')}
                                >
                                    Log in
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;