import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://hidden-shore-43299.herokuapp.com/fruits")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you want to delete?");
    if (!confirm) {
      return;
    }
    const url = `https://hidden-shore-43299.herokuapp.com/fruits/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          const remaining = products.filter((product) => product._id != id);
          setProducts(remaining);
          toast("Successfully deleted");
        }
      });
  };
  const handleAddItem = () => {
    navigate("/add-item");
  };
  return (
    <div className="container">
      <h2 className="text-center my-4">Manage Inventories</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <th>
                <img style={{ width: "100px" }} src={product.img} alt="" />
              </th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button onClick={handleAddItem} className="btn btn-info my-4">
          Add new item
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Manage;
