import { authService } from "../services/auth/auth.service";

export async function refresh() {
    try {
        await authService.refresh()
    } catch (error: any) {
        console.log(error)
    }
}