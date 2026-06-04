import {
useEffect,
useState
}
from "react";

import {

getUsers,
updateRole

}
from "../../../services/userService";

function Users(){

const [users,setUsers]=
useState<any[]>([]);

const [loading,setLoading]=
useState(true);



useEffect(()=>{

loadUsers();

},[]);



const loadUsers=
async()=>{

const data=
await getUsers();

setUsers(data);

setLoading(false);

};



const changeRole=
async(

userId:number,
role:string

)=>{

await updateRole({

userId,

role,

branchId:null,

isActive:true

});

loadUsers();

};



if(loading)
return <h2>
Loading...
</h2>;



return(

<div className="p-6">

<h1 className="
text-3xl
font-bold
mb-6">

Users Management

</h1>



<table className="
w-full
bg-white
shadow">

<thead>

<tr className="
bg-gray-100">

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>



<tbody>

{

users.map(

(user:any)=>(

<tr
key={user.id}
className="
border-b">

<td>
{user.name}
</td>

<td>
{user.email}
</td>

<td>
{user.role}
</td>

<td>

{

user.isActive

?

"Active"

:

"Inactive"

}

</td>



<td>

<select

value={
user.role
}

onChange={

(e)=>

changeRole(

user.id,

e.target.value

)

}

className="
border
p-2">

<option>
Admin
</option>

<option>
Branch Manager
</option>

<option>
Pickup Officer
</option>

<option>
Delivery Rider
</option>

<option>
Client
</option>

</select>

</td>

</tr>

)

)

}

</tbody>

</table>

</div>

);

}

export default Users;