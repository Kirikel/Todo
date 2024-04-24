'use client';

import React from 'react';
import block from 'bem-cn-lite';
import {ColorTheme} from '@/types/types';

import {Button, Icon, Theme, ThemeProvider} from '@gravity-ui/uikit';
import {Moon, Sun} from '@gravity-ui/icons';

const b = block('wrapper');

const DEFAULT_THEME = ColorTheme.LIGHT;

export const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export const SwitchTheme = () => {
    const [theme, setTheme] = React.useState<Theme>(DEFAULT_THEME);

    const isDark = theme === ColorTheme.DARK;

    return (
        <ThemeProvider theme={theme}>
            <div className={b()}>
                <Button
                    size="l"
                    view="outlined"
                    onClick={() => {
                        setTheme(isDark ? ColorTheme.LIGHT : ColorTheme.DARK);
                    }}
                >
                    <Icon data={isDark ? Sun : Moon} />
                </Button>
            </div>
        </ThemeProvider>
    );
};
