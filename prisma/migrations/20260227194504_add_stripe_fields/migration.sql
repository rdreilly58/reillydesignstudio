-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripeInvoiceId" TEXT;

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePaymentLink" TEXT,
ADD COLUMN     "stripeSessionId" TEXT;
