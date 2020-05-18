class JSONAPIAdapter {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  async getAll(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    const result = await response.json();
    return result;
  }

  async getOne(endpoint, id) {
    const response = await fetch(`${this.baseURL}${endpoint}/${id}`);
    const result = await response.json();
    return result;
  }

  async post(endpoint, body) {
    let response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async update(endpoint, id, body) {
    let response = await fetch(`${this.baseURL}${endpoint}/${id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async delete(endpoint, id) {
    let response = await fetch(`${this.baseURL}${endpoint}/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
    return response.json();
  }
}

export default JSONAPIAdapter;
