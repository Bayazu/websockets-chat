import { RouteProps } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { RegisterPage } from 'pages/RegisterPage';

export enum protectedAppRoutes {
    NOT_FOUND = 'not_found',
    LOGIN = 'login',
    REGISTER = 'register',
}

export const protectedRoutePath: Record<protectedAppRoutes, string> = {
    [protectedAppRoutes.LOGIN]: '/login',
    [protectedAppRoutes.REGISTER]: '/register',
    [protectedAppRoutes.NOT_FOUND]: '*',
};

export const protectedRouteConfig: Record<protectedAppRoutes, RouteProps> = {
    [protectedAppRoutes.LOGIN]: {
        path: protectedRoutePath.login,
        element: <LoginPage />,
    },
    [protectedAppRoutes.REGISTER]: {
        path: protectedRoutePath.register,
        element: <RegisterPage />,
    },
    [protectedAppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
