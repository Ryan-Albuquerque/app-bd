import { toast } from "react-toastify";
import Constants from "../constants";

const Notification = (type, text) => {
    let notification;

    const options = {
        autoClose: 2500,
    };

    switch (type) {
    case Constants.Notification.types.success:
        notification = () => toast.success(text, options);
        break;

    case Constants.Notification.types.error:
        notification = () => toast.error(text, options);
        break;
    case Constants.Notification.types.warning:
        notification = () => toast.warning(text, options);
        break;

    default:
        notification = () => toast(text, options);
        break;
    }

    return notification();
}

export default Notification;