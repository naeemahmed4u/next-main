import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import DataTable from '../components/DataTable';


function GetAsset() {

  // const { loading,error, data: { getAssets = [] } = {}  } = useQuery(FETCH_ASSET_QUERY);
  const { data: { getAssets = [] } = {} } = useQuery(FETCH_ASSET_QUERY);

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // const onRowClick = (row, e) => {

  //   console.log('A Td Element was clicked!')
  //   console.log('it produced this event:', e)
  //   console.log('It was in this column:', row)
  //   // console.log('It was in this row:', rowInfo)
  //   // console.log('It was in this table instance:', instance)


  // }

  // const onRowClick = (state, rowInfo, column, instance) => {
  //   return {
  //       onClick: e => {
  //           console.log('A Td Element was clicked!')
  //           console.log('it produced this event:', e)
  //           console.log('It was in this column:', column)
  //           console.log('It was in this row:', rowInfo)
  //           console.log('It was in this table instance:', instance)
  //       }
  //   }
  // }

  return (
    <>
      <DataTable atb={getAssets} />
      {/* <table>     getTrProps={onRowClick}
        <tbody>
          {getAssets.map((item, index) => (
            <tr key={index}>
              <td>
                {item.description}
                {item.brand}
                {item.cost}
                {item.model}


              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
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

export default GetAsset;
