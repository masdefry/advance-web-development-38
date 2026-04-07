async function fetchUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res?.json();
    return users;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page() {
  const users = await fetchUsers();
  return (
    <>
      <h1>Server Side Rendering</h1>
      {users?.map((user: any, index: number) => {
        return <p key={index}>{user?.name}</p>;
      })}
      
    </>
  );
}
