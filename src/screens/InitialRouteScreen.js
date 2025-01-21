import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserAuthenticated } from "../store/auth";

export default function InitialRouteScreen() {
  const state = useSelector((item) => item.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserAuthenticated(state));
  }, [dispatch]);
  return;
}
