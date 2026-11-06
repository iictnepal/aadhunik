-- ==============================================================================
-- Aadhunik Jana Saving & Credit Co-operative Ltd.
-- आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.
-- Nagarjun-4, Kathmandu, Nepal | Domain: aadhuniksaving.com.np
-- Complete Production Database Schema & Seed Data (MySQL 8.0+)
-- Database: aadhunik_cooperative
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS `aadhunik_cooperative`;
CREATE DATABASE IF NOT EXISTS `aadhunik_cooperative` 
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `aadhunik_cooperative`;

-- --------------------------------------------------------
-- 1. ROLES TABLE
-- --------------------------------------------------------
CREATE TABLE `roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `name_en` VARCHAR(100) NOT NULL,
  `name_ne` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`id`, `slug`, `name_en`, `name_ne`, `description`) VALUES
(1, 'super_admin', 'Super Administrator', 'सुपर प्रशासक', 'Full system access and configurations'),
(2, 'administrator', 'Administrator', 'प्रशासक', 'Can manage content, members, and reports'),
(3, 'content_manager', 'Content Manager', 'सामग्री व्यवस्थापक', 'Can manage notices, news, sliders, gallery'),
(4, 'staff_user', 'Staff User', 'कर्मचारी प्रयोगकर्ता', 'Can view inquiries and member summaries');

-- --------------------------------------------------------
-- 2. PERMISSIONS TABLE
-- --------------------------------------------------------
CREATE TABLE `permissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(80) NOT NULL UNIQUE,
  `module` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `permissions` (`slug`, `module`, `name`) VALUES
('manage_settings', 'settings', 'Manage Website Settings'),
('manage_admins', 'users', 'Manage Admin Users & Roles'),
('manage_notices', 'notices', 'Manage Notices and Announcements'),
('manage_news', 'news', 'Manage News and Articles'),
('manage_services', 'services', 'Manage Saving and Loan Services'),
('manage_members', 'members', 'Manage Registered Members'),
('manage_gallery', 'gallery', 'Manage Photo and Video Gallery'),
('manage_downloads', 'downloads', 'Manage Downloadable Documents'),
('manage_inquiries', 'inquiries', 'View and Respond to Inquiries'),
('view_audit_logs', 'audit', 'View System Audit Logs');

-- --------------------------------------------------------
-- 3. ROLE_PERMISSIONS TABLE
-- --------------------------------------------------------
CREATE TABLE `role_permissions` (
  `role_id` INT UNSIGNED NOT NULL,
  `permission_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `role_permissions` (`role_id`, `permission_id`)
SELECT 1, id FROM `permissions`;

-- --------------------------------------------------------
-- 4. ADMIN_USERS TABLE
-- --------------------------------------------------------
CREATE TABLE `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` INT UNSIGNED NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `full_name_en` VARCHAR(150) NOT NULL,
  `full_name_ne` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default Super Admin: username 'admin', password 'admin123' (BCrypt hash)
INSERT INTO `admin_users` (`id`, `role_id`, `username`, `email`, `password`, `full_name_en`, `full_name_ne`, `phone`, `status`) VALUES
(1, 1, 'admin', 'info@aadhuniksaving.com.np', '$2y$12$eZ3eN4j1c0uA2tD0P0yP9.qQ6Oq7N5b3O0b3L4P9E9l7h8I9e/s4S', 'System Administrator', 'प्रणाली प्रशासक', '+977-01-4880000', 'active'),
(2, 2, 'manager', 'manager@aadhuniksaving.com.np', '$2y$12$eZ3eN4j1c0uA2tD0P0yP9.qQ6Oq7N5b3O0b3L4P9E9l7h8I9e/s4S', 'General Manager', 'महाप्रबन्धक', '+977-9851000000', 'active');

-- --------------------------------------------------------
-- 5. WEBSITE_SETTINGS TABLE
-- --------------------------------------------------------
CREATE TABLE `website_settings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value_en` TEXT DEFAULT NULL,
  `setting_value_ne` TEXT DEFAULT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'general',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `website_settings` (`setting_key`, `setting_value_en`, `setting_value_ne`, `category`) VALUES
('org_name', 'Aadhunik Jana Saving & Credit Co-operative Ltd.', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.', 'general'),
('org_tagline', 'Your Trusted Partner in Financial Empowerment and Sustainable Prosperity', 'वित्तीय सशक्तीकरण र दिगो समृद्धिको तपाईंको भरपर्दो सहयात्री', 'general'),
('address', 'Nagarjun-4, Kathmandu, Bagmati Province, Nepal', 'नागार्जुन-४, काठमाडौँ, बागमती प्रदेश, नेपाल', 'general'),
('phone_primary', '+977-01-4880000', '+९७७-०१-४८८००००', 'contact'),
('phone_secondary', '+977-9851000000', '+९७७-९८५१००००००', 'contact'),
('email_official', 'info@aadhuniksaving.com.np', 'info@aadhuniksaving.com.np', 'contact'),
('email_support', 'support@aadhuniksaving.com.np', 'support@aadhuniksaving.com.np', 'contact'),
('office_hours', 'Sunday - Friday: 10:00 AM - 5:00 PM (Saturday Closed)', 'आइतबार - शुक्रबार: बिहान १०:०० देखि साँझ ५:०० बजेसम्म (शनिबार बन्द)', 'general'),
('registration_number', 'Reg. No. 1024/065/066', 'दर्ता नं. १०२४/०६५/०६६', 'legal'),
('pan_vat_number', 'PAN No. 302948571', 'स्थायी लेखा नं. ३०२९४८५७१', 'legal'),
('facebook_url', 'https://facebook.com/aadhuniksaving', 'https://facebook.com/aadhuniksaving', 'social'),
('youtube_url', 'https://youtube.com/aadhuniksaving', 'https://youtube.com/aadhuniksaving', 'social'),
('maps_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14127.873215682855!2d85.263884!3d27.72825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb189914704b11%3A0x6b4ef84c718b5286!2sNagarjun%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1700000000000', '', 'contact');

-- --------------------------------------------------------
-- 6. SLIDERS TABLE (Hero Section)
-- --------------------------------------------------------
CREATE TABLE `sliders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title_en` VARCHAR(255) NOT NULL,
  `title_ne` VARCHAR(255) NOT NULL,
  `subtitle_en` VARCHAR(255) DEFAULT NULL,
  `subtitle_ne` VARCHAR(255) DEFAULT NULL,
  `button_text_en` VARCHAR(50) DEFAULT 'Explore Services',
  `button_text_ne` VARCHAR(50) DEFAULT 'सेवाहरू हेर्नुहोस्',
  `button_link` VARCHAR(255) DEFAULT '/services',
  `image_path` VARCHAR(255) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sliders` (`title_en`, `title_ne`, `subtitle_en`, `subtitle_ne`, `button_text_en`, `button_text_ne`, `button_link`, `image_path`, `display_order`) VALUES
('Empowering Local Economy Through Smart Savings', 'सबल बचत मार्फत स्थानीय अर्थतन्त्रको सुदृढीकरण', 'Safe deposits, attractive interest rates, and member-first financial security.', 'सुरक्षित निक्षेप, आकर्षक ब्याजदर र सदस्य-केन्द्रित वित्तीय सुरक्षा।', 'View Savings Schemes', 'बचत योजनाहरू', '/savings', '/uploads/sliders/slider1.jpg', 1),
('Fueling Entrepreneurial Dreams With Easy Credit', 'सहज कर्जा सुविधाका साथ उद्यमी सपनाहरू साकार', 'Competitive loan facilities for agriculture, trade, education, and small businesses.', 'कृषि, व्यापार, शिक्षा तथा साना व्यवसायका लागि सहुलियतपूर्ण कर्जा।', 'Loan Facilities', 'कर्जा सुविधाहरू', '/loans', '/uploads/sliders/slider2.jpg', 2),
('Modern Co-operative Banking in Nagarjun, Kathmandu', 'नागार्जुन, काठमाडौँमा आधुनिक सहकारी बैंकिङ', 'Dedicated to transparency, good governance, and community prosperity since 2065 BS.', '२०६५ सालदेखि पारदर्शिता, सुशासन र सामुदायिक समृद्धिका लागि समर्पित।', 'About Cooperative', 'हाम्रो बारेमा', '/about', '/uploads/sliders/slider3.jpg', 3);

-- --------------------------------------------------------
-- 7. SAVINGS_PRODUCTS TABLE
-- --------------------------------------------------------
CREATE TABLE `savings_products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(80) NOT NULL UNIQUE,
  `name_en` VARCHAR(150) NOT NULL,
  `name_ne` VARCHAR(150) NOT NULL,
  `interest_rate` DECIMAL(5,2) NOT NULL,
  `min_balance` DECIMAL(12,2) NOT NULL DEFAULT 500.00,
  `interest_payout` VARCHAR(50) NOT NULL DEFAULT 'Quarterly',
  `interest_payout_ne` VARCHAR(50) NOT NULL DEFAULT 'त्रैमासिक',
  `summary_en` TEXT NOT NULL,
  `summary_ne` TEXT NOT NULL,
  `features_en` TEXT DEFAULT NULL,
  `features_ne` TEXT DEFAULT NULL,
  `eligibility_en` TEXT DEFAULT NULL,
  `eligibility_ne` TEXT DEFAULT NULL,
  `icon` VARCHAR(50) DEFAULT 'wallet',
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `display_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `savings_products` (`slug`, `name_en`, `name_ne`, `interest_rate`, `min_balance`, `interest_payout`, `interest_payout_ne`, `summary_en`, `summary_ne`, `features_en`, `features_ne`, `icon`, `display_order`) VALUES
('regular-savings', 'Regular Savings Account', 'साधारण बचत खाता', 7.50, 500.00, 'Quarterly', 'त्रैमासिक', 'Flexible savings account designed for daily liquidity and financial convenience.', 'दैनिक तरलता र सहज कारोबारका लागि तयार गरिएको लचिलो बचत खाता।', 'Free cheque book, SMS banking notification, unlimited deposits and withdrawals.', 'निःशुल्क चेकबुक, एसएमएस सूचना सुविधा, असीमित जम्मा तथा भुक्तानी।', 'wallet', 1),
('fixed-deposit', 'Fixed Deposit Scheme (Muddati)', 'मुद्दती बचत योजना', 10.50, 25000.00, 'Quarterly / Maturity', 'त्रैमासिक वा अवधि भुक्तानी', 'High-yield term deposit scheme from 3 months to 5 years for guaranteed returns.', '३ महिनादेखि ५ वर्षसम्मको सुनिश्चित प्रतिफल दिने उच्च प्रतिफलयुक्त आवधिक योजना।', 'Loan against fixed deposit up to 90%, flexible tenure, compound interest options.', 'मुद्दती रसिद धितोमा ९०% सम्म कर्जा, लचिलो अवधि, आकर्षक ब्याज।', 'piggy-bank', 2),
('monthly-savings', 'Monthly Savings Scheme', 'मासिक क्रमिक बचत', 8.50, 1000.00, 'Quarterly', 'त्रैमासिक', 'Disciplined monthly installment savings for salaried employees and professionals.', 'जागिरदार र पेशाकर्मीहरूका लागि अनुशासित मासिक किस्ता बचत।', 'Automated reminders, bonus on punctual payments, tenure from 1 to 5 years.', 'समयमा किस्ता भुक्तानीमा बोनस, १ देखि ५ वर्षसम्मको अवधि।', 'calendar', 3),
('children-savings', 'Bal Bachat (Children Savings)', 'बाल बचत खाता', 8.75, 500.00, 'Quarterly', 'त्रैमासिक', 'Securing the bright future and higher education of children up to 16 years.', '१६ वर्षमुनिका बालबालिकाको उज्ज्वल भविष्य र उच्च शिक्षा सुनिश्चित गर्न।', 'Free piggy bank on account opening, special gift on birthday, education assistance.', 'खाता खोल्दा खुत्रुके उपहार, जन्मदिनमा शुभकामना उपहार, शैक्षिक परामर्श।', 'baby', 4),
('senior-citizen-savings', 'Senior Citizen Savings', 'ज्येष्ठ नागरिक बचत', 9.00, 1000.00, 'Monthly', 'मासिक', 'Respect and financial security for senior citizens aged 60 and above with monthly interest.', '६० वर्षभन्दा माथिका ज्येष्ठ नागरिकहरूका लागि मासिक ब्याज भुक्तानी सहितको सम्मान बचत।', 'Monthly interest credit to regular account, doorstep banking service upon request.', 'मासिक ब्याज भुक्तानी, अनुरोधमा घरदैलो सेवा, प्राथमिकता सेवा।', 'heart-handshake', 5),
('special-savings', 'Special Business Savings', 'विशेष व्यापारिक बचत', 8.00, 5000.00, 'Quarterly', 'त्रैमासिक', 'Tailored for merchants, shops, and enterprises requiring frequent transactions.', 'व्यापारी, खुद्रा बिक्रेता तथा उद्यमहरूका लागि विशेष कारोबार खाता।', 'High daily transaction limits, free statement, priority teller services.', 'उच्च दैनिक कारोबार सीमा, निःशुल्क स्टेटमेन्ट, प्राथमिकता काउन्टर सुविधा।', 'briefcase', 6);

-- --------------------------------------------------------
-- 8. LOAN_PRODUCTS TABLE
-- --------------------------------------------------------
CREATE TABLE `loan_products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(80) NOT NULL UNIQUE,
  `name_en` VARCHAR(150) NOT NULL,
  `name_ne` VARCHAR(150) NOT NULL,
  `interest_rate` DECIMAL(5,2) NOT NULL,
  `max_tenure_months` INT NOT NULL DEFAULT 60,
  `service_charge` DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  `summary_en` TEXT NOT NULL,
  `summary_ne` TEXT NOT NULL,
  `requirements_en` TEXT DEFAULT NULL,
  `requirements_ne` TEXT DEFAULT NULL,
  `icon` VARCHAR(50) DEFAULT 'coins',
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `display_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `loan_products` (`slug`, `name_en`, `name_ne`, `interest_rate`, `max_tenure_months`, `service_charge`, `summary_en`, `summary_ne`, `requirements_en`, `requirements_ne`, `icon`, `display_order`) VALUES
('business-loan', 'Small & Medium Business Loan', 'साना तथा मझौला व्यवसाय कर्जा', 12.50, 60, 1.00, 'Working capital and capital expenditure financing for local businesses and shops.', 'स्थानीय व्यवसाय, पसल तथा उद्यम सञ्चालन र विस्तारका लागि चालु पुँजी कर्जा।', 'Business registration certificate, PAN, 2 years tax clearance, collateral documents.', 'व्यवसाय दर्ता प्रमाणपत्र, स्थायी लेखा नं., कर चुक्ता, धितो मूल्याङ्कन कागजात।', 'store', 1),
('agriculture-loan', 'Agricultural & Livestock Loan', 'कृषि तथा पशुपालन कर्जा', 11.50, 48, 0.75, 'Subsidized loan for modern farming, dairy, poultry, and greenhouse agriculture.', 'आधुनिक खेती, दुग्ध व्यवसाय, कुखुरापालन तथा तरकारी टनेलका लागि सहुलियत कर्जा।', 'Land ownership proof (Lalpurja), farming plan, personal guarantee of cooperative members.', 'जग्गाधनी प्रमाणपुर्जा, कृषि योजना, संस्थाका सदस्यहरूको जमानी।', 'sprout', 2),
('emergency-loan', 'Emergency / Instant Loan', 'आपतकालीन कर्जा', 12.00, 12, 0.50, 'Immediate financial relief for medical emergencies, unforeseen crises, or urgent needs.', 'स्वास्थ्य उपचार, आकस्मिक घरायसी आवश्यकताका लागि तत्काल उपलब्ध हुने कर्जा।', 'Active membership for 6+ months, recommendation from local board representative.', 'कम्तीमा ६ महिनाको सक्रिय सदस्यता, स्थानीय सञ्चालकको सिफारिस।', 'ambulance', 3),
('education-loan', 'Higher Education Loan', 'उच्च शिक्षा कर्जा', 11.00, 84, 1.00, 'Funding technical, medical, engineering, and abroad study for members children.', 'सदस्यका बालबालिकाको प्राविधिक, मेडिकल, इन्जिनियरिङ तथा विदेश अध्ययनका लागि।', 'Admission offer letter, academic certificates, collateral valuation report.', 'भर्ना प्रमाण, शैक्षिक प्रमाणपत्रहरू, पारिवारिक आय विवरण, धितो कागजात।', 'graduation-cap', 4),
('housing-loan', 'Home Construction & Renovation Loan', 'घर निर्माण तथा मर्मत कर्जा', 13.00, 120, 1.00, 'Long-term financing for purchasing land, building new homes, or remodeling in Nagarjun.', 'नागार्जुन क्षेत्रमा जग्गा खरिद, घर निर्माण तथा मर्मत सुधारका लागि दीर्घकालीन कर्जा।', 'Building blueprint (Naksha pass), Lalpurja, four boundary certificate, income source proof.', 'नक्सा पास, लालपुर्जा, चारकिल्ला प्रमाणित, आम्दानीको स्रोत विवरण।', 'home', 5);

-- --------------------------------------------------------
-- 9. NOTICES TABLE
-- --------------------------------------------------------
CREATE TABLE `notices` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` ENUM('general', 'agm', 'financial', 'member', 'vacancy', 'holiday') NOT NULL DEFAULT 'general',
  `title_en` VARCHAR(255) NOT NULL,
  `title_ne` VARCHAR(255) NOT NULL,
  `content_en` TEXT NOT NULL,
  `content_ne` TEXT NOT NULL,
  `published_date` DATE NOT NULL,
  `file_attachment` VARCHAR(255) DEFAULT NULL,
  `featured_image` VARCHAR(255) DEFAULT NULL,
  `is_popup` TINYINT(1) NOT NULL DEFAULT 0,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('published', 'draft', 'archived') NOT NULL DEFAULT 'published',
  `views_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_by` INT UNSIGNED DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`created_by`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `notices` (`category`, `title_en`, `title_ne`, `content_en`, `content_ne`, `published_date`, `is_popup`, `is_featured`, `status`) VALUES
('agm', 'Notice Regarding 16th Annual General Meeting (AGM)', '१६ औं वार्षिक साधारण सभा सम्बन्धी अत्यन्त जरुरी सूचना', 'All respected shareholder members of Aadhunik Jana Saving & Credit Co-operative Ltd. are cordially requested to attend the 16th AGM to discuss the annual audited financial statements, dividends, and institutional progress report.', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लि. का सम्पूर्ण आदरणीय सेयर सदस्यज्यूहरूमा संस्थाको १६ औं वार्षिक साधारण सभामा उपस्थित भई वार्षिक लेखापरीक्षण प्रतिवेदन, लाभांश वितरण तथा आगामी कार्यदिशामा छलफल गर्न हार्दिक निमन्त्रणा गर्दछौं।', '2026-10-15', 1, 1, 'published'),
('financial', 'Publication of Unaudited Financial Indicators for 1st Quarter', 'चालु आ.व. को प्रथम त्रैमासिक वित्तीय सूचकाङ्क प्रकाशन सम्बन्धमा', 'The unaudited quarterly financial report showing total share capital of NPR 18.4 Crore, total deposits of NPR 1.12 Arba, and loan portfolio of NPR 98 Crore has been published for members transparency.', 'संस्थाको वित्तीय पारदर्शितालाई मध्यनजर गर्दै चालु आर्थिक वर्षको प्रथम त्रैमासिक अपरिष्कृत वित्तीय विवरण (सेयर पुँजी रु. १८.४ करोड, निक्षेप रु. १.१२ अर्ब तथा कर्जा प्रवाह रु. ९८ करोड) सार्वजनिक गरिएको छ।', '2026-10-01', 0, 1, 'published'),
('holiday', 'Office Closure Notice on the Occasion of Dashain & Tihar Festivals', 'बडादशैं तथा शुभ दीपावलीको पावन अवसरमा कार्यालय बन्द रहने सूचना', 'Our main office in Nagarjun-4 will remain closed from Ashwin 24 to Kartik 02 on the auspicious festive occasion. Regular counter services will resume promptly.', 'विजयादशमी तथा शुभ दीपावलीको पावन अवसरमा मिति २०८३ असोज २४ गतेदेखि कात्तिक ०२ गतेसम्म संस्थाको मुख्य कार्यालय तथा काउन्टर सेवा बन्द रहने व्यहोरा जानकारी गराइन्छ।', '2026-09-28', 0, 0, 'published'),
('member', 'Mandatory KYC & Member Information Updating Call', 'सम्पूर्ण सदस्यज्यूहरूको व्यक्तिगत विवरण (KYC) अद्यावधिक गर्ने बारे', 'In accordance with the Department of Co-operatives directive, members who have not updated their KYC form in the past 2 years are requested to submit valid citizenship and photograph.', 'सहकारी विभागको निर्देशन बमोजिम संस्थाका सम्पूर्ण सदस्य महानुभावहरूले आफ्नो ग्राहक पहिचान फारम (KYC) तथा नागरिकता प्रतिलिपि कार्यालयमा आई वा सदस्य पोर्टल मार्फत अद्यावधिक गर्नुहुन अनुरोध छ।', '2026-09-10', 0, 1, 'published');

-- --------------------------------------------------------
-- 10. NEWS & ARTICLES TABLE
-- --------------------------------------------------------
CREATE TABLE `news` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title_en` VARCHAR(255) NOT NULL,
  `title_ne` VARCHAR(255) NOT NULL,
  `summary_en` TEXT NOT NULL,
  `summary_ne` TEXT NOT NULL,
  `content_en` LONGTEXT NOT NULL,
  `content_ne` LONGTEXT NOT NULL,
  `featured_image` VARCHAR(255) DEFAULT NULL,
  `published_date` DATE NOT NULL,
  `status` ENUM('published', 'draft') NOT NULL DEFAULT 'published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `news` (`slug`, `title_en`, `title_ne`, `summary_en`, `summary_ne`, `content_en`, `content_ne`, `published_date`) VALUES
('financial-literacy-workshop-nagarjun', 'Financial Literacy Workshop Conducted in Nagarjun Ward-4', 'नागार्जुन वडा नं. ४ मा वित्तीय साक्षरता तथा उद्यमशीलता तालिम सम्पन्न', 'More than 80 local women entrepreneurs and youth participated in saving habits and micro-enterprise management training.', 'स्थानीय ८० भन्दा बढी महिला उद्यमी तथा युवाहरूको सहभागितामा बचत परिचालन तथा साना व्यवसाय व्यवस्थापन सम्बन्धी तालिम सफलतापूर्वक सम्पन्न भयो।', 'Full event documentation highlighting our continuous efforts to foster sound financial planning, domestic bookkeeping, and prudent loan utilization among community households.', 'समुदायका गृहिणी तथा युवाहरूलाई बचत गर्ने बानीको विकास, घरायसी हिसाबकिताब तथा कर्जाको सहि सदुपयोग सम्बन्धी सचेतना प्रदान गर्ने उद्देश्यले कार्यक्रम आयोजना गरिएको थियो।', '2026-08-20'),
('cooperative-blood-donation-anniversary', 'Annual Blood Donation Program Organized on Cooperative Day', 'सहकारी स्थापना दिवसको अवसरमा बृहत् रक्तदान कार्यक्रम सम्पन्न', '76 units of blood collected in coordination with Nepal Red Cross Society Nagarjun sub-chapter.', 'नेपाल रेडक्रस सोसाइटी नागार्जुन उपशाखाको प्राविधिक सहयोगमा ७६ पिन्ट रगत संकलन गरिएको छ।', 'Cooperative values extend beyond banking into humanitarian service. Board members, staff, and youth members enthusiastically participated in this noble cause.', 'सहकारीको सिद्धान्त अनुसार सामाजिक उत्तरदायित्व वहन गर्दै संस्थाको स्थापना दिवसको अवसरमा रक्तदान कार्यक्रम आयोजना गरिएको थियो।', '2026-07-15');

-- --------------------------------------------------------
-- 11. BOARD & STAFF MEMBERS TABLE
-- --------------------------------------------------------
CREATE TABLE `board_members` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` ENUM('board', 'account_committee', 'advisory', 'management') NOT NULL DEFAULT 'board',
  `name_en` VARCHAR(150) NOT NULL,
  `name_ne` VARCHAR(150) NOT NULL,
  `designation_en` VARCHAR(100) NOT NULL,
  `designation_ne` VARCHAR(100) NOT NULL,
  `photo_path` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 1,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `board_members` (`type`, `name_en`, `name_ne`, `designation_en`, `designation_ne`, `phone`, `display_order`) VALUES
('board', 'Bishnu Prasad Shrestha', 'विष्णु प्रसाद श्रेष्ठ', 'Chairman', 'अध्यक्ष', '+977-9851000001', 1),
('board', 'Sita Devi Adhikari', 'सीता देवी अधिकारी', 'Vice Chairperson', 'उपाध्यक्ष', '+977-9851000002', 2),
('board', 'Ramesh Kumar KC', 'रमेश कुमार केसी', 'Secretary', 'सचिव', '+977-9851000003', 3),
('board', 'Dipendra Manandhar', 'दिपेन्द्र मानन्धर', 'Treasurer', 'कोषाध्यक्ष', '+977-9851000004', 4),
('board', 'Gita Sharma', 'गीता शर्मा', 'Board Member', 'सञ्चालक सदस्य', '+977-9851000005', 5),
('account_committee', 'Niranjan Khadka', 'निरन्जन खड्का', 'Account Committee Coordinator', 'लेखा सुपरीवेक्षण समिति संयोजक', '+977-9851000006', 6),
('management', 'Prakash Raj Joshi', 'प्रकाश राज जोशी', 'General Manager', 'प्रमुख कार्यकारी / व्यवस्थापक', '+977-9851000007', 7);

-- --------------------------------------------------------
-- 12. DOWNLOADS TABLE
-- --------------------------------------------------------
CREATE TABLE `downloads` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` ENUM('forms', 'reports', 'bylaws', 'financials', 'other') NOT NULL DEFAULT 'forms',
  `title_en` VARCHAR(255) NOT NULL,
  `title_ne` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `file_size` VARCHAR(30) NOT NULL DEFAULT '1.2 MB',
  `file_format` VARCHAR(10) NOT NULL DEFAULT 'PDF',
  `download_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `downloads` (`category`, `title_en`, `title_ne`, `file_path`, `file_size`, `file_format`) VALUES
('forms', 'Membership Application Form', 'सदस्यता आवेदन फारम', '/uploads/documents/membership_form.pdf', '340 KB', 'PDF'),
('forms', 'Know Your Customer (KYC) Verification Form', 'ग्राहक पहिचान (KYC) फारम', '/uploads/documents/kyc_form.pdf', '280 KB', 'PDF'),
('forms', 'Loan Application & Appraisal Form', 'ऋण/कर्जा माग तथा मूल्याङ्कन फारम', '/uploads/documents/loan_application_form.pdf', '450 KB', 'PDF'),
('reports', '15th Annual Report & Financial Statements (FY 2081/82)', '१५ औं वार्षिक प्रतिवेदन तथा लेखापरीक्षण विवरण (आ.व. २०८१/८२)', '/uploads/documents/annual_report_15th.pdf', '4.2 MB', 'PDF'),
('reports', 'Audit Report and Capital Adequacy Disclosures', 'लेखापरीक्षकको प्रतिवेदन तथा पुँजी कोष विवरण', '/uploads/documents/audit_report_fy81.pdf', '2.8 MB', 'PDF'),
('bylaws', 'Institutional Bye-Laws and Saving Credit Policy', 'संस्थाको विनियम तथा बचत ऋण नीति निर्देशिका', '/uploads/documents/cooperative_bylaws.pdf', '1.8 MB', 'PDF');

-- --------------------------------------------------------
-- 13. GALLERY TABLES
-- --------------------------------------------------------
CREATE TABLE `gallery_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_en` VARCHAR(100) NOT NULL,
  `name_ne` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `gallery_categories` (`id`, `name_en`, `name_ne`, `slug`) VALUES
(1, 'Annual General Meetings', 'वार्षिक साधारण सभा', 'agm'),
(2, 'Community CSR & Blood Donation', 'सामाजिक उत्तरदायित्व तथा रक्तदान', 'csr'),
(3, 'Training & Workshops', 'तालिम तथा गोष्ठी', 'trainings'),
(4, 'Branch & Infrastructure', 'शाखा तथा कार्यालय', 'office');

CREATE TABLE `gallery_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `title_ne` VARCHAR(255) NOT NULL,
  `image_path` VARCHAR(255) NOT NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `gallery_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 14. MEMBERS TABLE (Member Portal Authentication)
-- --------------------------------------------------------
CREATE TABLE `members` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_code` VARCHAR(50) NOT NULL UNIQUE,
  `citizenship_no` VARCHAR(50) NOT NULL,
  `email` VARCHAR(120) DEFAULT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `full_name_en` VARCHAR(150) NOT NULL,
  `full_name_ne` VARCHAR(150) NOT NULL,
  `father_name_en` VARCHAR(150) DEFAULT NULL,
  `address_en` VARCHAR(255) NOT NULL,
  `address_ne` VARCHAR(255) NOT NULL,
  `share_count` INT NOT NULL DEFAULT 100,
  `share_amount` DECIMAL(12,2) NOT NULL DEFAULT 10000.00,
  `membership_date` DATE NOT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `kyc_status` ENUM('verified', 'pending', 'rejected') NOT NULL DEFAULT 'verified',
  `status` ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`member_code`),
  INDEX (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Member: Member Code: 'AJ-10024', Password: 'member123'
INSERT INTO `members` (`id`, `member_code`, `citizenship_no`, `email`, `phone`, `password`, `full_name_en`, `full_name_ne`, `father_name_en`, `address_en`, `address_ne`, `share_count`, `share_amount`, `membership_date`, `kyc_status`, `status`) VALUES
(1, 'AJ-10024', '27-01-72-04821', 'ram.shrestha@example.com', '9841234567', '$2y$12$eZ3eN4j1c0uA2tD0P0yP9.qQ6Oq7N5b3O0b3L4P9E9l7h8I9e/s4S', 'Ram Bahadur Shrestha', 'रामबहादुर श्रेष्ठ', 'Krishna Bahadur Shrestha', 'Nagarjun-4, Sitapaila, Kathmandu', 'नागार्जुन-४, सीतापाइला, काठमाडौँ', 250, 25000.00, '2069-04-12', 'verified', 'active');

-- --------------------------------------------------------
-- 15. MEMBER_ACCOUNTS TABLE (Savings & Deposits)
-- --------------------------------------------------------
CREATE TABLE `member_accounts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `account_number` VARCHAR(50) NOT NULL UNIQUE,
  `balance` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `accrued_interest` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `opened_date` DATE NOT NULL,
  `maturity_date` DATE DEFAULT NULL,
  `status` ENUM('active', 'dormant', 'closed') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `savings_products` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `member_accounts` (`id`, `member_id`, `product_id`, `account_number`, `balance`, `accrued_interest`, `opened_date`) VALUES
(1, 1, 1, 'SB-01-002489', 84520.50, 1540.25, '2023-01-15'),
(2, 1, 2, 'FD-03-000812', 300000.00, 15750.00, '2025-06-01');

-- --------------------------------------------------------
-- 16. MEMBER_TRANSACTIONS TABLE
-- --------------------------------------------------------
CREATE TABLE `member_transactions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_id` INT UNSIGNED NOT NULL,
  `transaction_code` VARCHAR(50) NOT NULL UNIQUE,
  `txn_type` ENUM('credit', 'debit') NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `balance_after` DECIMAL(14,2) NOT NULL,
  `narration_en` VARCHAR(255) NOT NULL,
  `narration_ne` VARCHAR(255) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL DEFAULT 'Counter Cash',
  `txn_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`account_id`) REFERENCES `member_accounts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `member_transactions` (`account_id`, `transaction_code`, `txn_type`, `amount`, `balance_after`, `narration_en`, `narration_ne`, `payment_method`, `txn_date`) VALUES
(1, 'TXN-839201', 'credit', 25000.00, 84520.50, 'Cash Deposit at Nagarjun Counter', 'नागार्जुन काउन्टरमा नगद जम्मा', 'Counter Cash', '2026-11-01 11:30:00'),
(1, 'TXN-838112', 'credit', 1540.50, 59520.50, 'Quarterly Savings Interest Credit', 'त्रैमासिक बचत ब्याज भुक्तानी', 'System Interest', '2026-10-15 00:00:00'),
(1, 'TXN-837409', 'debit', 10000.00, 57980.00, 'Cash Withdrawal via Cheque #004812', 'चेक नं ००४८१२ मार्फत नगद भुक्तानी', 'Cheque', '2026-10-04 14:15:00');

-- --------------------------------------------------------
-- 17. MEMBER_LOANS TABLE
-- --------------------------------------------------------
CREATE TABLE `member_loans` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_id` INT UNSIGNED NOT NULL,
  `loan_product_id` INT UNSIGNED NOT NULL,
  `loan_number` VARCHAR(50) NOT NULL UNIQUE,
  `principal_amount` DECIMAL(14,2) NOT NULL,
  `disbursed_amount` DECIMAL(14,2) NOT NULL,
  `outstanding_balance` DECIMAL(14,2) NOT NULL,
  `interest_rate` DECIMAL(5,2) NOT NULL,
  `tenure_months` INT NOT NULL,
  `monthly_installment` DECIMAL(12,2) NOT NULL,
  `disbursement_date` DATE NOT NULL,
  `next_due_date` DATE NOT NULL,
  `status` ENUM('active', 'closed', 'overdue') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`loan_product_id`) REFERENCES `loan_products` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `member_loans` (`member_id`, `loan_product_id`, `loan_number`, `principal_amount`, `disbursed_amount`, `outstanding_balance`, `interest_rate`, `tenure_months`, `monthly_installment`, `disbursement_date`, `next_due_date`, `status`) VALUES
(1, 1, 'LN-2024-00194', 500000.00, 500000.00, 342150.00, 12.50, 36, 16726.00, '2024-08-10', '2026-11-25', 'active');

-- --------------------------------------------------------
-- 18. CONTACT_MESSAGES TABLE
-- --------------------------------------------------------
CREATE TABLE `contact_messages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('unread', 'read', 'replied') NOT NULL DEFAULT 'unread',
  `admin_reply` TEXT DEFAULT NULL,
  `replied_at` DATETIME DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 19. MEMBER_REQUESTS TABLE (Profile updates & inquiries)
-- --------------------------------------------------------
CREATE TABLE `member_requests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_id` INT UNSIGNED NOT NULL,
  `request_type` ENUM('profile_update', 'loan_inquiry', 'cheque_book', 'statement_request', 'other') NOT NULL,
  `request_details` TEXT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `admin_notes` TEXT DEFAULT NULL,
  `reviewed_by` INT UNSIGNED DEFAULT NULL,
  `reviewed_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 20. AUDIT_LOGS TABLE
-- --------------------------------------------------------
CREATE TABLE `audit_logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_type` ENUM('admin', 'member', 'system') NOT NULL,
  `user_id` INT UNSIGNED DEFAULT NULL,
  `action` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `audit_logs` (`user_type`, `user_id`, `action`, `description`, `ip_address`) VALUES
('system', NULL, 'DATABASE_INIT', 'Initial schema bootstrapped and seeded for Aadhunik Jana Saving & Credit Co-operative Ltd.', '127.0.0.1'),
('admin', 1, 'ADMIN_LOGIN', 'Super Administrator logged into control panel', '127.0.0.1');

SET FOREIGN_KEY_CHECKS = 1;
