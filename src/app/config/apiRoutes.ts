const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const userId =
  localStorage.getItem("userId") || sessionStorage.getItem("userId");

const apiRoutes = {
  signupCustomer: `${API_BASE_URL}/api/auth/RegisterCustomer`,
  signupProvider: `${API_BASE_URL}/api/auth/RegisterProvider`,
  login: `${API_BASE_URL}/api/auth/login`,
  forgotPassword: `${API_BASE_URL}/api/auth/ForgotPassword`,
  resetPassword: `${API_BASE_URL}/api/auth/ResetPassword`,
  createService: `${API_BASE_URL}/api/providers/${userId}/services`,
  updateService: `${API_BASE_URL}/api/providers/${userId}/services`,
  deleteService: `${API_BASE_URL}/api/providers/${userId}/services`,
  getProviderProfile: `${API_BASE_URL}/api/providers/profile/${userId}`,
  getPublicProviderProfile: `${API_BASE_URL}/api/providers/profile`,
  updateProviderProfile: `${API_BASE_URL}/api/providers/profile/${userId}`,
  getService: `${API_BASE_URL}/api/providers/services`,
  getServiceCategories: `${API_BASE_URL}/api/providers/services/categories`,
  getSkills: `${API_BASE_URL}/api/providers/services/skills`,
  getProviders: `${API_BASE_URL}/api/customers/search-providers`,
};

export default apiRoutes;
