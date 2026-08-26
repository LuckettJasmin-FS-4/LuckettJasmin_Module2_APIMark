import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function App() {
  // =========================
  // TEMPLATE STATE
  // =========================

  const [templates, setTemplates] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    isPremium: false,
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);

  // =========================
  // CUSTOMER STATE
  // =========================

  const [customers, setCustomers] = useState([]);

  const [customerForm, setCustomerForm] = useState({
    customerName: "",
    email: "",
    template: "",
  });

  const [editingCustomerId, setEditingCustomerId] =
    useState(null);

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    getTemplates();
  }, [page]);

  useEffect(() => {
    getCustomers();
  }, []);

  // =========================
  // GET TEMPLATES
  // =========================

  const getTemplates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/templates?page=${page}&limit=5`
      );

      console.log("TEMPLATE RESPONSE:", response.data);

      setTemplates(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  // =========================
  // TEMPLATE FORM CHANGE
  // =========================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // =========================
  // CREATE / UPDATE TEMPLATE
  // =========================

  const saveTemplate = async (event) => {
    event.preventDefault();

    try {
      const templateData = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        isPremium: formData.isPremium,
      };

      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/templates/${editingId}`,
          templateData
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/templates",
          templateData
        );
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        isPremium: false,
      });

      setEditingId(null);

      getTemplates();
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  // =========================
  // EDIT TEMPLATE
  // =========================

  const startEdit = (template) => {
    setEditingId(template._id);

    setFormData({
      name: template.name,
      category: template.category,
      price: template.price,
      isPremium: template.isPremium,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE TEMPLATE
  // =========================

  const deleteTemplate = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/templates/${id}`
      );

      getTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  // =========================
  // TEMPLATE PAGINATION
  // =========================

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // =========================
  // GET CUSTOMERS
  // =========================

  const getCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/customers"
      );

      console.log("CUSTOMER RESPONSE:", response.data);

      const customerData =
        response.data.data ||
        response.data.customers ||
        response.data;

      setCustomers(
        Array.isArray(customerData) ? customerData : []
      );
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // =========================
  // CUSTOMER FORM CHANGE
  // =========================

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomerForm({
      ...customerForm,
      [name]: value,
    });
  };

  // =========================
  // CREATE / UPDATE CUSTOMER
  // =========================

  const saveCustomer = async (event) => {
    event.preventDefault();
  
    try {
      const customerData = {
        customerName: customerForm.customerName.trim(),
        email: customerForm.email.trim(),
      };
  
      if (customerForm.template) {
        customerData.template = customerForm.template;
      }
  
      console.log("SENDING CUSTOMER:", customerData);
  
      if (editingCustomerId) {
        await axios.put(
          `http://localhost:3000/api/customers/${editingCustomerId}`,
          customerData
        );
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/customers",
          customerData
        );
  
        console.log("CUSTOMER CREATED:", response.data);
      }
  
      setCustomerForm({
        customerName: "",
        email: "",
        template: "",
      });
  
      setEditingCustomerId(null);
  
      await getCustomers();
    } catch (error) {
      console.error(
        "Error saving customer:",
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // EDIT CUSTOMER
  // =========================

  const startCustomerEdit = (customer) => {
    setEditingCustomerId(customer._id);

    setCustomerForm({
      customerName: customer.customerName,
      email: customer.email,
      template: customer.template?._id || "",
    });
  };

  // =========================
  // DELETE CUSTOMER
  // =========================

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/customers/${id}`
      );

      getCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div className="app">
      {/* TEMPLATE SECTION */}

      <h1>Template Marketplace</h1>

      <section className="form-section">
        <h2>
          {editingId ? "Edit Template" : "Add New Template"}
        </h2>

        <form onSubmit={saveTemplate}>
          <input
            type="text"
            name="name"
            placeholder="Template Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>
            <input
              type="checkbox"
              name="isPremium"
              checked={formData.isPremium}
              onChange={handleChange}
            />

            Premium Template
          </label>

          <button type="submit">
            {editingId
              ? "Update Template"
              : "Add Template"}
          </button>
        </form>
      </section>

      {/* TEMPLATE LIST */}

      <h2>Available Templates</h2>

      <div className="template-container">
        {templates.map((template) => (
          <div
            className="template-card"
            key={template._id}
          >
            <h2>{template.name}</h2>

            <p>
              <strong>Category:</strong>{" "}
              {template.category}
            </p>

            <p>
              <strong>Price:</strong> $
              {template.price}
            </p>

            <p>
              <strong>Premium:</strong>{" "}
              {template.isPremium ? "Yes" : "No"}
            </p>

            <button
              onClick={() => startEdit(template)}
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteTemplate(template._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}

      <div className="pagination">
        <button
          onClick={previousPage}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* CUSTOMER SECTION */}

      <section className="customers-section">
        <h1>Customers</h1>

        <div className="customer-form-container">
          <h2>
            {editingCustomerId
              ? "Edit Customer"
              : "Add New Customer"}
          </h2>

          <form onSubmit={saveCustomer}>
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={customerForm.customerName}
              onChange={handleCustomerChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customerForm.email}
              onChange={handleCustomerChange}
              required
            />

            <select
              name="template"
              value={customerForm.template}
              onChange={handleCustomerChange}
            >
              <option value="">
                Select Template
              </option>

              {templates.map((template) => (
                <option
                  key={template._id}
                  value={template._id}
                >
                  {template.name}
                </option>
              ))}
            </select>

            <button type="submit">
              {editingCustomerId
                ? "Update Customer"
                : "Add Customer"}
            </button>
          </form>
        </div>

        {/* CUSTOMER LIST */}

        <h2>Customer List</h2>

        <div className="customer-container">
          {customers.map((customer) => (
            <div
              className="customer-card"
              key={customer._id}
            >
              <h3>
                {customer.customerName}
              </h3>

              <p>
                <strong>Email:</strong>{" "}
                {customer.email}
              </p>

              <p>
                <strong>Purchase Date:</strong>{" "}
                {customer.purchaseDate
                  ? new Date(
                      customer.purchaseDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                <strong>Template:</strong>{" "}
                {customer.template?.name ||
                  "No template selected"}
              </p>

              <button
                onClick={() =>
                  startCustomerEdit(customer)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteCustomer(customer._id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;