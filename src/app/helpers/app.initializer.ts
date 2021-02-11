import { AuthService } from "app/services/auth.service";


export function appInitializer(_auth: AuthService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        // _auth.refreshToken().subscribe().add(resolve);
    });
}