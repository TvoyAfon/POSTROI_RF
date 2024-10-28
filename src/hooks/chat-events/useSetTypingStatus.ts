import { useDispatch, useSelector } from "react-redux"
import { addIsUserTyping } from "../../store/slices/ChatSlice/ChatSlice"
import { RootState } from "../../store/store"

export const useSetTypingStatus = () => {
    const { selectedChatId, lastUpdate } = useSelector((state: RootState) => state.chat)
    const dispatch = useDispatch()

    return () => {
        if (!lastUpdate || lastUpdate['@status'] !== 200) {
            return;
        }

        const { chat_id, is_typing } = lastUpdate;

        if (chat_id !== selectedChatId) {
            return;
        }

        dispatch(addIsUserTyping(is_typing));
    }
}