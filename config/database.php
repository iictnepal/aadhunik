<?php
/**
 * Aadhunik Jana Saving & Credit Co-operative Ltd.
 * Database Connection via PDO with Prepared Statements
 * Compatible with PHP 8.2, 8.3, 8.4, XAMPP, and cPanel
 */

declare(strict_types=1);

if (!defined('APP_ROOT')) {
    define('APP_ROOT', dirname(__DIR__));
}

// Load environment configuration if .env exists
$envFile = APP_ROOT . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#') || !str_contains($line, '=')) {
            continue;
        }
        list($key, $value) = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value, " \t\n\r\0\x0B\"'");
    }
}

// Database Credentials (from ENV or defaults for local XAMPP)
$dbHost = $_ENV['DB_HOST'] ?? '127.0.0.1';
$dbPort = (int)($_ENV['DB_PORT'] ?? 3306);
$dbName = $_ENV['DB_NAME'] ?? 'aadhunik_cooperative';
$dbUser = $_ENV['DB_USER'] ?? 'root';
$dbPass = $_ENV['DB_PASS'] ?? '';
$dbCharset = 'utf8mb4';

$dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset={$dbCharset}";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
];

try {
    $pdo = new PDO($dsn, $dbUser, $dbPass, $options);
} catch (PDOException $e) {
    // In production, log the detailed error securely and display a safe message
    error_log("Database Connection Error: " . $e->getMessage());
    if (($_ENV['APP_ENV'] ?? 'development') === 'development') {
        die("<h3>Database Connection Error:</h3> " . htmlspecialchars($e->getMessage()));
    } else {
        die("<h3>500 Internal Error</h3> A database connection could not be established. Please contact the cooperative web administrator.");
    }
}
