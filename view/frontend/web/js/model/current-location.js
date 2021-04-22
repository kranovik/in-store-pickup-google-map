define(['ko'], function(ko) {
    'use strict';

    /**
     * Represents current state of selected marker on the map.
     */
    return {
        location: ko.observable(),

        /**
         * Set currently active pickup location ().
         *
         * @param {Object} marker
         * @return {void}
         */
        setActivePickupLocation: function(location) {
            this.location(location);
        },

        /**
         * Return observable variable for currently active pickup location.
         *
         * @return {Function}
         */
        getActivePickupLocation: function() {
            return this.location;
        }
    }
});
