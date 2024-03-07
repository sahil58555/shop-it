import React from "react";
import MetaData from "../layout/MetaData";

const MyOrders = () => {
  return (
    <>
      <MetaData http-equiv="Content-Security-Policy"   title={"Order Details"} />
      <div>
      <h1 class="my-5">My Orders</h1>

      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Amount Paid</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Order Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Order ID 1</th>
            <td>$100.00</td>
            <td>PAID</td>
            <td>Shipped</td>
            <td>
              <a href="/me/order/order-id-1" class="btn btn-primary">
                <i class="fa fa-eye"></i>
              </a>
              <a href="/invoice/order/order-id-1" class="btn btn-success ms-2">
                <i class="fa fa-print"></i> Invoice
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
};

export default MyOrders;
