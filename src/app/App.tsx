import React, { Suspense, useLayoutEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useLocation, useNavigate } from 'react-router-dom';
import { protectedRoutePath } from 'shared/config/routeConfig/protectedRouteConfig';
import ProtectedRouter from './providers/router/ui/ProtectedRouter';

function App() {
    const isUserAuth = useSelector(getUserAuthData);
    const { theme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const isAllowPath = location.pathname !== protectedRoutePath.login
        || location.pathname !== protectedRoutePath.register;

    useLayoutEffect(() => {
        if (!isUserAuth && !isAllowPath) {
            navigate('/login');
        }
    }, [isAllowPath, isUserAuth, navigate]);

    if (!isUserAuth) {
        return (
            <div className={classNames('app', {}, [theme])}>
                <Suspense fallback="">
                    <div className="content-page">
                        <ProtectedRouter />
                    </div>
                </Suspense>
            </div>
        );
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
