import React, { useState } from 'react';
import styles from '@/shared/css/Setting.module.css';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";



export function Setting() {

    return (
        <>
            <button
                className={styles.Setting}
            >
                <HiOutlineAdjustmentsHorizontal />
                정렬
            </button>
        </>
    );
}