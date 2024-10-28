import { useSelector } from "react-redux"
import { authService } from "../../services/auth/auth.service"
import { RootState } from "../../store/store"

export const useAuthentication = () => {
    const { lastUpdate, chatClient, lastActionBody } = useSelector((state: RootState) => state.chat)

    return async () => {
        if (!lastUpdate || [200, 400, 500].includes(Number(lastUpdate["@status"]))) return

        try {
            await authService.refresh()
        } catch (error) {
            return
        }

        if (!lastActionBody) {
            return
        }

        chatClient?.send(lastActionBody)
    }
}