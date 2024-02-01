'use client'
import { changeUserRoles } from "@/actions";
import { User } from "@/components/interfaces";
import { useState } from "react";




interface Props {
    users:User[]
}
export const UserTable = ({users}:Props) => {
  const [loader, setLoader] = useState(true);

  const onChangueRoles=async(id:string,value:string)=>{
    setLoader(false)
    await changeUserRoles(id,value)
    setLoader(true)
  };
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
           Email
          </th>

          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre Completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {user.name}
            </td>


            <td className="text-sm text-gray-900 font-light px-6 ">
              <select 
              value={user.roles?? 'user' }
              onChange={e=>onChangueRoles(user.id,e.target.value)}
              className="text-sm text-gray-900 w-full p-2"
              >
                <option value="admin">Administrador</option>
                <option value="superAmind">Super administrador</option>
                <option value="user">Usruario</option>

              </select>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};
