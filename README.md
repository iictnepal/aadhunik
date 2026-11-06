# Aadhunik Jana Saving & Credit Co-operative Ltd.
**आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.**  
Nagarjun-4, Kathmandu, Nepal | Domain: aadhuniksaving.com.np

---

## Complete Project Architecture & Deployment Guide

This repository contains the complete bilingual website, administrative dashboard, member portal, and normalized MySQL 8.0+ database schema for **Aadhunik Jana Saving & Credit Co-operative Ltd.**

### Features Included
1. **Bilingual Public Web Portal (नेपाली / English)**:
   - Dynamic Hero Slider with genuine high-resolution Kathmandu imagery
   - Chairman's Message & Board of Directors profiles
   - 6+ Tailored Savings Schemes (Regular, Fixed Deposit, Monthly, Bal Bachat, Senior Citizen, Special)
   - 5+ Loan Facilities with eligibility & documentation requirements
   - Interactive Financial Calculators (Loan EMI & Fixed Deposit Maturity)
   - Notice & Announcement management with categories (AGM, Financial, Holiday, Vacancy)
   - Downloads center for official forms, KYC, and Annual Reports
   - Multi-category Photo Gallery with Lightbox zoom
   - Public Inquiries Form with database storage and admin response tracking
   - Responsive design with zero overflow on mobile devices

2. **Member Portal**:
   - Secure login using Member ID (`AJ-10024`) and password
   - Savings account passbook with real-time balance and transaction history
   - Active loan account breakdown with next installment due dates and repayment schedules
   - Downloadable account statement generator
   - Service request system (profile updates, cheque book, loan inquiry)

3. **Administrator Dashboard**:
   - Role-Based Access Control (Super Admin, Administrator, Content Manager, Staff User)
   - Full CRUD for Notices, News, Services, Downloadable Documents, and Sliders
   - Homepage Popup Announcement manager (for urgent AGMs and holiday notices)
   - Member management & KYC verification workflow
   - Contact messages inbox with email reply tracking
   - Complete system Audit Log with IP tracking

4. **Database (MySQL 8.0+)**:
   - Fully normalized 20+ tables (`database/database.sql`) with foreign keys, indexes, and triggers

---

## 1. Local Development on XAMPP (Windows / macOS / Linux)

### Step 1: Clone or Copy Files
1. Copy or extract the project folder into your XAMPP `htdocs` directory:
   - Windows: `C:\xampp\htdocs\aadhunik-cooperative\`
   - macOS: `/Applications/XAMPP/htdocs/aadhunik-cooperative/`
   - Linux: `/opt/lampp/htdocs/aadhunik-cooperative/`

### Step 2: Start Apache & MySQL
1. Launch the **XAMPP Control Panel**.
2. Click **Start** for both **Apache** and **MySQL**.

### Step 3: Import Database
1. Open your web browser and navigate to `http://localhost/phpmyadmin/`.
2. Click **New** on the left navigation and create a database named `aadhunik_cooperative` with collation `utf8mb4_unicode_ci`.
3. Select `aadhunik_cooperative`, click the **Import** tab at the top.
4. Choose the file located at `database/database.sql` and click **Import**.

### Step 4: Configure Environment
1. Copy `.env.example` to `.env` in the root folder:
   ```bash
   cp .env.example .env
   ```
2. Verify credentials in `.env`:
   ```ini
   DB_HOST="127.0.0.1"
   DB_PORT=3306
   DB_NAME="aadhunik_cooperative"
   DB_USER="root"
   DB_PASS=""
   ```

### Step 5: Access the Website
- **Public Portal**: `http://localhost/aadhunik-cooperative/`
- **Administrator Login**: `http://localhost/aadhunik-cooperative/admin/`
  - Username: `admin`
  - Password: `admin123`
- **Member Portal Login**: `http://localhost/aadhunik-cooperative/login.php`
  - Member ID: `AJ-10024`
  - Password: `member123`

---

## 2. cPanel Production Deployment

### Step 1: Upload Files
1. Log in to your hosting cPanel.
2. Open **File Manager** and navigate to `public_html/` (or your subdomain folder).
3. Upload and extract the project files.

### Step 2: Create MySQL Database & User
1. In cPanel, click **MySQL® Databases**.
2. Create a database, e.g., `username_aadhunik`.
3. Create a MySQL user, e.g., `username_aadhunik_user` with a strong password.
4. Add the user to the database and grant **ALL PRIVILEGES**.

### Step 3: Import Database in phpMyAdmin
1. In cPanel, open **phpMyAdmin**.
2. Select your newly created database.
3. Click **Import**, choose `database/database.sql`, and execute.

### Step 4: Set Environment Credentials
1. Create a `.env` file in the root directory (make sure file permissions are set to `600` or `640`).
2. Update:
   ```ini
   APP_ENV="production"
   APP_DEBUG=false
   APP_URL="https://aadhuniksaving.com.np"
   DB_HOST="localhost"
   DB_NAME="username_aadhunik"
   DB_USER="username_aadhunik_user"
   DB_PASS="YourStrongPasswordHere"
   ```

### Step 5: Directory Permissions & SSL
1. Ensure the `uploads/` directory has write permissions (`chmod 755`).
2. Enable free **AutoSSL** or Let's Encrypt in cPanel to ensure secure HTTPS connections.
