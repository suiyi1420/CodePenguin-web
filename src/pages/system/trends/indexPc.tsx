

import React, { useState, useEffect, useMemo, useRef } from 'react';

import styles from './index.less';
import List from './list'
import TrendsForm from './component/trendsForm';

const TrendsPC: React.FC = () => {
const [random,setRandom]=useState(0.0);
console.log("random",random)
    return (
        <>
            <div className={styles["trehds-pc"]}>
                <div className={`${styles["left"]} ${styles["trehds-pc-item"]}`}>
                    <div className={`${styles["title"]}`}><strong>&nbsp;&nbsp;&nbsp;列表页</strong></div>
                    <div className={`${styles["trehds-pc-item-box"]}`}>

                        <List random={random}/>
                    </div>
                </div>
                <div className={`${styles["right"]} ${styles["trehds-pc-item"]}`}>
                    <div className={`${styles["title"]}`}><strong>&nbsp;&nbsp;&nbsp;发布页</strong></div>
                    <div className={`${styles["right"]} ${styles["trehds-pc-item-box"]}`}>

                        <TrendsForm callBack={setRandom}/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TrendsPC;