import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';

export function User() {
   const {
     register,
     handleSubmit,
     reset,
     setValue,
     formState: { errors },
   } = useForm();
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [showForm , setShowForm] = useState(-1)
  const [displayForm, setDisplayForm] = useState(false);

  const handleEdit = (e,index) =>{
    setShowForm(index)
    setDisplayForm(true)
     const address = user.addresses[index]
    setValue('name',address.name)
    setValue("phone", address.phone);
    setValue("email", address.email);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("region", address.region);
    setValue("postalCode", address.postalCode);
  }
 
  const handleRemove = (e,index) =>{
    const newUser = {...user,addresses:[...user.addresses]}
    newUser.addresses.splice(index,1)
    dispatch(updateUserAsync(newUser))
  }
 
  const handleEditForm = (data) =>{
    if(showForm>-1){
      const newUser = { ...user, addresses: [...user.addresses] };
      newUser.addresses.splice(showForm, 1, data);
      dispatch(updateUserAsync(newUser));
      setShowForm(-1)
    }
    else{
      const newUser = { ...user, addresses: [...user.addresses,data] };
      dispatch(updateUserAsync(newUser));
    }
    setDisplayForm(false)
    reset()
    
  }

  return (
    <>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl mb-8 mt-8 font-bold tracking-tight text-gray-900">
          Name: {user.name || "New User"}
        </h1>
        <h1 className="text-2xl mb-8 mt-8 font-bold tracking-tight text-gray-900">
          Email: {user.email}
        </h1>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex justify-between gap-x-6 px-5 py-5">
            <h2 className="text-base font-bold leading-7 text-gray-900">
              Address
            </h2>
            <button
              onClick={() => setDisplayForm(true)}
              type="button"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Add New Address
            </button>
          </div>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            <ul role="list" className="divide-y divide-gray-100">
              {user.addresses.map((address, index) => (
                <li
                  key={index}
                  className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}, {address.city}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.region},{address.country}
                      </p>
                    </div>
                  </div>
                  <div className=" shrink-0 mt-5 sm:flex sm:flex-col sm:items-end">
                    <p className="text-xs leading-6 text-gray-900">
                      PIN-{address.postalCode}
                    </p>
                    <p className="text-xs leading-6 text-gray-900">
                      phone-{address.phone}
                    </p>
                  </div>
                  <div className="flex">
                    <button
                      onClick={(e) => handleEdit(e, index)}
                      type="button"
                      className="font-medium px-2 py-4 text-indigo-600 hover:text-indigo-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleRemove(e, index)}
                      type="button"
                      className="font-medium px-2 py-4  text-red-600 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </p>
        </div>
        {displayForm ? (
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              handleEditForm(data);
            })}
          >
            <div class="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                {showForm > -1 ? (
                  <h2 className="text-base font-bold leading-7 text-gray-900">
                    Edit Address
                  </h2>
                ) : (
                  <h2 className="text-base font-bold leading-7 text-gray-900">
                    Add New Address
                  </h2>
                )}

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Fill the Below form properly . All Fields Required.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("name", {
                          required: "name is required",
                        })}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "phone is required",
                        })}
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "email is required",
                        })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        {...register("country", {
                          required: "country is required",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street", {
                          required: "street is required",
                        })}
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", {
                          required: "city is required",
                        })}
                        id="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("region", {
                          required: "region is required",
                        })}
                        id="region"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("postalCode", {
                          required: "postal-code is required",
                        })}
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={() => {
                    setShowForm(-1);
                    setDisplayForm(false)
                    reset();
                  }}
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                {showForm > -1 ? (
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit Address
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                )}
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}
