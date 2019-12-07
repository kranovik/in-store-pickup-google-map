define(['ko'], function(ko) {
    'use strict';

    /**
     * Represents current state of selected marker on the map.
     */
    return {
        marker: ko.observable(),

        /**
         * Set currently active marker (clicked on the map).
         *
         * @param {Object} marker
         * @return {void}
         */
        setActiveMarker: function(marker) {
            this.marker(marker);
        },

        /**
         * Return observable variable for currently active marker.
         *
         * @return {Function}
         */
        getMarker: function() {
            return this.marker;
        }
    }
});
