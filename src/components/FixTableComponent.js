import '../App.css';
import axios from 'axios'
import { useState } from 'react';
import Button from '@mui/material/Button';
import React from 'react';
import DataTable from './DefaultColumnFilter';

const orderUrl = 'http://127.0.0.1:5001/data/orders';
const enterserUrl = 'http://127.0.0.1:5001/data/pagesvisit'

const FixTableComponent=() =>{
  const [orderTable,setOrderTable] = useState({});
  const [trueOrder,setTrueOrder] = useState(false);
  const [entersTable,setEntersTable] = useState({})
  const [trueEnters,setTrueEnterr] = useState(false);

  const columnsOrder = React.useMemo(
    () => [
      {
        Header: 'Order_count',
        accessor: 'order_count',
      },
      {
        Header: 'Order_ids',
        accessor: 'order_ids',
      },
      {
        Header: 'UserId',
        accessor: 'userId',
      },
    ],
    []
  );
  const columnsEnters = React.useMemo(
    () => [
      {
        Header: 'Page_count',
        accessor: 'page_count',
      },
      {
        Header: 'Pages_visited',
        accessor: 'pages_visited',
      },
      {
        Header: 'UserId',
        accessor: 'userId',
      },
    ],
    []
  );
  const getOrder=async(e)=>{
    const resp = await axios.get(orderUrl);
    setOrderTable(resp);
    setTrueOrder(true);
    setTrueEnterr(false)

  }
  const getEnters=async(e)=>{
    const resp = await axios.get(enterserUrl);
    console.log(resp);

    setEntersTable(resp);
    setTrueEnterr(true)
    setTrueOrder(false);

  }
  return (
    <div className="">
    <div className='buttonSqure'>
     <Button className='eachButton' variant="contained" onClick={getOrder}>Order Table</Button>
     <Button className='eachButton' variant="contained" onClick={getEnters}>Enters Table</Button>
     </div>
     {trueOrder?<DataTable columns={columnsOrder} data={orderTable.data} />: ''}
     {trueEnters?<DataTable columns={columnsEnters} data={entersTable.data} />: ''}
     
    </div>
  );
}

export default FixTableComponent;
