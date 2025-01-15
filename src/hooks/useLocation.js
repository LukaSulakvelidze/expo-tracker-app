import {
  Accuracy,
  PermissionStatus,
  useForegroundPermissions,
  watchPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";

const useLocation = (shouldTrack, callback) => {
  const [err, setError] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant Location permission to use this app"
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    let subscriber;
    const watchPossition = async () => {
      try {
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
      } catch (error) {
        setError(error);
      }
    };
    if (shouldTrack) {
      verifyPermissions();
      watchPossition();
    } else {
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
export default useLocation;
