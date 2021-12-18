import React from 'react'
import styles from '../styles/Card.module.css'

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//import Tilt from 'react-vanilla-tilt'

export default function Card() {
  const { data: { getAssets = [] } = {} } = useQuery(FETCH_ASSET_QUERY);
  const {cost} = getAssets;
  console.log(getAssets.cost);

    return (
        <>
            <div div className={styles.container}>
                <div className={styles.card}>
                    <div className="content">
                        <h5>Number of Active Assets</h5>
                        <h3>{getAssets.length}</h3>
                        <p>Welcome to Sabri Solutions</p>
                    </div>
                </div>
                <div className={styles.card1}>
                    <div className="content">
                        <h5>NAV: Net Asset Value</h5>
                        <h3>Hello World</h3>
                        <p>Welcome to Sabri Solutions</p>
                    </div>
                </div>
                <div className={styles.card2}>
                    <div className="content">
                        <h5>Value of Assets</h5>
                        <h3>Hello World</h3>
                        <p>Welcome to Sabri Solutions</p>
                    </div>
                </div>
                <div className={styles.card3}>
                    <div className="content">
                        <h5>Purchase in Fiscal Year</h5>
                        <h3>Hello World</h3>
                        <p>Welcome to Sabri Solutions</p>
                    </div>
                </div>
            </div>

        </>
    )
}

const FETCH_ASSET_QUERY = gql`
 {
    getAssets {
      picture
     description
    assetTagID
    purchasedFrom
    purchaseDate
    brand
    cost
    model
    serialNo     
    }
  }
`;
