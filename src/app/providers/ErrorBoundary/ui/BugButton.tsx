import React, { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BugButton.module.scss';

interface BugButtonProps {
    className?: string,
}

export const BugButton: FC<BugButtonProps> = ({ className }) => {
    const [error, setError] = useState(false);

    const throwError = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);
    return (
        <div
            onClick={throwError}
            className={classNames(cls.BugButton, {}, [className])}
        >
            throw error
        </div>
    );
};
