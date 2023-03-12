import React, {
    Suspense, useEffect, useLayoutEffect, useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useLocation, useNavigate } from 'react-router-dom';
import { protectedRoutePath } from 'shared/config/routeConfig/protectedRouteConfig';
import { getChannels } from 'entities/Channels/model/services/getChannels/getChannels';
import { initWebSocketConnection } from 'processes/model/webSockets';
import { whoami } from 'features/Auth/model/services/whoami/whoami';
import ProtectedRouter from './providers/router/ui/ProtectedRouter';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const user = useSelector(getUserAuthData);

    const location = useLocation();
    const navigate = useNavigate();

    const isAllowPath = useMemo(() => location.pathname !== protectedRoutePath.login
            || location.pathname !== protectedRoutePath.register, [location.pathname]);

    useEffect(() => {
        dispatch(whoami());
    }, [dispatch]);

    useLayoutEffect(() => {
        if (!user && !isAllowPath) {
            navigate(protectedRoutePath.login);
        }
    }, [isAllowPath, user, navigate]);

    useEffect(() => {
        if (user && isAllowPath) {
            dispatch(getChannels({}));
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

    // TODO вынести SideBar В shared слой и ребёнком прокидывать всё, что надо

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
