import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isUserAuthenticated } from "../store/auth";

export default function InitialRouteScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserAuthenticated());
  }, [dispatch]);
  return;
}
