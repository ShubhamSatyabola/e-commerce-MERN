
import Navbar from "../features/Navbar/Navbar";
import { UserOrders } from "../features/user/components/UserOrder";

const UserOrderPage = () => {
  return (
    <Navbar>
      <UserOrders></UserOrders>
    </Navbar>
  );
};
export default UserOrderPage;
