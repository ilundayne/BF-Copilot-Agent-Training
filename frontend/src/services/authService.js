const API_BASE_URL = 'http://localhost:8000';

export const authService = {
  async login(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al iniciar sesión');
    }

    const data = await response.json();
    return data;
  },

  async getProtectedData(token) {
    const response = await fetch(`${API_BASE_URL}/protected`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener datos protegidos');
    }

    const data = await response.json();
    return data;
  },

  saveToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  removeToken() {
    localStorage.removeItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};
