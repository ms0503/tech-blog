'use strict';

import styles from '@/app/components/Footer.module.scss';
import { getCopyright } from '@/lib/info';
import type { JSX } from 'react';

export function Footer(): JSX.Element {
    return (
        <footer className={styles['footer']}>
            <div className={styles['copyright']}>
                <small>{getCopyright()}</small>
            </div>
        </footer>
    );
}
