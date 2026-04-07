'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await res?.json();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Client Side Rendering</h1>
      {users?.map((user: any, index: number) => {
        return <p key={index}>{user?.name}</p>;
      })}
    </>
  );
}
