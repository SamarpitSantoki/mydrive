import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../store/api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const { data, isFetching } = useGetUsersQuery();

  return (
    <div className="grid justify-center  bg-gray-100">
      <div>
        <h1>Admin</h1>
      </div>
      <div>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Allowed</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user: any) => (
              <tr>
                <td>{user.email}</td>
                <td>{user.allowed ? "Yes" : "No"}</td>
                {/* create a toggle */}
                <td>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
