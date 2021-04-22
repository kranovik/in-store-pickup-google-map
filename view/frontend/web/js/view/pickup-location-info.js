define([
       'uiComponent',
       'ko',
       'underscore',
       'Kranovik_GoogleMap/js/model/marker',
        'Kranovik_GoogleMap/js/model/current-location',
], function (Component, ko, _, markerModel, currentPickupLocation) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Kranovik_GoogleMap/map/pickup-location-info',
            marker: markerModel.getMarker(),
            deliveryLocation: currentPickupLocation.getActivePickupLocation(),
            location: null,
            isSelectedLocation: null
        },

        /**
         * @inheritdoc
         */
        initObservable: function () {
            this._super();
            this.location = ko.computed({
                read: function() {
                    return this.marker() ? this.marker().pickupLocation: {};
                },
                owner: this
            });

            this.isSelectedLocation = ko.computed({
               read: function() {
                   return _.isEqual(this.location(), this.deliveryLocation())
               },
              owner: this
            });

            return this;
        },

        /**
         * Select current Pickup Location for shipping.
         */
        selectLocation: function() {
            this.marker().callback(this.marker().pickupLocation);
        }
    });
});
