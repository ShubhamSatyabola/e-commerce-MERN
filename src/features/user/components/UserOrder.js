import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";


export function UserOrders() {
 
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo)
const orders = useSelector(selectUserOrders)
  useEffect(()=>{
    dispatch(fetchLoggedInUserOrdersAsync(user.id))
  },[user])

  return (
    <>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8 mt-8 font-bold tracking-tight text-gray-900">
          My Orders
        </h1>
        {orders.map((order) => {
          return (
            <div className="mx-auto mt-8 mb-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Order #{order.id}
              </h1>
              <p className="text-2xl tracking-tight text-gray-400">
                Order status #{order.status}
              </p>
              <div className="mt-8 mb-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.cartItems.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">${product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                qty {product.quantity}
                              </label>
                            </div>

                            {/* <div className="flex">
                                    <button
                                      onClick={(e) =>
                                        handleRemove(e, product.id)
                                      }
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div> */}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Amount</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items In Bag</p>
                  <p>{order.totalItems}</p>
                </div>
              </div>
              <p className="text-xl py-5 tracking-tight text-gray-900">
                Shipping Address
              </p>
              <li className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray">
                <div className="flex min-w-0 gap-x-4">
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
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    PIN-{order.address.postalCode}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    phone-{order.address.phone}
                  </p>
                </div>
              </li>
            </div>
          );
        })}
      </div>
    </>
  );
}
