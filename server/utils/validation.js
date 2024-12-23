// Validation helper functions
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain:
    // - At least one uppercase letter
    // - At least one lowercase letter
    // - At least one number
    // - At least one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const validateUsername = (username) => {
    // Username must be:
    // - 3-20 characters long
    // - Can contain letters, numbers, underscores, and hyphens
    // - Must start with a letter
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
    return usernameRegex.test(username);
  };