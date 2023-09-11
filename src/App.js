import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import AddTrain from './Components/AddTrain';
import BookTicket from './Components/BookTicket';
import { useState } from 'react';
import UserHeader from './Components/UserHeader';
import AdminHeader from './Components/AdminHeader';
import Search from './Components/Search/Search';
import Bookings from './Components/Bookings';
import Footer from './Components/Footer';
import Header from './Components/Header';
import TrainHome from './Components/TrainHome';
import AdminHome from "./Components/AdminHome";

function App() {
    const [userRole, setUserRole] = useState(() => {
        const storedUserRole = localStorage.getItem('userRole');
        return storedUserRole || 'default';
    });

    const [email, setemail] = useState(localStorage.getItem('email') || 'default');

    const renderHeader = () => {
        if (userRole === 'Admin') return <AdminHeader userRole={userRole} setUserRole={setUserRole} />;
        else if (userRole === 'User') return <UserHeader userRole={userRole} setUserRole={setUserRole} />;
        else if (userRole === 'default') return <Header />;
    };

    const renderUserPage = () => {
        if (userRole === 'Admin') return <AdminHome email={email} />;
        else if (userRole === 'User') return <TrainHome email={email} />;
        else return <Home />;
    };

    return (
        <div className="app-container">
            <Router>
                {renderHeader()}

                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/register" exact component={Signup} />
                        <Route
                            path="/login"
                            render={() => <Signin setUserRole={setUserRole} setemail={setemail} />}
                        />
                        <Route path="/UserHome" render={() => renderUserPage()} />
                        <Route path="/AddTrain" render={() => <AddTrain />} />
                        <Route path="/search" exact component={Search} />
                        <Route path="/BookTicket" render={() => <BookTicket email={email} />} />
                        <Route path="/Bookings" render={() => <Bookings email={email} />} />
                    </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
