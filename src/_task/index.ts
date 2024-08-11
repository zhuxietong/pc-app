import GroupControl from "./pages/tiktok/group-control";
import Users from "./utils/users";


const _task = async () =>{
  const users = Users.tiktok;
  await GroupControl(users)
}

export default _task;