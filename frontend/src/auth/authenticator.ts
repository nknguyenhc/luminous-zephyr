export class Authenticator {
  // This is a temporary variable that should functionally be replaced with a token that is stored in session storage, retrieved from the backend
  hasLoggedIn = false

  async isAuthenticated(): Promise<boolean> {
    // Should be replaced with getting something from session storage
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.hasLoggedIn), 1000)
    })
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    // Should be replaced with a fetch request to backend
    this.hasLoggedIn = true
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.hasLoggedIn), 1000)
    })
  }
}
