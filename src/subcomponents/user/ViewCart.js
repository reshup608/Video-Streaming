import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const TAX_RATE = 0.07;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 700,
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(key,desc, qty, unit) {
  const price = priceRow(qty, unit);
  return {key, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}
/*
const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];
*/
function readRowsForCart()
{
  let rows=[]
  for(let i=0;i<localStorage.length;i++)
  {if(localStorage.key(i).startsWith("CT"))
  {let items=JSON.parse(localStorage.getItem(localStorage.key(i)))
  let row=createRow(localStorage.key(i),items.videotitle,1,items.amount)
  rows.push(row)
  }
}
return rows
}
const invoiceSubtotal = subtotal(readRowsForCart());
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable(props) {
  const classes = useStyles();
  const [stateView, setStateView] = React.useState('');
  let rows=readRowsForCart()
  const handleRemove=(key)=>{
    localStorage.removeItem(key)
    props.countCartItems()
    setStateView('RemoveCart')
  }
const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function handleshopping()
{
  props.setViews("CATEGORY",'')

}

  return (
    (rows.length!=0)?(
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
          <TableCell>Remove</TableCell>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">@</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.desc}>
               <TableCell><DeleteOutlinedIcon onClick={()=>handleRemove(row.key)}/></TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
    <div>
       <Button variant="contained"  onClick={handleshopping} color="primary" className={classes.button}>
       Continue Shopping...
      </Button>
      <Button variant="contained" color="secondary"   className={classes.button}>
      Proceed To Payment...
      </Button>
      </div>
    </div>):(<div>   <Button variant="contained"  onClick={handleshopping} color="primary" className={classes.button}>
       Continue Shopping...
      </Button>
    Cart is Empty</div>)
    
  );
}