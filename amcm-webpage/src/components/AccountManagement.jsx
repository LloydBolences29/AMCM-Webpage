import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

const AccountManagement = () => {
  const [users, setUsers] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/user/get-users`);

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUser();
  }, []);

  return (
    <>
      <Table
        striped
        bordered
        hover
        responsive
        variant="light"
        className="my-4 shadow-sm rounded"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AccountManagement;
