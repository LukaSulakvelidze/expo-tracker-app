import { useContext, useEffect } from "react";
import { Context } from "../store/authContext";

export default function InitialRouteScreen() {
  const { isUserAuthenticated } = useContext(Context);
  useEffect(() => {
    isUserAuthenticated();
  }, []);
  return;
}
