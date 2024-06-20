export class Authenticator {
  // This is a temporary variable that should be replaced with a token that is stored in session storage, retrieved from the backend
  static hasLoggedIn = true

  static async isAuthenticated() {
    // Should be replaced with getting something from session storage

    return new Promise((resolve) => {
      setTimeout(() => resolve(Authenticator.isAuthenticated), 1000)
    })
  }

  static authenticate(username: string, password: string) {
    Authenticator.hasLoggedIn = true
    return Authenticator.hasLoggedIn
  }
}
