import React from 'react';
import block from 'bem-cn-lite';
import {SwitchTheme} from '../SwitchTheme/SwitchTheme';
import './Header.scss';
import Link from 'next/link';

const b = block('header');
export const Header = () => {
    return (
        <header className={b()}>
            <div className={b('title')}>
                <Link href={'https://github.com/Iwakura-dev'}>
                    <h1>Iwakura</h1>
                </Link>
            </div>
            <div className={b('switch-theme')}>
                <SwitchTheme />
            </div>
        </header>
    );
};
