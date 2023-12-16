import { useState } from "react";
import { ITEMS_PER_PAGE } from "../../app/constant";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PencilIcon
} from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../order/orderSlice";


const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const [page, setPage] = useState(1);
  const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
  const totalItems = useSelector(selectTotalOrders);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const [editableOrderId,setEditableOrderId]= useState(-1)
const statusColor = (status) =>{
    switch(status){
        case'pending':
            return "bg-purple-200 text-purple-600"
        
        case'dispatched':
            return "bg-yellow-200 text-yellow-600"
        
        case'cancelled':
            return "bg-red-200 text-red-600"
        
        case'delivered':
            return "bg-green-200 text-green-600"
        default:
            
            return "bg-purple-200 text-purple-600"
        
    }
}

  const handlePage = (page) => {
    console.log(page);
    setPage(page);
  };

  const handleShow = (order) => {
    console.log('handleShow');
  };

  const handleEdit = (order) => {
    setEditableOrderId(order.id)
  }

  const handleUpdate = (e,order) => {
    const updateOrder = {...order,status:e.target.value}
    dispatch(updateOrderAsync(updateOrder))
    setEditableOrderId(-1)
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order id</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-left">Delivery address</th>
                  <th className="py-3 px-6 text-center">Total Amount</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders &&
                  orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center px-5">
                          <p className="font-medium ">{order.id}</p>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.cartItems.map((item) => {
                          return (
                            <div className="flex items-center">
                              <div className="mr-2 mt-1 mb-1">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.thumbnail}
                                />
                              </div>
                              <span>
                                {item.title}||Qty-{item.quantity}||value-
                                {item.price}
                              </span>
                            </div>
                          );
                        })}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {order.address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.address.street}, {order.address.city}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.address.region},{order.address.country}
                            </p>
                          </div>
                          <div className="hidden mt-5 shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              PIN-{order.address.postalCode}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              phone-{order.address.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editableOrderId == order.id ? (
                          <select onChange={(e)=>handleUpdate(e,order)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="pending">pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        ) : (
                          <span className={`${statusColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex cursor-pointer gap-3 item-center justify-center">
                          <EyeIcon
                            onClick={() => handleShow(order)}
                            className="w-4 h-4"
                          ></EyeIcon>
                          <PencilIcon
                            onClick={() => handleEdit(order)}
                            className="w-4 h-4"
                          ></PencilIcon>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* {pagination} */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <div
                  onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </div>
                <div
                  onClick={(e) =>
                    handlePage(page < totalPages ? page + 1 : page)
                  }
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(page - 1) * ITEMS_PER_PAGE}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">{page * ITEMS_PER_PAGE}</span>{" "}
                    of <span className="font-medium">{totalItems}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <div
                      onClick={() => handlePage(page > 1 ? page - 1 : page)}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    {Array.from({
                      length: totalPages,
                    }).map((el, index) => {
                      return (
                        <div
                          onClick={(e) => handlePage(index + 1)}
                          aria-current="page"
                          className={`relative cursor-pointer z-10 inline-flex items-center ${
                            index + 1 === page
                              ? "bg-indigo-600 text-white"
                              : "text-gray-400"
                          } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                          {index + 1}
                        </div>
                      );
                    })}

                    <div
                      onClick={() => {
                        handlePage(page < totalPages ? page + 1 : page);
                      }}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminOrders;
