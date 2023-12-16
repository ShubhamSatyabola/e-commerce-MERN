
import AdminProductList from "../features/Admin/AdminProductList";
import Navbar from "../features/Navbar/Navbar";

const AdminHome = () => {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
};
export default AdminHome;
