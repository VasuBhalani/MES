const BASE_URL = 'http://localhost:5000/api';

export const supplierEndpoints = {
  CREATE_SUPPLIER:     `${BASE_URL}/suppliers/create`,           // POST: Create supplier
  GET_SUPPLIERS:       `${BASE_URL}/suppliers`,                  // GET: All suppliers
  GET_SUPPLIER:        (id) => `${BASE_URL}/suppliers/${id}`,    // GET: Single supplier
  UPDATE_SUPPLIER:     (id) => `${BASE_URL}/suppliers/${id}`,    // PUT: Update supplier
  DELETE_SUPPLIER:     (id) => `${BASE_URL}/suppliers/${id}`,    // DELETE: Delete supplier
};

