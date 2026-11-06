<?php
/**
 * Aadhunik Jana Saving & Credit Co-operative Ltd.
 * Core Security, Sanitization, and Helper Functions
 */

declare(strict_types=1);

/**
 * XSS Protection: Escapes output for HTML
 */
function e(?string $string): string {
    return htmlspecialchars((string)$string, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * CSRF Protection Token Generator
 */
function csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Validates submitted CSRF token
 */
function verify_csrf(?string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], (string)$token);
}

/**
 * Renders hidden CSRF input field
 */
function csrf_field(): string {
    return '<input type="hidden" name="csrf_token" value="' . e(csrf_token()) . '">';
}

/**
 * Convert English digits to Nepali Devanagari numerals
 */
function to_nepali_number(int|float|string $number): string {
    $en = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    $ne = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return str_replace($en, $ne, (string)$number);
}

/**
 * Formats currency (NPR) with language-aware digits
 */
function format_money(float $amount, string $lang = 'ne'): string {
    $formatted = number_format($amount, 2);
    if ($lang === 'ne') {
        return 'रु. ' . to_nepali_number($formatted);
    }
    return 'NPR ' . $formatted;
}

/**
 * Insert Audit Log into Database
 */
function log_audit(PDO $pdo, string $userType, ?int $userId, string $action, string $description): void {
    try {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $stmt = $pdo->prepare("INSERT INTO audit_logs (user_type, user_id, action, description, ip_address) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$userType, $userId, $action, $description, $ip]);
    } catch (Exception $e) {
        error_log("Audit log failed: " . $e->getMessage());
    }
}

/**
 * Admin Authentication Guard
 */
function require_admin_auth(): void {
    if (empty($_SESSION['admin_user_id'])) {
        header('Location: /admin/index.php');
        exit;
    }
}

/**
 * Member Authentication Guard
 */
function require_member_auth(): void {
    if (empty($_SESSION['member_id'])) {
        header('Location: /login.php');
        exit;
    }
}
