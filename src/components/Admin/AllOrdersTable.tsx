import { useEffect, useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { Order } from "../../db/types";

export function AllOrdersTable() {
  const { getAllOrders, orders, updateOrder, deleteOrder } = useOrder();
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [updatedOrderData, setUpdatedOrderData] = useState<Partial<Order>>({});

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const handleEdit = (order: Order) => {
    setEditingOrderId(order.id);
    setUpdatedOrderData(order);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (orderId: string) => {
    updateOrder(orderId, updatedOrderData);
    setEditingOrderId(null);
  };

  if (!orders) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>All Orders</h2>
      <table className="border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 ...">Order ID</th>
            <th className="border border-slate-600 ...">User Name</th>
            <th className="border border-slate-600 ...">User Email</th>
            <th className="border border-slate-600 ...">Pickup Location</th>
            <th className="border border-slate-600 ...">Dropoff Location</th>
            <th className="border border-slate-600 ...">Receiver Phone No</th>
            <th className="border border-slate-600 ...">Status</th>
            <th className="border border-slate-600 ...">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-slate-700 ...">{order.id}</td>
              <td className="border border-slate-700 ...">
                {order.user?.name}
              </td>
              <td className="border border-slate-700 ...">
                {order.user?.email}
              </td>
              <td className="border border-slate-700 ...">
                {order.pickupLocation}
              </td>
              <td className="border border-slate-700 ...">
                {order.dropoffLocation}
              </td>
              <td className="border border-slate-700 ...">
                {order.receiverPhoneNo}
              </td>
              <td className="border border-slate-700 ...">
                {editingOrderId === order.id ? (
                  <select
                    name="status"
                    value={updatedOrderData.status || order.status}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <button
                    onClick={() => handleSave(order.id)}
                    className="bg-green-400"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(order)}
                      className="bg-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-red-400"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
