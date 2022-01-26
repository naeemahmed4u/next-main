import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from "../components/columns";


function DataTable({atb, ...props}) {

    // console.log(atb);

    // const onRowClick = (state, rowInfo, column, instance, row) => {
    //             // console.log('A Td Element was clicked!')
    //             // console.log('it produced this event:')
    //             // console.log('It was in this column:', column)
    //             // console.log('It was in this row:', rowInfo)
    //             // console.log('It was in this table instance:', instance)
    //             console.log(row)
    //     return {
    //         onClick: e => {
    //             console.log('A Td Element was clicked!')
    //             console.log('it produced this event:', e)
    //             console.log('It was in this column:', column)
    //             console.log('It was in this row:', rowInfo)
    //             console.log('It was in this table instance:', instance)
                
    //         }
    //     }
    // }

    const getCellValue = (cell) =>{  
        console.log(cell.value)
      }
    
    const cols = useMemo(() => COLUMNS, [])
    const data1 = useMemo(() => atb)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({
        columns: cols,
        data: data1
    });

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            // <tr {...row.getRowProps({onClick: e => props.onRowClicked && props.onRowClicked(row, e),})}>
                            <tr {...row.getRowProps()} onClick={() => console.log(row.original)}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} onClick={()=> getCellValue(cell)}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </>
    )
}

export default DataTable;