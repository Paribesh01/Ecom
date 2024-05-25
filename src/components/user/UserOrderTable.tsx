import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { userState } from "../../recoil/atoms";
import { useOrder } from "../../hooks/useOrder";
import { Order } from "../../db/types";

export function UserOrderTable() {
  const { getUserOrders, orders, deleteOrder, updateOrder } = useOrder();
  const user = useRecoilValue(userState);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [updatedOrderData, setUpdatedOrderData] = useState<Partial<Order>>({});

  useEffect(() => {
    if (user) {
      getUserOrders(user.id);
    }
  }, [user, getUserOrders]);

  const handleEdit = (order: Order) => {
    setEditingOrderId(order.id);
    setUpdatedOrderData(order);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  return (
    <div>
      <h2>User Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Receiver Phone No</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {editingOrderId === order.id ? (
                  <input
                    type="text"
                    name="pickupLocation"
                    value={updatedOrderData.pickupLocation || ""}
                    onChange={handleChange}
                  />
                ) : (
                  order.pickupLocation
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={updatedOrderData.dropoffLocation || ""}
                    onChange={handleChange}
                  />
                ) : (
                  order.dropoffLocation
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <input
                    type="text"
                    name="receiverPhoneNo"
                    value={updatedOrderData.receiverPhoneNo || ""}
                    onChange={handleChange}
                  />
                ) : (
                  order.receiverPhoneNo
                )}
              </td>
              <td>{order.status}</td>
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
