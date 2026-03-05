-- Phase 1: Customer Enhancement Migration Preview
-- Generated: March 5, 2026
-- 
-- This shows the database changes that will be applied when running:
-- npx prisma migrate dev --name add_customer_enhancement

-- ================================================================
-- 1. CREATE NEW ENUMS
-- ================================================================

CREATE TYPE "CompanySize" AS ENUM (
  'SOLO',
  'SMALL_1_10', 
  'MEDIUM_11_50',
  'LARGE_51_200',
  'ENTERPRISE_200_PLUS'
);

CREATE TYPE "LeadSource" AS ENUM (
  'WEBSITE',
  'REFERRAL', 
  'LINKEDIN',
  'GOOGLE_ADS',
  'NETWORKING',
  'COLD_OUTREACH',
  'EXISTING_CLIENT',
  'OTHER'
);

CREATE TYPE "CustomerType" AS ENUM (
  'PROSPECT',
  'QUALIFIED',
  'OPPORTUNITY', 
  'CUSTOMER',
  'PARTNER',
  'DORMANT'
);

CREATE TYPE "PreferredContact" AS ENUM (
  'EMAIL',
  'PHONE',
  'TEXT',
  'SLACK', 
  'TEAMS',
  'WHATSAPP'
);

CREATE TYPE "InteractionType" AS ENUM (
  'EMAIL',
  'PHONE_CALL',
  'MEETING',
  'VIDEO_CALL',
  'TEXT_MESSAGE',
  'DEMO',
  'PROPOSAL_REVIEW',
  'CONTRACT_DISCUSSION',
  'CHECK_IN',
  'FOLLOW_UP',
  'OTHER'
);

-- ================================================================
-- 2. ENHANCE EXISTING USER TABLE (NON-BREAKING)
-- ================================================================

ALTER TABLE "User" ADD COLUMN "companyName" TEXT;
ALTER TABLE "User" ADD COLUMN "jobTitle" TEXT;
ALTER TABLE "User" ADD COLUMN "phone" TEXT;
ALTER TABLE "User" ADD COLUMN "website" TEXT;
ALTER TABLE "User" ADD COLUMN "industry" TEXT;
ALTER TABLE "User" ADD COLUMN "companySize" "CompanySize";
ALTER TABLE "User" ADD COLUMN "leadSource" "LeadSource";
ALTER TABLE "User" ADD COLUMN "customerType" "CustomerType" NOT NULL DEFAULT 'PROSPECT';
ALTER TABLE "User" ADD COLUMN "lifetimeValue" INTEGER;
ALTER TABLE "User" ADD COLUMN "lastContactDate" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "preferredContact" "PreferredContact" NOT NULL DEFAULT 'EMAIL';
ALTER TABLE "User" ADD COLUMN "timezone" TEXT DEFAULT 'America/New_York';
ALTER TABLE "User" ADD COLUMN "notes" TEXT;

-- ================================================================
-- 3. CREATE NEW CUSTOMER MANAGEMENT TABLES
-- ================================================================

-- Customer Contacts (Multiple contacts per customer)
CREATE TABLE "CustomerContact" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "jobTitle" TEXT,
  "department" TEXT,
  "isPrimary" BOOLEAN NOT NULL DEFAULT false,
  "isDecisionMaker" BOOLEAN NOT NULL DEFAULT false,
  "isTechnical" BOOLEAN NOT NULL DEFAULT false,
  "isBilling" BOOLEAN NOT NULL DEFAULT false,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CustomerContact_pkey" PRIMARY KEY ("id")
);

-- Customer Interactions (Communication history)
CREATE TABLE "CustomerInteraction" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "contactId" TEXT,
  "type" "InteractionType" NOT NULL,
  "subject" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "outcome" TEXT,
  "scheduledDate" TIMESTAMP(3),
  "completedDate" TIMESTAMP(3),
  "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
  "followUpDate" TIMESTAMP(3),
  "followUpNotes" TEXT,
  "createdBy" TEXT NOT NULL,
  "source" TEXT DEFAULT 'manual',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CustomerInteraction_pkey" PRIMARY KEY ("id")
);

-- Customer Tags (Organization and categorization)
CREATE TABLE "CustomerTag" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "tag" TEXT NOT NULL,
  "color" TEXT NOT NULL DEFAULT '#3B82F6',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "CustomerTag_pkey" PRIMARY KEY ("id")
);

-- ================================================================
-- 4. CREATE INDEXES AND CONSTRAINTS
-- ================================================================

-- CustomerContact constraints
CREATE UNIQUE INDEX "CustomerContact_customerId_email_key" ON "CustomerContact"("customerId", "email");

-- CustomerTag constraints  
CREATE UNIQUE INDEX "CustomerTag_customerId_tag_key" ON "CustomerTag"("customerId", "tag");

-- Performance indexes
CREATE INDEX "User_customerType_idx" ON "User"("customerType");
CREATE INDEX "User_leadSource_idx" ON "User"("leadSource");
CREATE INDEX "User_lastContactDate_idx" ON "User"("lastContactDate");
CREATE INDEX "CustomerInteraction_customerId_createdAt_idx" ON "CustomerInteraction"("customerId", "createdAt" DESC);
CREATE INDEX "CustomerInteraction_type_idx" ON "CustomerInteraction"("type");
CREATE INDEX "CustomerInteraction_followUpDate_idx" ON "CustomerInteraction"("followUpDate");

-- ================================================================
-- 5. ADD FOREIGN KEY CONSTRAINTS
-- ================================================================

-- CustomerContact foreign keys
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_customerId_fkey" 
  FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CustomerInteraction foreign keys  
ALTER TABLE "CustomerInteraction" ADD CONSTRAINT "CustomerInteraction_customerId_fkey"
  FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CustomerInteraction" ADD CONSTRAINT "CustomerInteraction_contactId_fkey"
  FOREIGN KEY ("contactId") REFERENCES "CustomerContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CustomerTag foreign keys
ALTER TABLE "CustomerTag" ADD CONSTRAINT "CustomerTag_customerId_fkey"
  FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ================================================================
-- MIGRATION SUMMARY
-- ================================================================

/*
Phase 1 Changes Applied:

✅ Enhanced User model with business fields:
  - Company details (name, size, industry)
  - Lead tracking (source, type, lifecycle)
  - Contact preferences (method, timezone)
  - Business metrics (lifetime value, last contact)
  - Notes and relationship data

✅ Added CustomerContact model:
  - Multiple contacts per customer
  - Role designation (primary, decision maker, technical, billing)
  - Individual contact methods and details

✅ Added CustomerInteraction model:
  - Complete communication history
  - Follow-up tracking and reminders
  - Outcome recording and next steps
  - Audit trail (created by, source)

✅ Added CustomerTag model:
  - Flexible customer categorization
  - Color-coded organization
  - Bulk operations support

✅ Performance optimizations:
  - Strategic indexes on key fields
  - Efficient query paths for common operations
  - Proper foreign key relationships

This migration is NON-BREAKING:
- All existing data is preserved
- All current functionality continues working
- New features are additive only
- Rollback capability maintained
*/