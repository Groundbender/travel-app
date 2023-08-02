import { useState } from "react";
import { Pos } from "../types";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState<Pos | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("Your browser does not support geolocation");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        if (error instanceof Error) {
          setError(error.message);
        }
        setIsLoading(false);
      }
    );
  }

  return { position, error, isLoading, getPosition };
}
