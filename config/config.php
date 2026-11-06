<?php
/**
 * Aadhunik Jana Saving & Credit Co-operative Ltd.
 * Global System Configuration & Security Constants
 */

declare(strict_types=1);

if (!defined('APP_ROOT')) {
    define('APP_ROOT', dirname(__DIR__));
}

// Session Security Configuration
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.cookie_samesite', 'Lax');
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        ini_set('session.cookie_secure', '1');
    }
    session_start();
}

// Base URLs and Paths
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
define('BASE_URL', $protocol . $host);
define('UPLOAD_DIR', APP_ROOT . '/uploads');
define('UPLOAD_URL', BASE_URL . '/uploads');

// Default Language: Nepali ('ne') or English ('en')
if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'ne'; // Default to Nepali as per cooperative requirement
}

if (isset($_GET['lang']) && in_array($_GET['lang'], ['ne', 'en'], true)) {
    $_SESSION['lang'] = $_GET['lang'];
}

$current_lang = $_SESSION['lang'];

// Organization Constants
define('ORG_NAME_EN', 'Aadhunik Jana Saving & Credit Co-operative Ltd.');
define('ORG_NAME_NE', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.');
define('ORG_ADDRESS_EN', 'Nagarjun-4, Kathmandu, Nepal');
define('ORG_ADDRESS_NE', 'नागार्जुन-४, काठमाडौँ, नेपाल');
define('ORG_PHONE', '+977-01-4880000');
define('ORG_EMAIL', 'info@aadhuniksaving.com.np');
define('ORG_DOMAIN', 'aadhuniksaving.com.np');

// Include Helper Functions & Database
require_once APP_ROOT . '/includes/functions.php';
require_once APP_ROOT . '/includes/language.php';
require_once APP_ROOT . '/config/database.php';
