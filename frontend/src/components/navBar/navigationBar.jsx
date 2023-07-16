import { Link } from 'react-router-dom';

function NavigationBar() {
    return(
        <nav className="navbar navbar-expand-md" style = {{backgroundColor: "#60ff70"}}>
            <div className="container-fluid">
                <a className="navbar-brand">Logo</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to = "/" className = "nav-link">Hjem</Link>
                        <Link to = "/kalender" className = "nav-link">Kalender</Link>
                        <Link to = "/ny-aktivitet" className = "nav-link">Ny aktivetet</Link>
                        <Link to = "/kommende-aktiviteter" className = "nav-link">Kommende aktiviteter</Link>
                    </div>
                    <div className="navbar-nav ms-auto">
                        <Link to = "/log-in" className="nav-link float-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;