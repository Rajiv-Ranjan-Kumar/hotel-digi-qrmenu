import HotelPopup from "../../components/dashboard/HotelPopup";
import OrderDetailsSidebar from "../../components/dashboard/OrderDetailsSidebar";
import type { DrawerMap } from "./DrawerTypes";




// Sabhi drawers yahan register honge
const CentralizeDrawer: DrawerMap = {
    registerHotel: HotelPopup,
    order: OrderDetailsSidebar,
};

export default CentralizeDrawer;
