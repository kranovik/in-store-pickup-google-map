<?php
declare(strict_types=1);

namespace Kranovik\GoogleMap\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\InventoryDistanceBasedSourceSelection\Model\DistanceProvider\GoogleMap\GetApiKey;

/**
 * Add google api key to checkout config.
 */
class GoogleApiKeyProvider implements ConfigProviderInterface
{
    /**
     * @var GetApiKey
     */
    private $apiKey;

    /**
     * @param GetApiKey $apiKey
     */
    public function __construct(GetApiKey $apiKey)
    {
        $this->apiKey = $apiKey;
    }

    /**
     * @inheritdoc
     */
    public function getConfig()
    {
        try {
            $config = ['googleApiKey' => $this->apiKey->execute()];
        } catch (LocalizedException $exception) {
            $config = [];
        }

        return $config;
    }
}
