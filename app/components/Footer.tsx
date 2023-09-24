'use strict';

import styles from '@/app/components/Footer.module.scss';
import type { JSX } from 'react';

export function Footer(): JSX.Element {
    return (
        <footer className={styles['footer']}>
            <div className={styles['copyright']}>
                <small>Copyright &copy; 2023 Sora Tonami. All rights reserved.</small>
            </div>
        </footer>
    );
}
