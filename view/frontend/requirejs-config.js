var config = {
    config: {
        mixins: {
            'Magento_InventoryInStorePickupFrontend/js/view/store-selector': {
                'Kranovik_GoogleMap/js/view/store-selector-mixin': true
            },
            'Magento_InventoryInStorePickupFrontend/js/model/pickup-locations-service': {
                'Kranovik_GoogleMap/js/model/pickup-locations-service-mixin': true
            }
        }
    }
};
