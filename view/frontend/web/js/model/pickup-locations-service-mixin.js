define([
    'Kranovik_GoogleMap/js/model/google-map',
    'Kranovik_GoogleMap/js/model/current-location',
    'mage/utils/wrapper',
    'jquery'
], function (
    googleMap,
    currentLocation,
    wrapper,
    $
) {
    'use strict';

    return function (target) {
        let originalMethod = target.selectForShipping;

        /**
         * Add location to the map (if it was not added before).
         * Navigate map to the location and add selected location to 'locationModel'.
         */
        target.selectForShipping = wrapper.wrap(originalMethod, function (original, location) {
            googleMap.addLocation(location);
            googleMap.navigate(location.latitude, location.longitude);
            currentLocation.setActivePickupLocation(location);

            return original(location);
        });

        originalMethod = target.getNearbyLocations;
        let locationsCache = [];

        /**
         * Add cache for requesting Pickup Locations if locations was already returned for query.
         */
        target.getNearbyLocations = wrapper.wrap(originalMethod, function (original, criteria) {
            let key = JSON.stringify(criteria);
            if (locationsCache[key]) {
                return $.Deferred().resolve(locationsCache[key]).promise();
            } else {
                return original(criteria).then(function (locations) {
                    locationsCache[key] = locations;
                    return locationsCache[key]
                })
            }
        });

        return target;
    };
});

