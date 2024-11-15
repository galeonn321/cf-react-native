import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { LOG } from "../config/logger";

export const getCurrentLocation = async () => {
    LOG.info("Getting location...");

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});

    const exactLocation = await Location.reverseGeocodeAsync(
        currentLocation.coords
    );

    LOG.info(exactLocation.at(0)?.isoCountryCode);

    if (exactLocation.at(0)?.isoCountryCode) {
        return exactLocation.at(0)?.isoCountryCode;
    }
};
