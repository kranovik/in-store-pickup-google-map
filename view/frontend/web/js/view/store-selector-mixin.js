define([
   'jquery',
   'Magento_Checkout/js/model/quote',
   'Magento_InventoryInStorePickupFrontend/js/model/pickup-locations-service',
   'Kranovik_GoogleMap/js/model/google-map'
], function (
    $,
    quote,
    pickupLocationsService,
    googleMap
) {
    'use strict';

    var mixin = {
        defaults: {
            storeSelectorPopupTemplate: 'Kranovik_GoogleMap/store-selector/popup',
            map: null,
            mapElementSelector: "#map",
            mapApiKey: window.checkoutConfig.googleApiKey
        },

        /**
         * @inheritdoc
         */
        openPopup: function () {
            var shippingAddress = quote.shippingAddress(),
                country = shippingAddress.countryId ? shippingAddress.countryId :
                    this.defaultCountryId;

            this.getPopup().openModal();
            googleMap.init(this.mapApiKey, $(this.mapElementSelector)[0]);

            let query = null;

            if (shippingAddress.city && shippingAddress.postcode) {
                query = shippingAddress.postcode + this.delimiter + country;
            }

            this.updateNearbyLocations(query);
        },

        /**
         * @inheritdoc
         */
        updateNearbyLocations: function (searchQuery) {
            var self = this,
                productsInfo = [],
                items = quote.getItems();

            _.each(items, function (item) {
                if (item['qty_options'] === undefined || item['qty_options'].length === 0) {
                    productsInfo.push(
                        {
                            sku: item.sku
                        }
                    );
                }
            });

            let searchRequest = {
                extensionAttributes: {
                    productsInfo: productsInfo
                },
                pageSize: this.nearbySearchLimit
            };

            if (searchQuery) {
                searchRequest.area = {
                    radius: this.nearbySearchRadius,
                        searchTerm: searchQuery
                }
            }

            return pickupLocationsService
                .getNearbyLocations(searchRequest)
                .then(function (locations) {
                    self.nearbyLocations(locations);
                })
                .fail(function () {
                    self.nearbyLocations([]);
                })
                .always(function () {
                    let locations = self.nearbyLocations();
                    if (locations.length > 0) {
                        googleMap.navigate(locations[0].latitude, locations[0].longitude);
                    }
                    googleMap.setLocations(locations, self.selectPickupLocation.bind(self));
                });
        },
    };

    return function (target) {
        return target.extend(mixin);
    };
});
