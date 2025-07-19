import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ViewOrders from './ViewOrders';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      <Route path="/admin/orders" element={<ViewOrders />} />
    </Routes>
  );
};

export default AdminRoutes;
