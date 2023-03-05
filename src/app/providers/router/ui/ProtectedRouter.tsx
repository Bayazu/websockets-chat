import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { protectedRouteConfig } from 'shared/config/routeConfig/protectedRouteConfig';

const ProtectedRouter = () => (
    <Routes>
        {Object.values(protectedRouteConfig).map(({ path, element }) => (
            <Route
                key={path}
                path={path}
                element={(
                    <Suspense fallback={<PageLoader />}>
                        <div className="page-login-wrapper">
                            {element}
                        </div>
                    </Suspense>
                )}
            />
        ))}
    </Routes>
);

export default ProtectedRouter;
