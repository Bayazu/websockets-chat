import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useLocation, useNavigate } from 'react-router-dom';
import { protectedRoutePath } from 'shared/config/routeConfig/protectedRouteConfig';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getChannels } from 'entities/Channels/model/services/getChannels/getChannels';
import { initWebSocketConnection } from 'processes/model/webSockets/services/initWebSocketConnection';
import ProtectedRouter from './providers/router/ui/ProtectedRouter';

function App() {
    const dispatch = useDispatch();
    const user = useSelector(getUserAuthData);
    const { theme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const isAllowPath = location.pathname !== protectedRoutePath.login
        || location.pathname !== protectedRoutePath.register;

    useLayoutEffect(() => {
        if (!user && !isAllowPath) {
            navigate(protectedRoutePath.login);
        }
    }, [isAllowPath, user, navigate]);

    useEffect(() => {
        if (user && isAllowPath) {
            dispatch(getChannels({}));
            navigate(RoutePath.main);
        }
    }, [isAllowPath, user, navigate, dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(initWebSocketConnection(user));
        }
    }, [dispatch, user]);

    if (!user) {
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
